import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Zap } from 'lucide-react';
import SectionFrame from './SectionFrame';

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
  const chatContainerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const quickPills = [
    { label: '/menu', cmd: '/menu' },
    { label: '/services', cmd: '/services' },
    { label: '/lead', cmd: '/lead' },
    { label: '/pricing', cmd: '/pricing' },
    { label: 'Can you help me?', cmd: 'Can you help me customize an AI bot?' }
  ];

  const nextId = useRef(10);

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    nextId.current += 1;
    const userMsg = {
      id: nextId.current,
      sender: 'user',
      text: text.trim(),
      time: '10:41 AM'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let engine = 'Antigravity AI';
      let latency = `${Math.floor(Math.random() * 150 + 150)}ms`;

      const lower = text.toLowerCase();
      if (lower.includes('/menu')) {
        engine = 'Rule Engine';
        latency = '12ms';
        replyText = `*Welcome to WhatsAuto Suite!*\n\nAvailable commands:\n- /services - Available packages\n- /pricing - Price & estimates\n- /lead - Consultation form\n- /faq - FAQs\n- /human - Request agent callback`;
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

      nextId.current += 1;
      const botMsg = {
        id: nextId.current,
        sender: 'bot',
        text: replyText,
        time: '10:41 AM',
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
    <SectionFrame className="py-14 sm:py-20" id="sandbox">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Copy & Interactive Triggers */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400">
            <span className="text-[10px]">✦</span> Interactive Sandbox
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-[1.15]">
            Test the AI Agent and Flow Engine live
          </h2>

          <p className="text-[15.5px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
            Experience sub-millisecond keyword matching and intelligent AI responses. In production, this runs entirely on your local machine with zero external cloud dependencies.
          </p>

          {/* Quick Triggers */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Try Quick Commands:</span>
            <div className="flex flex-wrap gap-2">
              {quickPills.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p.cmd)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-xs cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostics Feature Points */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xs">
              <div className="text-[11px] text-gray-400 font-medium">Deterministic Match</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">&lt; 20ms Latency</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xs">
              <div className="text-[11px] text-gray-400 font-medium">Local AI Brain</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">0 API Key Cost</div>
            </div>
          </div>
        </div>

        {/* Right Phone Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[360px] rounded-[32px] border-4 border-gray-900 dark:border-zinc-700 bg-[#EFEAE2] dark:bg-zinc-950 shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col h-[540px]">
            {/* Phone Top Bar */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-[#075E54] font-bold flex items-center justify-center text-xs shadow-xs">
                  WA
                </div>
                <div>
                  <div className="text-[13px] font-bold leading-tight">WhatsAuto Agent</div>
                  <div className="text-[10px] text-emerald-100/90">Online • 24/7 Automated</div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Stream */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-3.5 overflow-y-auto flex flex-col gap-2.5 text-xs scroll-smooth"
            >
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
                      className={`p-3 rounded-2xl shadow-xs whitespace-pre-line leading-relaxed ${
                        isUser
                          ? 'bg-[#D9FDD3] dark:bg-emerald-950/80 text-gray-900 dark:text-emerald-100 rounded-tr-xs'
                          : 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 rounded-tl-xs'
                      }`}
                    >
                      {m.text}
                      <div className="text-[9px] text-gray-400 text-right mt-1 select-none">
                        {m.time}
                      </div>
                    </div>

                    {!isUser && m.engine && (
                      <div className="flex items-center gap-1 text-[9px] text-gray-400 font-mono mt-1 px-1">
                        <Zap className="w-2.5 h-2.5 text-amber-500" />
                        <span>{m.engine} ({m.latency})</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="self-start p-2.5 rounded-2xl bg-white dark:bg-zinc-800 shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-chat-dot-1"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-chat-dot-2"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-chat-dot-3"></span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2.5 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type a command (/lead, /services)..."
                className="flex-1 px-3 py-2 text-xs rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2 rounded-full bg-[#075E54] hover:bg-[#064E46] text-white disabled:opacity-40 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
