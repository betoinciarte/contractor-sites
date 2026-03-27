import { useEffect, useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3' | 'span';
}

/**
 * Word-by-word scroll reveal — each word highlights as it enters the viewport.
 * Uses CSS animation-timeline: view() for Chrome/Edge (native, no JS).
 * Falls back to IntersectionObserver for Safari/Firefox.
 */
export default function ScrollRevealText({ text, className = '', as: Tag = 'p' }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if CSS animation-timeline is supported
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()');

    if (!supportsScrollTimeline && containerRef.current) {
      // Fallback: IntersectionObserver to reveal words as they enter viewport
      const words = containerRef.current.querySelectorAll('.sr-word');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' });

      words.forEach((word, i) => {
        // Stagger the reveal slightly
        (word as HTMLElement).style.transitionDelay = `${i * 30}ms`;
        observer.observe(word);
      });

      return () => observer.disconnect();
    }
  }, [text]);

  const words = text.split(' ');

  return (
    <Tag ref={containerRef as any} className={`sr-container ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="sr-word"
          style={{
            // Inline style for CSS scroll-timeline (progressive enhancement)
            opacity: 0.15,
            color: 'rgba(255,255,255,0.3)',
            transition: 'opacity 0.4s ease, color 0.4s ease',
            display: 'inline',
          }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
      <style>{`
        /* CSS scroll-timeline for Chrome/Edge — no JS needed */
        @supports (animation-timeline: view()) {
          .sr-word {
            animation: sr-highlight linear both !important;
            animation-timeline: view() !important;
            animation-range: cover 15% cover 35% !important;
          }
          @keyframes sr-highlight {
            from { opacity: 0.15; color: rgba(255,255,255,0.3); }
            to { opacity: 1; color: rgba(255,255,255,0.9); }
          }
        }
      `}</style>
    </Tag>
  );
}
