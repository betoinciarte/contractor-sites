import { useState, useEffect } from 'react';

interface Props {
  accent?: string;
  primary?: string;
  onClick?: () => void;
}

/**
 * Animated AI orb — replaces static "Online estimator" badge.
 * States: idle (breathe), thinking (pulse fast), responding (wave).
 * Communicates with InlineChat-v3 via custom DOM events.
 */
export default function AIOrb({ accent = '#E87C3E', primary = '#1E3D5F', onClick }: Props) {
  const [state, setState] = useState<'idle' | 'thinking' | 'responding'>('idle');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'thinking' || detail === 'responding' || detail === 'idle') {
        setState(detail);
      }
    };
    window.addEventListener('chat-state', handler);
    return () => window.removeEventListener('chat-state', handler);
  }, []);

  const speeds = {
    idle: '6s',
    thinking: '1.5s',
    responding: '3s',
  };
  const speed = speeds[state];

  return (
    <button
      onClick={onClick}
      className="ai-orb-container"
      aria-label="Open AI estimator"
      title="Get an instant estimate"
    >
      <div className="ai-orb" style={{ '--orb-speed': speed, '--orb-accent': accent, '--orb-primary': primary } as React.CSSProperties}>
        <div className="ai-orb-blob ai-orb-blob-1" />
        <div className="ai-orb-blob ai-orb-blob-2" />
        <div className="ai-orb-blob ai-orb-blob-3" />
      </div>
      <span className="ai-orb-label">
        {state === 'idle' && 'AI Estimator'}
        {state === 'thinking' && 'Thinking...'}
        {state === 'responding' && 'Responding...'}
      </span>

      <style>{`
        .ai-orb-container {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 8px 20px 8px 8px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ai-orb-container:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.05);
        }
        .ai-orb {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .ai-orb-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(8px);
          mix-blend-mode: screen;
        }
        .ai-orb-blob-1 {
          inset: -20%;
          background: var(--orb-accent);
          opacity: 0.7;
          animation: orb-float-1 var(--orb-speed) ease-in-out infinite;
        }
        .ai-orb-blob-2 {
          inset: -10%;
          background: var(--orb-primary);
          opacity: 0.5;
          animation: orb-float-2 var(--orb-speed) ease-in-out infinite reverse;
        }
        .ai-orb-blob-3 {
          inset: 5%;
          background: white;
          opacity: 0.3;
          animation: orb-float-3 calc(var(--orb-speed) * 0.7) ease-in-out infinite;
        }
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15%, -10%) scale(1.1); }
          66% { transform: translate(-10%, 15%) scale(0.9); }
        }
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15%, 10%) scale(1.1); }
          66% { transform: translate(10%, -10%) scale(0.95); }
        }
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0, 0) scale(0.8); }
          50% { transform: translate(5%, 5%) scale(1.1); }
        }
        .ai-orb-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          white-space: nowrap;
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-orb-blob { animation: none !important; }
        }
      `}</style>
    </button>
  );
}
