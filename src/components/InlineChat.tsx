import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  slug: string;
  businessName: string;
  apiBase?: string;
}

export default function InlineChat({ slug, businessName, apiBase = 'https://app.sistemasparacontratistas.com' }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [sessionId] = useState(() => `web_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || streaming) return;

    if (!started) setStarted(true);
    const userMsg: Message = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStreaming(true);
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractorSlug: slug, message: msg, sessionId, history }),
      });
      if (!res.ok) throw new Error('Failed');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split('\n')) {
            if (!line.startsWith('data: ')) continue;
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                fullText += data.text;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content: fullText };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: "I'm having trouble connecting right now. Please call us — we'd love to help!" };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, messages, slug, sessionId, apiBase, started]);

  const quickPrompts = [
    "How much for a 20×40 driveway?",
    "Foundation repair cost?",
    "Stamped patio estimate?",
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Messages area */}
      <div className={`space-y-4 mb-6 transition-all duration-500 ${started ? 'min-h-[200px] max-h-[400px] overflow-y-auto' : ''}`}>
        {!started && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-[13px] text-white/60 mb-6">
              <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
              AI assistant online — responds instantly
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[14px] rounded-xl border border-white/10 transition-all hover:scale-[1.02]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl px-5 py-3 text-[15px] max-w-[80%] leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#E87C3E] text-white rounded-br-sm'
                : 'bg-white/10 backdrop-blur-sm text-white/90 rounded-tl-sm border border-white/10'
            }`}>
              {msg.content || (streaming && i === messages.length - 1 ? (
                <span className="inline-flex gap-1">
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              ) : '')}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about your project..."
          disabled={streaming}
          className="flex-1 h-12 sm:h-14 px-4 sm:px-6 rounded-2xl bg-white/10 backdrop-blur-sm text-white text-[15px] sm:text-[17px] placeholder:text-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#E87C3E] focus:border-transparent disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage()}
          disabled={streaming || !input.trim()}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E87C3E] text-white rounded-2xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 flex-shrink-0"
          aria-label="Send"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
}
