// WhatsApp Automation Suite Dashboard SPA
// Modern Minimalist SaaS UI (100% Real Live Database Data)

// State
let ws = null;
let currentTab = 'tab-overview';
let activePeriod = 'month'; // 'day' | 'week' | 'month' | 'year' | 'custom' | 'all'
let customDateRange = { start: null, end: null };
let currentSearchQuery = '';
let globalStatusData = null;
let allDispatches = [];

// Helper to refresh Lucide SVG icons on dynamic DOM updates
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupTimeFilter();
  setupDateRangePickerModal();
  setupCalendarInteractions();
  setupWebSocket();
  loadAllData();
  setupEventListeners();
  setupSearchFilter();
  refreshIcons();
});

// Tab Navigation
function setupTabs() {
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (!tabId) return;

      currentTab = tabId;

      navItems.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) targetPanel.classList.add('active');

      updateHeaderTitles(tabId);

      // If user switches tab, re-apply search filter for that tab
      if (currentSearchQuery) {
        filterCurrentTabContent(currentSearchQuery);
      }
      refreshIcons();
    });
  });

  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', () => {
      const overviewBtn = document.querySelector('.nav-item[data-tab="tab-overview"]');
      if (overviewBtn) overviewBtn.click();
    });
  }
}

function updateHeaderTitles(tabId) {
  const titles = {
    'tab-overview': 'Dashboard',
    'tab-simulator': 'WhatsApp Simulator',
    'tab-rules': 'Automation Rules',
    'tab-ai': 'AI Brain (Antigravity)',
    'tab-flows': 'Lead CRM & Flows',
    'tab-campaigns': 'Broadcast Campaigns',
    'tab-contacts': 'Contacts & Tags',
    'tab-settings': 'System Settings',
    'tab-logs': 'Activity Logs',
  };

  const title = titles[tabId] || 'Dashboard';
  const pageTitleEl = document.getElementById('pageTitle');
  if (pageTitleEl) pageTitleEl.textContent = title;
}

// Time Filter Pill Group Switcher (Day / Week / Month / Year)
function setupTimeFilter() {
  const filterBtns = document.querySelectorAll('#timeFilterGroup .pill-segment');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const period = btn.getAttribute('data-period');
      activePeriod = period;
      customDateRange = { start: null, end: null };

      applyActiveFilter();
    });
  });
}

// Date Range Bounds Calculator
function getPeriodDateBounds(period, customRange) {
  const now = new Date();
  let start = null;
  let end = null;
  let label = '';

  const options = { day: 'numeric', month: 'short', year: 'numeric' };

  if (period === 'day') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    label = `Today, ${now.toLocaleDateString('en-GB', options)}`;
  } else if (period === 'week') {
    start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    end = now;
    label = `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${now.toLocaleDateString('en-GB', options)}`;
  } else if (period === 'month') {
    start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    label = `${now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
  } else if (period === 'year') {
    start = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    label = `Year ${now.getFullYear()}`;
  } else if (period === 'custom' && customRange?.start && customRange?.end) {
    start = new Date(customRange.start);
    start.setHours(0, 0, 0, 0);
    end = new Date(customRange.end);
    end.setHours(23, 59, 59, 999);
    label = `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', options)}`;
  } else {
    label = 'All Time System Data';
  }

  return { start, end, label };
}

// Master Filter Function (Period + Custom Range + Search Query)
function applyActiveFilter() {
  const bounds = getPeriodDateBounds(activePeriod, customDateRange);

  // Update date pill label
  const dateLabel = document.getElementById('currentDateRangeLabel');
  if (dateLabel) {
    dateLabel.textContent = bounds.label;
  }

  // Filter dispatches by time bounds
  let filtered = allDispatches;
  if (bounds.start && bounds.end) {
    filtered = allDispatches.filter((d) => {
      if (!d.timestamp) return true;
      const t = new Date(d.timestamp).getTime();
      return t >= bounds.start.getTime() && t <= bounds.end.getTime();
    });
  }

  // Filter dispatches by search query
  if (currentSearchQuery) {
    const q = currentSearchQuery.toLowerCase();
    filtered = filtered.filter((d) => {
      const contact = (d.contactName || '').toLowerCase();
      const chat = (d.chatId || '').toLowerCase();
      const msg = (d.message || '').toLowerCase();
      const rule = (d.rule || '').toLowerCase();
      const status = (d.status || '').toLowerCase();
      return contact.includes(q) || chat.includes(q) || msg.includes(q) || rule.includes(q) || status.includes(q);
    });
  }

  // Update KPI counters
  const revenueStat = document.getElementById('statRevenue');
  const activeUsersStat = document.getElementById('statActiveUsers');
  const newUsersStat = document.getElementById('statNewUsers');
  const totalMentorsStat = document.getElementById('statTotalMentors');

  if (revenueStat) {
    // If filtered by period, show count for that period; if all, show total
    revenueStat.textContent = (activePeriod === 'all' && !currentSearchQuery && globalStatusData?.counts?.totalMessages)
      ? Number(globalStatusData.counts.totalMessages).toLocaleString()
      : filtered.length.toLocaleString();
  }

  // Unique contacts engaged in this filter
  const uniqueContacts = new Set(filtered.map((d) => d.chatId).filter(Boolean));
  if (activeUsersStat) {
    activeUsersStat.textContent = (uniqueContacts.size > 0 && activePeriod !== 'all')
      ? uniqueContacts.size.toLocaleString()
      : Number(globalStatusData?.counts?.contacts || uniqueContacts.size || 0).toLocaleString();
  }

  if (newUsersStat && globalStatusData?.counts) {
    newUsersStat.textContent = Number(globalStatusData.counts.leads || 0).toLocaleString();
  }

  if (totalMentorsStat && globalStatusData?.counts) {
    totalMentorsStat.textContent = Number(globalStatusData.counts.activeRules || 0).toLocaleString();
  }

  // Calculate dynamic delivery health rate
  const failedCount = filtered.filter((d) => d.status === 'Failed').length;
  const deliveryRate = filtered.length > 0
    ? Math.max(0, Math.round(((filtered.length - failedCount) / filtered.length) * 100))
    : (globalStatusData?.counts?.deliveryRate !== undefined ? globalStatusData.counts.deliveryRate : 100);
  updateDeliveryHealthDonut(deliveryRate);

  // Render adaptive bar chart based on time interval
  renderAdaptiveBarChart(activePeriod, bounds, filtered);

  // Render dispatches table
  renderDispatchesTable(filtered);

  // Render search results banner
  const searchBanner = document.getElementById('searchResultsBanner');
  const searchText = document.getElementById('searchResultsText');
  if (searchBanner && searchText) {
    if (currentSearchQuery) {
      searchBanner.classList.remove('hidden');
      searchText.innerHTML = `Found <strong>${filtered.length}</strong> message${filtered.length === 1 ? '' : 's'} matching "<strong>${escapeHtml(currentSearchQuery)}</strong>"`;
    } else {
      searchBanner.classList.add('hidden');
    }
  }
  refreshIcons();
}

// Date Range Picker Modal Setup & Preset Handlers
function setupDateRangePickerModal() {
  const btnPicker = document.getElementById('btnDateRangePicker');
  if (btnPicker) {
    btnPicker.addEventListener('click', () => {
      openModal('dateFilterModal');
    });
  }

  const customForm = document.getElementById('customDateFilterForm');
  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const startVal = document.getElementById('inputCustomStartDate').value;
      const endVal = document.getElementById('inputCustomEndDate').value;

      if (!startVal || !endVal) return;

      activePeriod = 'custom';
      customDateRange = {
        start: new Date(startVal),
        end: new Date(endVal),
      };

      // Unset pill group active
      document.querySelectorAll('#timeFilterGroup .pill-segment').forEach((b) => b.classList.remove('active'));

      closeModal('dateFilterModal');
      applyActiveFilter();
    });
  }
}

window.applyDatePreset = function (preset) {
  const now = new Date();
  const filterBtns = document.querySelectorAll('#timeFilterGroup .pill-segment');

  if (preset === 'today') {
    activePeriod = 'day';
    customDateRange = { start: null, end: null };
    filterBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-period') === 'day'));
  } else if (preset === 'yesterday') {
    activePeriod = 'custom';
    const yStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
    const yEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
    customDateRange = { start: yStart, end: yEnd };
    filterBtns.forEach((b) => b.classList.remove('active'));
  } else if (preset === 'last7') {
    activePeriod = 'week';
    customDateRange = { start: null, end: null };
    filterBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-period') === 'week'));
  } else if (preset === 'last30' || preset === 'thisMonth') {
    activePeriod = 'month';
    customDateRange = { start: null, end: null };
    filterBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-period') === 'month'));
  } else if (preset === 'all') {
    activePeriod = 'all';
    customDateRange = { start: null, end: null };
    filterBtns.forEach((b) => b.classList.remove('active'));
  }

  closeModal('dateFilterModal');
  applyActiveFilter();
};

// Interactive Calendar Day Selection & Month Nav
function setupCalendarInteractions() {
  const days = document.querySelectorAll('.cal-day-cell');
  days.forEach((cell) => {
    cell.addEventListener('click', () => {
      days.forEach((c) => c.classList.remove('active'));
      cell.classList.add('active');

      const dayNum = parseInt(cell.querySelector('.day-num')?.textContent || '1', 10);
      const now = new Date();
      const targetDate = new Date(now.getFullYear(), now.getMonth(), dayNum);
      const start = new Date(targetDate.getFullYear(), targetDate.getMonth(), dayNum, 0, 0, 0);
      const end = new Date(targetDate.getFullYear(), targetDate.getMonth(), dayNum, 23, 59, 59);

      activePeriod = 'custom';
      customDateRange = { start, end };
      document.querySelectorAll('#timeFilterGroup .pill-segment').forEach((b) => b.classList.remove('active'));

      applyActiveFilter();
    });
  });

  const btnPrev = document.getElementById('btnCalPrev');
  const btnNext = document.getElementById('btnCalNext');
  const title = document.getElementById('calMonthTitle');

  const now = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let currentMonthIdx = now.getMonth();
  let currentYear = now.getFullYear();

  if (title) {
    title.textContent = `${monthNames[currentMonthIdx]} ${currentYear}`;
  }

  if (btnPrev && title) {
    btnPrev.addEventListener('click', () => {
      currentMonthIdx--;
      if (currentMonthIdx < 0) {
        currentMonthIdx = 11;
        currentYear--;
      }
      title.textContent = `${monthNames[currentMonthIdx]} ${currentYear}`;
    });
  }

  if (btnNext && title) {
    btnNext.addEventListener('click', () => {
      currentMonthIdx++;
      if (currentMonthIdx > 11) {
        currentMonthIdx = 0;
        currentYear++;
      }
      title.textContent = `${monthNames[currentMonthIdx]} ${currentYear}`;
    });
  }
}

// Render Real Dispatches Table from Live Database Logs
function renderDispatchesTable(dispatches = []) {
  const tbody = document.getElementById('purchasesTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!dispatches || dispatches.length === 0) {
    const isSearching = Boolean(currentSearchQuery);
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--muted); padding: 32px 16px;">
          <div style="margin-bottom: 8px;">
            <i data-lucide="${isSearching ? 'search' : 'message-square'}" style="width: 28px; height: 28px; color: var(--muted);"></i>
          </div>
          <p style="font-weight: 500; font-size: 13px;">
            ${isSearching ? `No WhatsApp messages found matching "${escapeHtml(currentSearchQuery)}".` : 'No WhatsApp dispatches recorded in this time range.'}
          </p>
          <p style="font-size: 11.5px; color: var(--muted-soft); margin-top: 4px;">
            ${isSearching ? 'Try clearing your search or typing another recipient name/keyword.' : 'Send a message in the <strong>Simulator</strong> or link your phone via <strong>QR code</strong> to see real-time activity!'}
          </p>
        </td>
      </tr>
    `;
    refreshIcons();
    return;
  }

  dispatches.forEach((p) => {
    const tr = document.createElement('tr');
    const isSuccess = p.status === 'Delivered';
    const badgeClass = isSuccess ? 'badge-delivered' : 'badge-error';
    const timeStr = p.timestamp ? new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const dateStr = p.timestamp ? new Date(p.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }) : '';

    tr.setAttribute('title', 'Click to inspect full message & recipient details');
    tr.onclick = () => window.openMessageDetail(p.id);

    tr.innerHTML = `
      <td>
        <div class="item-cell">
          <div class="item-thumb"><i data-lucide="user" style="width: 14px; height: 14px;"></i></div>
          <div>
            <div class="item-title">${escapeHtml(p.contactName || 'WhatsApp User')}</div>
            <div class="item-sub">${escapeHtml(dateStr)} • ${escapeHtml(timeStr)}</div>
          </div>
        </div>
      </td>
      <td><span style="font-family: var(--font-mono); color: var(--muted); font-size: 12px;">${escapeHtml(p.chatId)}</span></td>
      <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${escapeHtml(p.message || '-')}
      </td>
      <td><span class="badge-status-pill badge-blue">${escapeHtml(p.rule || 'Auto-Reply')}</span></td>
      <td><span class="badge-status-pill ${badgeClass}">${escapeHtml(p.status || 'Delivered')}</span></td>
    `;
    tbody.appendChild(tr);
  });
  refreshIcons();
}

// Open Message & Dispatch Details Modal
window.openMessageDetail = function (id) {
  const d = allDispatches.find((item) => item.id === id);
  if (!d) return;

  const contactEl = document.getElementById('detailContactName');
  const chatEl = document.getElementById('detailChatId');
  const statusEl = document.getElementById('detailStatusBadge');
  const timeEl = document.getElementById('detailTimestamp');
  const ruleEl = document.getElementById('detailRuleBadge');
  const contentEl = document.getElementById('detailMessageContent');

  if (contactEl) contactEl.textContent = d.contactName || 'WhatsApp User';
  if (chatEl) chatEl.textContent = d.chatId || 'WhatsApp Chat';
  if (statusEl) {
    statusEl.textContent = d.status || 'Delivered';
    statusEl.className = d.status === 'Delivered' ? 'badge-status-pill badge-delivered' : 'badge-status-pill badge-error';
  }
  if (timeEl) {
    timeEl.textContent = d.timestamp
      ? new Date(d.timestamp).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'medium' })
      : 'Real-time Dispatched';
  }
  if (ruleEl) ruleEl.textContent = d.rule || 'Auto Response';
  if (contentEl) contentEl.textContent = d.message || '(No text content)';

  const btnCopy = document.getElementById('btnCopyDetailMessage');
  if (btnCopy) {
    btnCopy.onclick = () => {
      navigator.clipboard.writeText(d.message || '');
      btnCopy.innerHTML = '<i data-lucide="check" style="width: 12px; height: 12px; margin-right: 4px;"></i> Copied!';
      refreshIcons();
      setTimeout(() => {
        btnCopy.innerHTML = '<i data-lucide="copy" style="width: 12px; height: 12px; margin-right: 4px;"></i> Copy Text';
        refreshIcons();
      }, 2000);
    };
  }

  const btnSim = document.getElementById('btnDetailOpenSimulator');
  if (btnSim) {
    btnSim.onclick = () => {
      closeModal('messageDetailModal');
      const simTabBtn = document.querySelector('.nav-item[data-tab="tab-simulator"]');
      if (simTabBtn) simTabBtn.click();
      const simInput = document.getElementById('simInputText');
      if (simInput) {
        simInput.value = d.message || '';
        simInput.focus();
      }
    };
  }

  const btnQuickReply = document.getElementById('btnDetailQuickReply');
  if (btnQuickReply) {
    btnQuickReply.onclick = () => {
      closeModal('messageDetailModal');
      const directChatId = document.getElementById('directSendChatId');
      if (directChatId) directChatId.value = d.chatId || '';
      openModal('directSendModal');
    };
  }

  openModal('messageDetailModal');
  refreshIcons();
};

// Render Adaptive Message Traffic Bar Chart
function renderAdaptiveBarChart(period, bounds, dispatches) {
  const container = document.getElementById('chartBarsContainer');
  const yAxis = document.getElementById('chartYAxis');
  if (!container) return;

  let columns = [];

  if (period === 'day') {
    const slots = [
      { label: '00h', startH: 0, endH: 4 },
      { label: '04h', startH: 4, endH: 8 },
      { label: '08h', startH: 8, endH: 12 },
      { label: '12h', startH: 12, endH: 16 },
      { label: '16h', startH: 16, endH: 20 },
      { label: '20h', startH: 20, endH: 24 },
    ];
    const currentHour = new Date().getHours();

    columns = slots.map((s) => {
      const count = dispatches.filter((d) => {
        if (!d.timestamp) return false;
        const h = new Date(d.timestamp).getHours();
        return h >= s.startH && h < s.endH;
      }).length;
      return {
        label: s.label,
        count,
        isCurrent: currentHour >= s.startH && currentHour < s.endH,
      };
    });
  } else if (period === 'week') {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    columns = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayName = dayNames[d.getDay()];
      const dStr = d.toISOString().split('T')[0];
      const count = dispatches.filter((item) => {
        if (!item.timestamp) return false;
        return item.timestamp.startsWith(dStr);
      }).length;
      columns.push({
        label: `${dayName} ${d.getDate()}`,
        count,
        isCurrent: i === 0,
      });
    }
  } else if (period === 'month') {
    const weeks = [
      { label: 'W1', startDay: 1, endDay: 7 },
      { label: 'W2', startDay: 8, endDay: 14 },
      { label: 'W3', startDay: 15, endDay: 21 },
      { label: 'W4', startDay: 22, endDay: 28 },
      { label: 'W5', startDay: 29, endDay: 31 },
    ];
    const currentDay = new Date().getDate();
    columns = weeks.map((w) => {
      const count = dispatches.filter((d) => {
        if (!d.timestamp) return false;
        const day = new Date(d.timestamp).getDate();
        return day >= w.startDay && day <= w.endDay;
      }).length;
      return {
        label: w.label,
        count,
        isCurrent: currentDay >= w.startDay && currentDay <= w.endDay,
      };
    });
  } else {
    // Year / All: 6-Month progression
    const monthKeys = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const currentMonthIdx = now.getMonth();
    const targetMonths = [];
    for (let i = 5; i >= 0; i--) {
      const idx = (currentMonthIdx - i + 12) % 12;
      targetMonths.push({ name: monthKeys[idx], idx });
    }

    columns = targetMonths.map((m, idx) => {
      const count = dispatches.filter((d) => {
        if (!d.timestamp) return false;
        const monthNum = new Date(d.timestamp).getMonth();
        return monthNum === m.idx;
      }).length;
      return {
        label: m.name,
        count,
        isCurrent: idx === targetMonths.length - 1,
      };
    });
  }

  let maxCount = Math.max(...columns.map((c) => c.count), 0);
  if (yAxis) {
    if (maxCount === 0) {
      yAxis.innerHTML = `<span>10</span><span>7</span><span>5</span><span>2</span><span>0</span>`;
    } else {
      yAxis.innerHTML = `
        <span>${maxCount}</span>
        <span>${Math.round(maxCount * 0.75)}</span>
        <span>${Math.round(maxCount * 0.5)}</span>
        <span>${Math.round(maxCount * 0.25)}</span>
        <span>0</span>
      `;
    }
  }

  container.innerHTML = '';
  columns.forEach((col) => {
    const heightPercent = maxCount > 0 ? Math.max(8, Math.round((col.count / maxCount) * 90)) : 8;
    const colEl = document.createElement('div');
    colEl.className = `bar-col ${col.isCurrent ? 'highlighted' : ''}`;
    colEl.setAttribute('title', `${col.label}: ${col.count} messages`);
    colEl.innerHTML = `
      <div class="bar-pill" style="height: ${heightPercent}%;"></div>
      <span class="bar-label">${col.label}</span>
    `;
    container.appendChild(colEl);
  });
}

// Update Real Delivery Health Donut Ring
function updateDeliveryHealthDonut(rate = 100) {
  const donutCircle = document.getElementById('donutProgressCircle');
  const donutText = document.getElementById('donutPercentageText');
  const statusText = document.getElementById('deliveryHealthStatusText');

  if (donutText) donutText.textContent = `${rate}%`;
  if (statusText) statusText.textContent = `● ${rate}%`;

  if (donutCircle) {
    const circumference = 157; // 2 * PI * 25
    const offset = circumference * (1 - Math.min(100, Math.max(0, rate)) / 100);
    donutCircle.style.strokeDashoffset = offset;
  }
}

// Global Real-time Search Filter (Recipient Name, Message Content, Rule, etc.)
function setupSearchFilter() {
  const searchInput = document.getElementById('globalSearchInput');
  const btnClear = document.getElementById('btnClearSearch');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      applyActiveFilter();
      filterCurrentTabContent(currentSearchQuery);
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearchQuery = '';
      applyActiveFilter();
      filterCurrentTabContent('');
    });
  }
}

function filterCurrentTabContent(query) {
  const q = (query || '').toLowerCase();
  const rows = document.querySelectorAll('#rulesTableBody tr, #contactsTableBody tr, #leadsTableBody tr, #campaignsTableBody tr');
  rows.forEach((row) => {
    const text = row.innerText.toLowerCase();
    row.style.display = !q || text.includes(q) ? '' : 'none';
  });
}

// WebSocket Connection
function setupWebSocket() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}`;

  try {
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to WhatsApp Automation WebSocket Hub');
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        handleWsMessage(payload);
      } catch (err) {
        console.error('WS Parse Error:', err);
      }
    };

    ws.onclose = () => {
      console.log('WS disconnected. Reconnecting in 3s...');
      setTimeout(setupWebSocket, 3000);
    };
  } catch (e) {
    console.error('WS Connection error:', e);
  }
}

function handleWsMessage(payload) {
  const { type, data, timestamp } = payload;

  appendLogEntry(type, data, timestamp);

  if (type === 'incoming_message') {
    appendSimMessage('user', `${data.senderName}: ${data.text}`);
    loadStatus();
  } else if (type === 'automation_reply') {
    appendSimMessage('bot', data.replyText);
    loadStatus();
  } else if (type === 'session_update') {
    renderSessionState(data);
  } else if (type === 'campaign_progress') {
    loadCampaigns();
    loadStatus();
  }
}

function renderSessionState(session) {
  const status = session.status || 'DISCONNECTED';
  const isConnected = status === 'CONNECTED';
  const isScanning = status === 'SCAN_QR_CODE';

  const sessionBadge = document.getElementById('sessionStatusBadge');
  const sidebarLabel = document.getElementById('sidebarGatewayLabel');
  const qrImage = document.getElementById('qrImage');
  const qrPlaceholder = document.getElementById('qrPlaceholder');

  if (sidebarLabel) {
    sidebarLabel.textContent = isConnected ? 'Gateway: Online' : `Gateway: ${status}`;
  }

  if (sessionBadge) {
    sessionBadge.textContent = isConnected ? 'CONNECTED' : status;
    sessionBadge.className = isConnected ? 'badge-status-pill badge-success' : isScanning ? 'badge-status-pill badge-warning' : 'badge-status-pill badge-error';
  }

  if (qrPlaceholder && qrImage) {
    if (isConnected) {
      qrPlaceholder.classList.remove('hidden');
      qrImage.classList.add('hidden');
      qrPlaceholder.innerHTML = `
        <div style="margin-bottom: 6px;">
          <i data-lucide="check-circle" style="width: 32px; height: 32px; color: #10b981;"></i>
        </div>
        <p style="color: #10b981; font-weight: 600; font-size: 11px; margin-top: 4px;">WhatsApp Connected</p>
      `;
    } else if (isScanning && session.qrCode) {
      qrPlaceholder.classList.add('hidden');
      qrImage.classList.remove('hidden');
      qrImage.src = session.qrCode;
    } else {
      qrPlaceholder.classList.remove('hidden');
      qrImage.classList.add('hidden');
      qrPlaceholder.innerHTML = `
        <div style="margin-bottom: 6px;">
          <i data-lucide="smartphone" style="width: 28px; height: 28px; color: var(--muted);"></i>
        </div>
        <p style="font-size: 11px; margin-top: 4px; color: var(--muted);">Click Start Session</p>
      `;
    }
  }
  refreshIcons();
}

// Data Fetchers
async function loadAllData() {
  await Promise.all([
    loadStatus(),
    loadProfile(),
    loadRules(),
    loadCampaigns(),
    loadContacts(),
    loadLeads(),
    loadSettings(),
    loadLogs(),
  ]);
  refreshIcons();
}

async function loadProfile() {
  try {
    const res = await fetch('/api/profile');
    const p = await res.json();

    const el = (id) => document.getElementById(id);
    if (el('profAdminName')) el('profAdminName').value = p.adminName || '';
    if (el('profBusinessName')) el('profBusinessName').value = p.businessName || '';
    if (el('profRole')) el('profRole').value = p.role || '';
    if (el('profBusinessNiche')) el('profBusinessNiche').value = p.businessNiche || '';
    if (el('profContactPhone')) el('profContactPhone').value = p.contactPhone || '';
    if (el('profSupportEmail')) el('profSupportEmail').value = p.supportEmail || '';
    if (el('profWebsiteUrl')) el('profWebsiteUrl').value = p.websiteUrl || '';
    if (el('profOperatingHours')) el('profOperatingHours').value = p.operatingHours || '';
    if (el('profPersonaToneSelect')) el('profPersonaToneSelect').value = p.personaTone || 'Professional, courteous, and highly knowledgeable';
    if (el('profCustomSignature')) el('profCustomSignature').value = p.customSignature || '';
    if (el('profAboutBusiness')) el('profAboutBusiness').value = p.aboutBusiness || '';

    // Update avatar tooltip
    const userProfileBtn = document.getElementById('btnUserProfile');
    if (userProfileBtn && p.adminName) {
      userProfileBtn.setAttribute('title', `${p.adminName} (${p.role || 'Admin'}) - Click to edit profile & persona`);
    }
  } catch (err) {
    console.error('Failed to load profile:', err);
  }
}

async function loadStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    globalStatusData = data;
    allDispatches = data.recentDispatches || [];

    if (data.session) {
      renderSessionState(data.session);
    }

    const engineInfo = document.getElementById('infoEngineType');
    if (engineInfo && data.engineType) {
      engineInfo.textContent = data.engineType;
    }

    const aiStatus = document.getElementById('infoAiStatus');
    if (aiStatus && data.ai) {
      if (data.ai.provider === 'disabled') {
        aiStatus.textContent = 'Disabled';
        aiStatus.className = 'badge-status-pill badge-warning';
      } else if (data.ai.provider === 'antigravity') {
        aiStatus.textContent = 'Active (Antigravity AI)';
        aiStatus.className = 'badge-status-pill badge-success';
      } else if (data.ai.provider === 'gemini') {
        aiStatus.textContent = data.ai.geminiConfigured ? 'Active (Gemini 2.0)' : 'Key Needed';
        aiStatus.className = data.ai.geminiConfigured ? 'badge-status-pill badge-blue' : 'badge-status-pill badge-warning';
      } else {
        aiStatus.textContent = data.ai.openaiConfigured ? 'Active (OpenAI)' : 'Key Needed';
        aiStatus.className = data.ai.openaiConfigured ? 'badge-status-pill badge-purple' : 'badge-status-pill badge-warning';
      }
    }

    // Apply active filter to recalculate KPIs, charts, and render table
    applyActiveFilter();
  } catch (err) {
    console.error('Failed to load status:', err);
  }
}

async function loadMetrics() {
  await loadStatus();
}

// Rules CRUD
async function loadRules() {
  try {
    const res = await fetch('/api/rules');
    const rules = await res.json();
    const tbody = document.getElementById('rulesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    rules.forEach((rule) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <input type="checkbox" ${rule.enabled ? 'checked' : ''} onchange="toggleRule('${rule.id}', this.checked)" />
        </td>
        <td><strong>${escapeHtml(rule.name)}</strong></td>
        <td><span class="badge-status-pill badge-blue">${rule.triggerType}</span></td>
        <td><code style="font-family: var(--font-mono); font-size: 12px;">${escapeHtml(rule.keywords.join(', '))}</code></td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${escapeHtml(rule.replyText || (rule.responseType === 'flow' ? 'Trigger Flow: ' + rule.flowId : 'Custom Action'))}
        </td>
        <td>${rule.reactionEmoji || '-'}</td>
        <td>${rule.priority || 5}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary btn-sm" onclick="editRule('${rule.id}')"><i data-lucide="edit-3"></i> Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRule('${rule.id}')"><i data-lucide="trash-2"></i> Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
    refreshIcons();
  } catch (e) {
    console.error(e);
  }
}

window.toggleRule = async function (id, enabled) {
  await fetch(`/api/rules/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled }),
  });
  loadMetrics();
};

window.deleteRule = async function (id) {
  if (confirm('Are you sure you want to delete this rule?')) {
    await fetch(`/api/rules/${id}`, { method: 'DELETE' });
    loadRules();
    loadMetrics();
  }
};

window.editRule = async function (id) {
  const res = await fetch('/api/rules');
  const rules = await res.json();
  const rule = rules.find((r) => r.id === id);
  if (!rule) return;

  document.getElementById('ruleEditId').value = rule.id;
  document.getElementById('ruleNameInput').value = rule.name;
  document.getElementById('ruleTriggerTypeSelect').value = rule.triggerType;
  document.getElementById('ruleKeywordsInput').value = rule.keywords.join(', ');
  document.getElementById('ruleReplyTextInput').value = rule.replyText || '';
  document.getElementById('ruleEmojiInput').value = rule.reactionEmoji || '';
  document.getElementById('rulePriorityInput').value = rule.priority || 5;
  document.getElementById('ruleModalTitle').textContent = 'Edit Automation Rule';

  openModal('ruleModal');
  refreshIcons();
};

// Leads
async function loadLeads() {
  try {
    const res = await fetch('/api/leads');
    const leads = await res.json();
    const tbody = document.getElementById('leadsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (leads.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--muted); padding: 24px;">No captured leads yet. Try typing <code>/lead</code> in the simulator!</td></tr>';
      return;
    }

    leads.forEach((l) => {
      const tr = document.createElement('tr');
      const dataStr = Object.entries(l.data || {})
        .map(([k, v]) => `<strong>${k}</strong>: ${escapeHtml(String(v))}`)
        .join(' | ');

      tr.innerHTML = `
        <td>${new Date(l.createdAt).toLocaleString()}</td>
        <td><code>${escapeHtml(l.chatId)}</code></td>
        <td><span class="badge-status-pill badge-purple">${escapeHtml(l.flowName || 'Lead Flow')}</span></td>
        <td>${dataStr}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteLead('${l.id}')"><i data-lucide="trash-2"></i> Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    refreshIcons();
  } catch (e) {
    console.error(e);
  }
}

window.deleteLead = async function (id) {
  if (confirm('Delete this lead record?')) {
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    loadLeads();
    loadMetrics();
  }
};

// Campaigns
async function loadCampaigns() {
  try {
    const res = await fetch('/api/campaigns');
    const campaigns = await res.json();
    const tbody = document.getElementById('campaignsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (campaigns.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--muted); padding: 24px;">No broadcast campaigns created yet.</td></tr>';
      return;
    }

    campaigns.forEach((c) => {
      const tr = document.createElement('tr');
      const badgeClass = c.status === 'completed' ? 'badge-success' : c.status === 'running' ? 'badge-blue' : 'badge-warning';
      const statsStr = c.stats ? `${c.stats.sent} / ${c.stats.total}` : '0 / 0';

      tr.innerHTML = `
        <td><span class="badge-status-pill ${badgeClass}">${c.status}</span></td>
        <td><strong>${escapeHtml(c.name)}</strong></td>
        <td>${c.targetType === 'all' ? 'All Contacts' : c.targetTags ? c.targetTags.join(', ') : 'Custom'}</td>
        <td>${c.scheduleType}</td>
        <td><strong>${statsStr}</strong></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-success btn-sm" onclick="runCampaign('${c.id}')" ${c.status === 'running' ? 'disabled' : ''}><i data-lucide="play"></i> Run</button>
            <button class="btn btn-danger btn-sm" onclick="deleteCampaign('${c.id}')"><i data-lucide="trash-2"></i> Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
    refreshIcons();
  } catch (e) {
    console.error(e);
  }
}

window.runCampaign = async function (id) {
  if (confirm('Run this broadcast campaign now?')) {
    await fetch(`/api/campaigns/${id}/run`, { method: 'POST' });
    loadCampaigns();
  }
};

window.deleteCampaign = async function (id) {
  if (confirm('Delete this campaign?')) {
    await fetch(`/api/campaigns/${id}`, { method: 'DELETE' });
    loadCampaigns();
    loadMetrics();
  }
};

// Contacts
async function loadContacts() {
  try {
    const res = await fetch('/api/contacts');
    const contacts = await res.json();
    const tbody = document.getElementById('contactsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    contacts.forEach((c) => {
      const tr = document.createElement('tr');
      const tagHtml = (c.tags || []).map((t) => `<span class="badge-status-pill badge-blue">${escapeHtml(t)}</span>`).join(' ');

      tr.innerHTML = `
        <td><strong>${escapeHtml(c.name)}</strong></td>
        <td>${escapeHtml(c.phone)}</td>
        <td><code>${escapeHtml(c.chatId)}</code></td>
        <td>${tagHtml || '-'}</td>
        <td>${escapeHtml(c.notes || '-')}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteContact('${c.id}')"><i data-lucide="trash-2"></i> Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    refreshIcons();
  } catch (e) {
    console.error(e);
  }
}

window.deleteContact = async function (id) {
  if (confirm('Delete contact?')) {
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    loadContacts();
    loadMetrics();
  }
};

// Settings
async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    const s = await res.json();

    const el = (id) => document.getElementById(id);
    if (el('settingOpenwaUrl')) el('settingOpenwaUrl').value = s.openwaBaseUrl || 'http://localhost:2785';
    if (el('settingSessionId')) el('settingSessionId').value = s.sessionId || 'default';
    if (el('settingOpenwaApiKey')) el('settingOpenwaApiKey').value = s.openwaApiKey || '';
    if (el('settingAdminNumber')) el('settingAdminNumber').value = s.adminAlertNumber || '';
    if (el('settingDelayMin')) el('settingDelayMin').value = s.antiBanDelayMinMs || 4000;
    if (el('settingDelayMax')) el('settingDelayMax').value = s.antiBanDelayMaxMs || 9000;
    if (el('settingAutoCallReject')) el('settingAutoCallReject').checked = s.autoCallReject !== false;
    if (el('settingAutoCallMsg')) el('settingAutoCallMsg').value = s.autoCallMessage || '';

    // AI
    if (el('aiProviderSelect')) el('aiProviderSelect').value = s.aiProvider || 'antigravity';
    if (el('geminiApiKeyInput')) el('geminiApiKeyInput').value = s.geminiApiKey || '';
    if (el('geminiModelSelect')) el('geminiModelSelect').value = s.geminiModel || 'gemini-2.0-flash';
    if (el('openaiApiKeyInput')) el('openaiApiKeyInput').value = s.openaiApiKey || '';
    if (el('openaiModelSelect')) el('openaiModelSelect').value = s.openaiModel || 'gpt-4o-mini';
    if (el('aiSystemPromptInput')) el('aiSystemPromptInput').value = s.aiSystemPrompt || '';
    if (el('aiKnowledgeBaseInput')) el('aiKnowledgeBaseInput').value = s.aiKnowledgeBase || '';

    toggleAiFields(s.aiProvider || 'antigravity');
  } catch (e) {
    console.error(e);
  }
}

function toggleAiFields(provider) {
  const antigravityFields = document.getElementById('antigravityConfigFields');
  const geminiFields = document.getElementById('geminiConfigFields');
  const openaiFields = document.getElementById('openaiConfigFields');

  if (antigravityFields) antigravityFields.classList.toggle('hidden', provider !== 'antigravity');
  if (geminiFields) geminiFields.classList.toggle('hidden', provider !== 'gemini');
  if (openaiFields) openaiFields.classList.toggle('hidden', provider !== 'openai');
}

// Logs
async function loadLogs() {
  try {
    const res = await fetch('/api/logs');
    const logs = await res.json();
    const box = document.getElementById('logStreamBox');
    if (!box) return;

    box.innerHTML = '';
    logs.reverse().forEach((l) => appendLogEntry(l.event, l, l.timestamp));
  } catch (e) {
    console.error(e);
  }
}

function appendLogEntry(event, data, timestamp) {
  const box = document.getElementById('logStreamBox');
  if (!box) return;

  const entry = document.createElement('div');
  entry.className = 'log-row';

  let eventClass = 'incoming';
  if (event.includes('reply') || event.includes('sent') || event.includes('test')) eventClass = 'reply';
  if (event.includes('ai')) eventClass = 'ai';
  if (event.includes('error') || event.includes('failed')) eventClass = 'error';

  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();
  const summaryStr = typeof data === 'object' ? JSON.stringify(data) : String(data);

  entry.innerHTML = `
    <span class="log-timestamp">[${timeStr}]</span>
    <span class="log-tag ${eventClass}">[${event}]</span>
    <span class="log-content">${escapeHtml(summaryStr)}</span>
  `;

  box.appendChild(entry);
  box.scrollTop = box.scrollHeight;
}

// Simulator Implementation
async function sendSimulatorMessage() {
  const input = document.getElementById('simInputText');
  const text = input.value.trim();
  if (!text) return;

  const senderName = document.getElementById('simSenderName').value.trim() || 'Alex Smith';
  const chatId = document.getElementById('simSenderChatId').value.trim() || '1234567890@s.whatsapp.net';

  appendSimMessage('user', text);
  input.value = '';

  const traceBox = document.getElementById('simTraceBox');
  traceBox.innerHTML = `<span style="color: #60a5fa;">Processing through WhatsApp Engine...</span>`;

  try {
    const res = await fetch('/api/test-simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, senderName, chatId }),
    });

    const data = await res.json();
    if (data.result?.replyText) {
      appendSimMessage('bot', data.result.replyText);
    }

    traceBox.innerHTML = `
<strong>Status:</strong> Success (${data.durationMs}ms)
<strong>Type:</strong> ${data.result?.type}
<strong>Matched Rule / Engine:</strong> ${data.result?.matchedRule?.name || 'AI Assistant'}
<strong>Action / Emoji:</strong> ${data.result?.reactionEmoji || 'None'}
<strong>Output Payload:</strong>
${escapeHtml(JSON.stringify(data.result, null, 2))}
    `;

    loadLeads();
    loadStatus();
  } catch (err) {
    traceBox.innerHTML = `<span style="color: #ef4444;">Error: ${escapeHtml(err.message)}</span>`;
  }
}

function appendSimMessage(sender, text) {
  const container = document.getElementById('simMessagesContainer');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = `msg-bubble ${sender}`;

  bubble.innerHTML = `
    <div class="msg-text">${formatWhatsAppMarkdown(text)}</div>
    <div class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
  `;

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

window.triggerSimCommand = function (cmd) {
  document.getElementById('simInputText').value = cmd;
  sendSimulatorMessage();
};

function formatWhatsAppMarkdown(text) {
  let formatted = escapeHtml(text);
  formatted = formatted.replace(/\*([^\*]+)\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/_([^_]+)_/g, '<em>$1</em>');
  formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
  formatted = formatted.replace(/\n/g, '<br/>');
  return formatted;
}

// Event Listeners
function setupEventListeners() {
  const simSend = document.getElementById('simSendBtn');
  const simInput = document.getElementById('simInputText');
  if (simSend) simSend.addEventListener('click', sendSimulatorMessage);
  if (simInput) {
    simInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendSimulatorMessage();
    });
  }

  const btnReset = document.getElementById('btnResetSimChat');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      document.getElementById('simMessagesContainer').innerHTML = '';
    });
  }

  const btnRefresh = document.getElementById('btnRefreshStatus');
  if (btnRefresh) btnRefresh.addEventListener('click', loadAllData);

  const btnQuickSend = document.getElementById('btnQuickSend');
  if (btnQuickSend) {
    btnQuickSend.addEventListener('click', () => {
      openModal('directSendModal');
    });
  }

  const btnRefreshPurchases = document.getElementById('btnRefreshPurchases');
  if (btnRefreshPurchases) {
    btnRefreshPurchases.addEventListener('click', loadStatus);
  }

  // Start Session Button
  const btnStart = document.getElementById('btnStartSession');
  if (btnStart) {
    btnStart.addEventListener('click', async () => {
      const qrPlaceholder = document.getElementById('qrPlaceholder');
      const qrImage = document.getElementById('qrImage');
      if (qrPlaceholder && qrImage) {
        qrPlaceholder.classList.remove('hidden');
        qrImage.classList.add('hidden');
        qrPlaceholder.innerHTML = `
          <div style="margin-bottom: 6px;">
            <i data-lucide="loader-2" class="spin-icon" style="width: 28px; height: 28px; color: var(--brand-accent);"></i>
          </div>
          <p style="font-size: 11px; margin-top: 4px; font-weight: 600;">Generating QR Code...</p>
        `;
        refreshIcons();
      }

      try {
        await fetch('/api/session/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ forceReset: false }),
        });

        // Poll for QR Code or Connection until ready
        let attempts = 0;
        const pollInterval = setInterval(async () => {
          attempts++;
          const res = await fetch('/api/session/qr');
          const data = await res.json();
          if (data.qr && qrPlaceholder && qrImage) {
            qrPlaceholder.classList.add('hidden');
            qrImage.classList.remove('hidden');
            qrImage.src = data.qr;
            clearInterval(pollInterval);
          }
          if (data.status === 'CONNECTED') {
            clearInterval(pollInterval);
          }
          if (attempts > 12) clearInterval(pollInterval);
        }, 1200);
      } catch (err) {
        console.error('Error starting session:', err);
      }
    });
  }

  // Quick Connect button in sidebar
  const btnQuickConnect = document.getElementById('btnQuickConnect');
  if (btnQuickConnect) {
    btnQuickConnect.addEventListener('click', () => {
      const overviewBtn = document.querySelector('.nav-item[data-tab="tab-overview"]');
      if (overviewBtn) overviewBtn.click();
      const qrBox = document.getElementById('sectionGatewayConnection');
      if (qrBox) {
        qrBox.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Stop Session Button
  const btnStop = document.getElementById('btnStopSession');
  if (btnStop) {
    btnStop.addEventListener('click', async () => {
      if (confirm('Stop WhatsApp session?')) {
        await fetch('/api/session/stop', { method: 'POST' });
        loadStatus();
      }
    });
  }

  // Fetch / Refresh QR Button
  const btnFetchQR = document.getElementById('btnFetchQR');
  if (btnFetchQR) {
    btnFetchQR.addEventListener('click', async () => {
      const qrPlaceholder = document.getElementById('qrPlaceholder');
      const qrImage = document.getElementById('qrImage');
      if (qrPlaceholder && qrImage) {
        qrPlaceholder.classList.remove('hidden');
        qrImage.classList.add('hidden');
        qrPlaceholder.innerHTML = `
          <div style="margin-bottom: 6px;">
            <i data-lucide="loader-2" class="spin-icon" style="width: 28px; height: 28px; color: var(--brand-accent);"></i>
          </div>
          <p style="font-size: 11px; margin-top: 4px; font-weight: 600;">Refreshing QR Code...</p>
        `;
        refreshIcons();
      }

      await fetch('/api/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forceReset: true }),
      });

      let attempts = 0;
      const pollInterval = setInterval(async () => {
        attempts++;
        const res = await fetch('/api/session/qr');
        const data = await res.json();
        if (data.qr && qrPlaceholder && qrImage) {
          qrPlaceholder.classList.add('hidden');
          qrImage.classList.remove('hidden');
          qrImage.src = data.qr;
          clearInterval(pollInterval);
        }
        if (attempts > 12) clearInterval(pollInterval);
      }, 1200);
    });
  }

  // Auto Register Webhook
  const btnWebhook = document.getElementById('btnAutoRegisterWebhook');
  if (btnWebhook) {
    btnWebhook.addEventListener('click', async () => {
      const res = await fetch('/api/session/setup-webhook', { method: 'POST' });
      const data = await res.json();
      alert(data.success ? 'Webhook successfully registered!' : `Status: ${data.message || data.error || 'Ready'}`);
    });
  }

  // Modals Open
  const btnRuleModal = document.getElementById('btnOpenNewRuleModal');
  if (btnRuleModal) {
    btnRuleModal.addEventListener('click', () => {
      document.getElementById('ruleEditId').value = '';
      document.getElementById('ruleForm').reset();
      document.getElementById('ruleModalTitle').textContent = 'Add Automation Rule';
      openModal('ruleModal');
    });
  }

  const btnCampModal = document.getElementById('btnOpenNewCampaignModal');
  if (btnCampModal) {
    btnCampModal.addEventListener('click', () => {
      document.getElementById('campaignForm').reset();
      openModal('campaignModal');
    });
  }

  const btnContactModal = document.getElementById('btnOpenNewContactModal');
  if (btnContactModal) {
    btnContactModal.addEventListener('click', () => {
      document.getElementById('contactForm').reset();
      openModal('contactModal');
    });
  }

  // Forms Submit
  const directSendForm = document.getElementById('directSendForm');
  if (directSendForm) {
    directSendForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const chatId = document.getElementById('directSendChatId').value.trim();
      const text = document.getElementById('directSendText').value.trim();

      const res = await fetch('/api/send-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, text }),
      });
      const data = await res.json();
      alert(data.success ? 'Message dispatched successfully!' : `Error: ${data.error}`);
      closeModal('directSendModal');
      loadStatus();
    });
  }

  const ruleForm = document.getElementById('ruleForm');
  if (ruleForm) {
    ruleForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('ruleEditId').value;
      const body = {
        name: document.getElementById('ruleNameInput').value,
        triggerType: document.getElementById('ruleTriggerTypeSelect').value,
        keywords: document.getElementById('ruleKeywordsInput').value,
        replyText: document.getElementById('ruleReplyTextInput').value,
        reactionEmoji: document.getElementById('ruleEmojiInput').value,
        priority: Number(document.getElementById('rulePriorityInput').value),
      };

      if (id) {
        await fetch(`/api/rules/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/rules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }

      closeModal('ruleModal');
      loadRules();
      loadStatus();
    });
  }

  const campForm = document.getElementById('campaignForm');
  if (campForm) {
    campForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        name: document.getElementById('campNameInput').value,
        targetType: document.getElementById('campTargetSelect').value,
        targetTags: document.getElementById('campTagsInput').value.split(',').map((t) => t.trim()).filter(Boolean),
        messageTemplate: document.getElementById('campTemplateInput').value,
      };

      await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      closeModal('campaignModal');
      loadCampaigns();
      loadStatus();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        name: document.getElementById('contactNameInput').value,
        phone: document.getElementById('contactPhoneInput').value,
        tags: document.getElementById('contactTagsInput').value.split(',').map((t) => t.trim()).filter(Boolean),
        notes: document.getElementById('contactNotesInput').value,
      };

      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      closeModal('contactModal');
      loadContacts();
      loadStatus();
    });
  }

  const aiProviderSelect = document.getElementById('aiProviderSelect');
  if (aiProviderSelect) {
    aiProviderSelect.addEventListener('change', (e) => {
      toggleAiFields(e.target.value);
    });
  }

  const aiConfigForm = document.getElementById('aiConfigForm');
  if (aiConfigForm) {
    aiConfigForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        aiProvider: document.getElementById('aiProviderSelect').value,
        geminiApiKey: document.getElementById('geminiApiKeyInput').value,
        geminiModel: document.getElementById('geminiModelSelect').value,
        openaiApiKey: document.getElementById('openaiApiKeyInput').value,
        openaiModel: document.getElementById('openaiModelSelect').value,
        aiSystemPrompt: document.getElementById('aiSystemPromptInput').value,
        aiKnowledgeBase: document.getElementById('aiKnowledgeBaseInput').value,
      };

      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      alert('AI Settings saved successfully!');
      loadStatus();
    });
  }

  const generalSettingsForm = document.getElementById('generalSettingsForm');
  if (generalSettingsForm) {
    generalSettingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        openwaBaseUrl: document.getElementById('settingOpenwaUrl').value,
        sessionId: document.getElementById('settingSessionId').value,
        openwaApiKey: document.getElementById('settingOpenwaApiKey').value,
        adminAlertNumber: document.getElementById('settingAdminNumber').value,
        antiBanDelayMinMs: Number(document.getElementById('settingDelayMin').value),
        antiBanDelayMaxMs: Number(document.getElementById('settingDelayMax').value),
        autoCallReject: document.getElementById('settingAutoCallReject').checked,
        autoCallMessage: document.getElementById('settingAutoCallMsg').value,
      };

      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      alert('System settings updated successfully!');
      loadStatus();
    });
  }

  const btnClearLogs = document.getElementById('btnClearLogsView');
  if (btnClearLogs) {
    btnClearLogs.addEventListener('click', () => {
      const box = document.getElementById('logStreamBox');
      if (box) box.innerHTML = '';
    });
  }

  // Admin Profile & Business Persona Listeners
  const btnUserProfile = document.getElementById('btnUserProfile');
  if (btnUserProfile) {
    btnUserProfile.addEventListener('click', () => {
      loadProfile();
      openModal('adminProfileModal');
    });
  }

  const adminProfileForm = document.getElementById('adminProfileForm');
  if (adminProfileForm) {
    adminProfileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        adminName: document.getElementById('profAdminName').value.trim(),
        businessName: document.getElementById('profBusinessName').value.trim(),
        role: document.getElementById('profRole').value.trim(),
        businessNiche: document.getElementById('profBusinessNiche').value.trim(),
        contactPhone: document.getElementById('profContactPhone').value.trim(),
        supportEmail: document.getElementById('profSupportEmail').value.trim(),
        websiteUrl: document.getElementById('profWebsiteUrl').value.trim(),
        operatingHours: document.getElementById('profOperatingHours').value.trim(),
        personaTone: document.getElementById('profPersonaToneSelect').value,
        customSignature: document.getElementById('profCustomSignature').value.trim(),
        aboutBusiness: document.getElementById('profAboutBusiness').value.trim(),
      };

      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      alert('Admin Profile and Persona Engine successfully updated and activated!');
      closeModal('adminProfileModal');
      loadProfile();
      loadStatus();
    });
  }

  // Help center button
  const btnHelp = document.getElementById('btnHelpCenter');
  if (btnHelp) {
    btnHelp.addEventListener('click', () => {
      alert('WhatsApp Automation Suite Guide:\n\n1. Click your Profile icon (top-right) to set your Admin & Business Persona.\n2. Scan QR code in Dashboard to connect your phone.\n3. Add keywords in Automation Rules tab to auto-reply.\n4. Test conversational flows in the Live Simulator!\n5. Use Day/Week/Month/Year and Search to inspect real dispatches.');
    });
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('hidden');
  refreshIcons();
}

window.closeModal = function (id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
