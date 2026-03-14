import { useState, type FormEvent } from 'react';

interface Props {
  services: { name: string }[];
  slug: string;
  preselectedService?: string;
  phone?: string;
}

export default function ContactForm({ services, slug, preselectedService, phone }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch(`/api/contractor-site/${slug}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="font-bold text-xl text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Thank You!</h3>
        <p className="text-white/60">We'll call you within 30 minutes.</p>
        {phone && (
          <p className="text-[15px] text-white/40 mt-3">
            Can't wait? Call us at{' '}
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-[#E87C3E] font-semibold hover:underline">{phone}</a>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Your Name" required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/10 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#E87C3E]" />
      <input type="tel" name="phone" placeholder="Phone Number" required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/10 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#E87C3E]" />
      <input type="email" name="email" placeholder="Email (optional)" className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/10 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#E87C3E]" />
      <select name="service" defaultValue={preselectedService || ''} className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/10 text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-[#E87C3E] [&>option]:bg-[#111827] [&>option]:text-white">
        <option value="">Select a service</option>
        {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
      </select>
      <textarea name="details" placeholder="Tell us about your project" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#E87C3E] resize-none" />
      <label className="flex items-start gap-2 text-[13px] text-white/40 cursor-pointer">
        <input type="checkbox" name="consent" required className="mt-1 accent-[#E87C3E]" />
        <span>Yes, please contact me about my project within 30 minutes.</span>
      </label>
      <button type="submit" disabled={status === 'sending'} className="w-full h-[52px] bg-[#E87C3E] text-white rounded-xl font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-60">
        {status === 'sending' ? 'Sending...' : 'Get My Free Estimate'}
      </button>
      <p className="text-[12px] text-white/20 text-center">Your information is private and never shared.</p>
      {status === 'error' && (
        <div className="text-center">
          <p className="text-red-400 text-[15px]">Something went wrong.</p>
          {phone && (
            <p className="text-[15px] text-white/40 mt-1">
              Please call us at{' '}
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-[#E87C3E] font-semibold hover:underline">{phone}</a>
            </p>
          )}
        </div>
      )}
    </form>
  );
}
