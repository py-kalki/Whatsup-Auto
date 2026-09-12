import React, { useState } from 'react';
import { Mail, Copy, Check, Send, GitPullRequest, Code } from 'lucide-react';
import SectionFrame from './SectionFrame';

export default function ContactView() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'pykalki@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="pt-20 pb-16">
      <SectionFrame>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-4">
            <span className="text-[10px]">✦</span> Get in Touch
          </span>

          <h1 className="font-extrabold text-gray-950 dark:text-white leading-[1.1] mb-4 text-3xl sm:text-5xl tracking-tight">
            Let's build the future of private AI automation
          </h1>

          <p className="text-[16px] text-gray-500 dark:text-gray-400 leading-relaxed">
            Have questions, feature requests, or custom workflow integration ideas? Reach out directly.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-10">
          <div className="text-center max-w-md mx-auto mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Mail className="w-6 h-6 text-gray-800 dark:text-zinc-200" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Contact Vedansh Danot
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Founder &amp; Creator of WhatsAuto Suite
            </p>
          </div>

          {/* Email Copy Pill Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-sm shrink-0">
                @
              </div>
              <div>
                <div className="text-[11px] text-gray-400 font-medium">Direct Email</div>
                <div className="font-mono text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                  {email}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-gray-800 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#212121] hover:bg-black dark:bg-white dark:text-black text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Inquiry Form */}
          <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1.5">
                Message or Proposal
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project, idea, or custom integration needs..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-end inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#212121] hover:bg-black dark:bg-white dark:text-black text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>

            {formSubmitted && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 text-center">
                Thank you for reaching out! Vedansh Danot will reply to your email shortly.
              </div>
            )}
          </form>
        </div>

        {/* Quick Topic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <GitPullRequest className="w-4 h-4 text-emerald-600" />
              <span>Open Source &amp; PRs</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Submit bug reports, feature suggestions, or pull requests directly on our GitHub repository.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <Code className="w-4 h-4 text-purple-600" />
              <span>Custom Integrations</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Consult on bespoke WhatsApp AI workflows, webhook connections, and enterprise CRM syncs.
            </p>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
