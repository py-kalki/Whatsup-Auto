import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, RefreshCw, Zap } from 'lucide-react';

export default function SimulatorDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'Hi, what services do you provide and how can I get started?',
      time: '10:40 AM'
    },
    {
      id: 2,
      sender: 'bot',
      text: 'Hello! 👋 We provide 24/7 WhatsApp AI Automation, CRM Lead Funnels, and Safe Broadcast Marketing.\n\nYou can type /services to view packages or /lead to book a direct consultation!',
      time: '10:40 AM',
      engine: 'Antigravity AI (Local)',
      latency: '240ms'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPills = [
    { label: '/menu', cmd: '/menu' },
    { label: '/services', cmd: '/services' },
    { label: '/lead', cmd: '/lead' },
    { label: '/pricing', cmd: '/pricing' },
    { label: 'Can you help me?', cmd: 'Can you help me customize an AI bot?' }
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate intelligent bot reply
    setTimeout(() => {
      let replyText = '';
      let engine = 'Antigravity AI';
      let latency = `${Math.floor(Math.random() * 150 + 150)}ms`;

      const lower = text.toLowerCase();
      if (lower.includes('/menu')) {
        engine = 'Rule Engine';
        latency = '12ms';
        replyText = `*Welcome to WhatsApp Automation Suite!*\n\nAvailable commands:\n- /services - Available packages\n- /pricing - Price & estimates\n- /lead - Consultation form\n- /faq - FAQs\n- /human - Request agent callback`;
      } else if (lower.includes('/services')) {
        engine = 'Rule Engine';
        latency = '18ms';
        replyText = `*Our Services:*\n1. 24/7 Contextual AI Support Bots\n2. Interactive Lead CRM Funnels\n3. Safe Tag-Segmented Broadcast Campaigns\n\nType /lead to get started!`;
      } else if (lower.includes('/lead')) {
        engine = 'Flow State Machine';
        latency = '25ms';
        replyText = `*Step 1 of 3*: Welcome! Let's get you set up. What is your *Full Name*?`;
      } else if (lower.includes('/pricing')) {
        engine = 'Rule Engine';
        latency = '15ms';
        replyText = `*Pricing & Plans:*\n- WhatsAuto Open-Source: $0 (Free Forever)\n- Self-Hosted Local Server: Zero cloud per-message fees!\n\nType /lead to talk with an engineer.`;
      } else {
        replyText = `Thank you for reaching out! Our system is 100% self-hosted with zero cloud fees. I can help answer your questions, capture your requirements, or connect you with our lead architect Vedansh Danot.`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engine,
        latency
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        sender: 'user',
        text: 'Hi, what services do you provide and how can I get started?',
        time: '10:40 AM'
      },
      {
        id: 2,
        sender: 'bot',
        text: 'Hello! 👋 We provide 24/7 WhatsApp AI Automation, CRM Lead Funnels, and Safe Broadcast Marketing.\n\nYou can type /services to view packages or /lead to book a direct consultation!',
        time: '10:40 AM',
        engine: 'Antigravity AI (Local)',
        latency: '240ms'
      }
    ]);
  };

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold self-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Live Sandbox</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Test the AI Agent and Flow Engine right here
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
              Experience the sub-millisecond keyword matching and intelligent AI responses. In production, this runs entirely on your local machine with zero external cloud dependencies.
            </p>

            {/* Quick Trigger Buttons */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Try Quick Commands:</span>
              <div className="flex flex-wrap gap-2">
                {quickPills.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.cmd)}
                    className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostics Feature Points */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                <div className="text-xs text-zinc-500 font-medium">Deterministic Match</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white">&lt; 20ms Latency</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                <div className="text-xs text-zinc-500 font-medium">Local AI Brain</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">0 API Key Cost</div>
              </div>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-[32px] border-4 border-zinc-800 dark:border-zinc-700 bg-[#efeae2] dark:bg-zinc-900 shadow-2xl overflow-hidden flex flex-col h-[560px]">
              {/* WhatsApp Phone Header */}
              <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white text-[#075e54] font-bold flex items-center justify-center text-sm shadow-xs">
                    WA
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">WhatsAuto Bot</div>
                    <div className="text-[11px] text-emerald-100/90 font-normal">Online • 24/7 Automated</div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Reset Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs sm:text-sm">
                {messages.map((m) => {
                  const isUser = m.sender === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col max-w-[85%] ${
                        isUser ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-xl shadow-xs whitespace-pre-line leading-relaxed ${
                          isUser
                            ? 'bg-[#d9fdd3] dark:bg-emerald-950/80 text-zinc-900 dark:text-emerald-100 rounded-tr-xs'
                            : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-xs'
                        }`}
                      >
                        {m.text}
                        <div className="text-[10px] text-zinc-500 text-right mt-1.5 select-none">
                          {m.time}
                        </div>
                      </div>

                      {/* Bot Engine Diagnostic Pill */}
                      {!isUser && m.engine && (
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono mt-1 px-1">
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>{m.engine} ({m.latency})</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="self-start p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a command or question..."
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="p-2.5 rounded-full bg-[#075e54] hover:bg-[#064e46] text-white disabled:opacity-40 transition-all shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
