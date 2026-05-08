"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../page.module.css";
import type { SteamScreenshot, SteamMovie } from "../lib/steam";

const FALLBACK_SCREENSHOTS = [
  "ss_0554a890df7274aaf2d458c90d96d1d5831de174.1920x1080.jpg",
  "ss_0828cfea596a800fef96fd949426abbe417e2e05.1920x1080.jpg",
  "ss_82de622694ca18069ae265ea79b814c60b3ead28.1920x1080.jpg",
  "ss_985989a642e52397b5d365c97497749f7d0d8e52.1920x1080.jpg",
  "ss_e8155559848cfef1644ca7a402065b5728fe2d9f.1920x1080.jpg",
].map((src) => ({ path_full: `/stroom/${src}`, path_thumbnail: `/stroom/${src}` }));

type Item =
  | { type: "trailer"; movie: SteamMovie }
  | { type: "screenshot"; src: string; thumb: string };

// ── helpers ────────────────────────────────────────────────────────────────
function stripMid(strip: HTMLDivElement) {
  return strip.getBoundingClientRect().left + strip.clientWidth / 2;
}
function thumbMid(thumb: HTMLElement) {
  const r = thumb.getBoundingClientRect();
  return r.left + r.width / 2;
}
function allThumbs(strip: HTMLDivElement) {
  return Array.from(strip.querySelectorAll<HTMLButtonElement>("button"));
}
function closest(strip: HTMLDivElement, n: number) {
  const mid = stripMid(strip);
  return allThumbs(strip).reduce(
    (best, t, i) => {
      const d = Math.abs(thumbMid(t) - mid);
      return d < best.d ? { d, t, idx: i % n } : best;
    },
    { d: Infinity, t: null as unknown as HTMLButtonElement, idx: 0 }
  );
}
function scrollTo(strip: HTMLDivElement, thumb: HTMLElement, smooth = true) {
  const delta = thumbMid(thumb) - stripMid(strip);
  strip.scrollBy({ left: delta, behavior: smooth ? "smooth" : "instant" });
}

// ── sub-components ─────────────────────────────────────────────────────────
function TrailerFeatured({ movie }: { movie: SteamMovie }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <div className={styles.featuredTrailerPlaceholder}>
        <video
          src={movie.mp4?.max ?? movie.webm?.max}
          controls
          autoPlay
          className={styles.featuredVideo}
        />
      </div>
    );
  }
  return (
    <div
      className={styles.featuredTrailerPlaceholder}
      style={movie.thumbnail ? { backgroundImage: `url(${movie.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      onClick={() => setPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
    >
      <div className={styles.trailerPlay}>▶</div>
      <div className={styles.trailerTxt}>CLICK TO PLAY</div>
    </div>
  );
}

function TrailerThumb({ thumbnail }: { thumbnail?: string }) {
  return (
    <div
      className={styles.thumbTrailerInner}
      style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <span>▶</span>
      <span>TRAILER</span>
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────
export default function MediaCarousel({
  screenshots,
  movies,
}: {
  screenshots?: SteamScreenshot[];
  movies?: SteamMovie[];
}) {
  const srcs = (screenshots && screenshots.length > 0 ? screenshots : FALLBACK_SCREENSHOTS);
  const trailer = movies && movies.length > 0 ? movies[0] : null;

  const ITEMS: Item[] = [
    ...(trailer ? [{ type: "trailer" as const, movie: trailer }] : []),
    ...srcs.map((s) => ({ type: "screenshot" as const, src: s.path_full, thumb: s.path_thumbnail })),
  ];
  const N = ITEMS.length;

  const [featured, setFeatured] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const isSnapping = useRef(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragOrigin = useRef({ x: 0, scrollLeft: 0 });
  const velRef = useRef({ v: 0, lastX: 0, lastT: 0 });
  const inertiaRaf = useRef<number | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  const snapTo = (strip: HTMLDivElement, thumb: HTMLElement, idx: number) => {
    setFeatured(idx);
    isSnapping.current = true;
    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => { isSnapping.current = false; }, 600);
    scrollTo(strip, thumb);
  };

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumbs = allThumbs(strip);
    const first = thumbs[N];
    if (first) scrollTo(strip, first, false);
  }, [N]);

  useEffect(() => {
    const applyMomentum = (strip: HTMLDivElement, initialV: number) => {
      if (inertiaRaf.current !== null) {
        cancelAnimationFrame(inertiaRaf.current);
        inertiaRaf.current = null;
      }
      isSnapping.current = true;
      let v = initialV;
      const FRICTION = 0.88;
      const MIN_V = 0.15;

      const tick = () => {
        v *= FRICTION;
        strip.scrollLeft += v;
        if (Math.abs(v) > MIN_V) {
          inertiaRaf.current = requestAnimationFrame(tick);
        } else {
          inertiaRaf.current = null;
          const { t, idx } = closest(strip, N);
          if (t) snapTo(strip, t, idx);
        }
      };
      inertiaRaf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !stripRef.current) return;
      const dx = e.clientX - dragOrigin.current.x;
      if (dx !== 0) hasDragged.current = true;
      stripRef.current.scrollLeft = dragOrigin.current.scrollLeft - dx;

      const now = performance.now();
      const dt = now - velRef.current.lastT;
      if (dt > 0 && dt < 100) {
        const instant = -(e.clientX - velRef.current.lastX) / dt;
        velRef.current.v = velRef.current.v * 0.7 + instant * 0.3;
      }
      velRef.current.lastX = e.clientX;
      velRef.current.lastT = now;
    };

    const onUp = () => {
      if (isDragging.current && stripRef.current) {
        const pxPerFrame = velRef.current.v * 16;
        if (Math.abs(pxPerFrame) > 1) {
          applyMomentum(stripRef.current, pxPerFrame);
        } else {
          const { t, idx } = closest(stripRef.current, N);
          if (t) snapTo(stripRef.current, t, idx);
        }
      }
      isDragging.current = false;
      setGrabbing(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [N]);

  const onStripScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const oneSet = strip.scrollWidth / 3;
    const distRight = strip.scrollWidth - strip.clientWidth - strip.scrollLeft;
    if (strip.scrollLeft < oneSet * 0.4) strip.scrollLeft += oneSet;
    else if (distRight < oneSet * 0.4) strip.scrollLeft -= oneSet;
    if (!isSnapping.current) setFeatured(closest(strip, N).idx);
  };

  const slide = (dir: -1 | 1) => {
    const strip = stripRef.current;
    if (!strip) return;
    const cur = closest(strip, N);
    const nextIdx = (cur.idx + dir + N) % N;
    const mid = stripMid(strip);
    const candidates = allThumbs(strip).filter((_, i) => i % N === nextIdx);
    const best = candidates.reduce((b, t) => {
      const tD = thumbMid(t) - mid;
      const bD = thumbMid(b) - mid;
      const tScore = dir > 0 ? tD : -tD;
      const bScore = dir > 0 ? bD : -bD;
      if (tScore > 0 && bScore <= 0) return t;
      if (bScore > 0 && tScore <= 0) return b;
      return Math.abs(tD) < Math.abs(bD) ? t : b;
    });
    snapTo(strip, best, nextIdx);
  };

  const handleThumbClick = (itemIdx: number) => {
    if (hasDragged.current) return;
    const strip = stripRef.current;
    if (!strip) return;
    const mid = stripMid(strip);
    const candidates = allThumbs(strip).filter((_, i) => i % N === itemIdx);
    const best = candidates.reduce((b, t) =>
      Math.abs(thumbMid(t) - mid) < Math.abs(thumbMid(b) - mid) ? t : b
    );
    snapTo(strip, best, itemIdx);
  };

  const current = ITEMS[featured];

  return (
    <div className={styles.mediaLayout}>
      {/* Featured */}
      <div className={styles.featuredFrame}>
        {current.type === "trailer" ? (
          <TrailerFeatured movie={current.movie} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={styles.featuredImg}
            src={current.src}
            alt="Stroom screenshot"
            draggable={false}
          />
        )}
        <div className={styles.featuredCornerTl} />
        <div className={styles.featuredCornerTr} />
        <div className={styles.featuredCornerBl} />
        <div className={styles.featuredCornerBr} />
      </div>

      {/* Thumbnail strip */}
      <div className={styles.stripOuter}>
        <button className={styles.carouselArrow} onClick={() => slide(-1)} aria-label="Précédent">◀</button>
        <div
          ref={stripRef}
          className={`${styles.strip} ${grabbing ? styles.carouselDragging : ""}`}
          onScroll={onStripScroll}
          onMouseDown={(e) => {
            if (inertiaRaf.current !== null) {
              cancelAnimationFrame(inertiaRaf.current);
              inertiaRaf.current = null;
            }
            e.preventDefault();
            isDragging.current = true;
            hasDragged.current = false;
            setGrabbing(true);
            velRef.current = { v: 0, lastX: e.clientX, lastT: performance.now() };
            dragOrigin.current = { x: e.clientX, scrollLeft: stripRef.current?.scrollLeft ?? 0 };
          }}
          onTouchStart={(e) => {
            isDragging.current = true;
            hasDragged.current = false;
            dragOrigin.current = { x: e.touches[0].clientX, scrollLeft: stripRef.current?.scrollLeft ?? 0 };
          }}
          onTouchMove={(e) => {
            if (!isDragging.current || !stripRef.current) return;
            const dx = e.touches[0].clientX - dragOrigin.current.x;
            if (dx !== 0) hasDragged.current = true;
            stripRef.current.scrollLeft = dragOrigin.current.scrollLeft - dx;
          }}
          onTouchEnd={() => {
            if (stripRef.current) {
              const { t, idx } = closest(stripRef.current, N);
              if (t) snapTo(stripRef.current, t, idx);
            }
            isDragging.current = false;
          }}
        >
          <div className={styles.stripTrack}>
            {[0, 1, 2].flatMap((copy) =>
              ITEMS.map((item, i) => (
                <button
                  key={`${copy}-${i}`}
                  className={`${styles.thumb} ${i === featured ? styles.thumbActive : ""}`}
                  onClick={() => handleThumbClick(i)}
                >
                  {item.type === "trailer" ? (
                    <TrailerThumb thumbnail={item.movie.thumbnail} />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.thumb} alt={`Screenshot ${i}`} draggable={false} />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
        <button className={styles.carouselArrow} onClick={() => slide(1)} aria-label="Suivant">▶</button>
      </div>
    </div>
  );
}
