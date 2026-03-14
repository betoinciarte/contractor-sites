import { useState, useRef, useCallback, useEffect } from 'react';

interface Pair {
  before: string;
  after: string;
  title: string;
  location: string;
}

interface Props {
  pairs: Pair[];
}

function SingleSlider({ pair }: { pair: Pair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="flex-shrink-0 w-full snap-center">
      <div
        ref={containerRef}
        className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After (full width behind) */}
        <img src={pair.after} alt={`${pair.title} — After`} className="absolute inset-0 w-full h-full object-cover" draggable={false} />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={pair.before} alt={`${pair.title} — Before`} className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }} draggable={false} />
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-[13px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">Before</span>
        <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[13px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">After</span>

        {/* Drag handle */}
        <div className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3D5F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/></svg>
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <p className="text-white font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{pair.title}</p>
        <p className="text-white/60 text-[13px]">{pair.location}</p>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider({ pairs }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) {
      container.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* Carousel */}
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: 'none' }}>
        {pairs.map((pair, i) => (
          <SingleSlider key={i} pair={pair} />
        ))}
      </div>

      {/* Dots + arrows */}
      {pairs.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => scrollTo(Math.max(0, activeIndex - 1))} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Previous">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="flex gap-2">
            {pairs.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeIndex ? 'bg-[#E87C3E] w-6' : 'bg-white/30'}`} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
          <button onClick={() => scrollTo(Math.min(pairs.length - 1, activeIndex + 1))} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Next">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
