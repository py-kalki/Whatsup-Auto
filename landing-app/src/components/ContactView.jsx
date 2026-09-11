import React, { useState } from 'react';
import { Mail, Copy, Check, Send, GitPullRequest, Code } from 'lucide-react';

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
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
          <Mail className="w-3.5 h-3.5 text-sky-500" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight">
          Let's build{' '}
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            the future of open-source AI
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal">
          Have questions, feature requests, or partnership proposals? Reach out directly to the creator.
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-xl mb-12">
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
            Contact Vedansh Danot
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Founder & Creator of WhatsAuto Suite
          </p>
        </div>

        {/* Email Copy Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
              @
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-medium">Direct Email</div>
              <div className="font-mono text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                {email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Feedback / Inquiry Form */}
        <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@company.com"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Message or Proposal
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project, idea, or questions..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="self-end inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Submit Message</span>
          </button>

          {formSubmitted && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 text-center">
              Thank you for reaching out! Vedansh Danot will reply to your email shortly.
            </div>
          )}
        </form>
      </div>

      {/* Inquiry Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
            <GitPullRequest className="w-4 h-4 text-sky-500" />
            <span>Open Source & Contributions</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
            Submit bug reports, feature suggestions, or pull requests directly on our GitHub repository.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
            <Code className="w-4 h-4 text-purple-500" />
            <span>Custom Integrations</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
            Consult on bespoke WhatsApp AI workflows, webhook connections, and enterprise CRM syncs.
          </p>
        </div>
      </div>
    </div>
  );
}
