const { app, BrowserWindow, Tray, Menu, shell, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

let mainWindow = null;
let tray = null;
let isQuitting = false;
let hasNotifiedTray = false;

const PORT = process.env.PORT || 3000;
const DASHBOARD_URL = `http://localhost:${PORT}`;

// Prevent multiple instances from running
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    if (!mainWindow.isVisible()) mainWindow.show();
    mainWindow.focus();
  }
});

function getAppIcon() {
  const icoPath = path.join(__dirname, 'public', 'icon.ico');
  const pngPath = path.join(__dirname, 'public', 'logo-whatsup.png');

  if (fs.existsSync(icoPath)) {
    const img = nativeImage.createFromPath(icoPath);
    if (!img.isEmpty()) return img;
  }
  if (fs.existsSync(pngPath)) {
    const img = nativeImage.createFromPath(pngPath);
    if (!img.isEmpty()) return img;
  }
  return null;
}

function checkServerReady(timeoutMs = 15000, intervalMs = 250) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      const req = http.get(DASHBOARD_URL, (res) => {
        resolve(true);
      });
      req.on('error', () => {
        if (Date.now() - startTime < timeoutMs) {
          setTimeout(check, intervalMs);
        } else {
          resolve(false);
        }
      });
      req.setTimeout(500, () => {
        req.destroy();
      });
    };
    check();
  });
}

function createMainWindow() {
  const icon = getAppIcon();

  mainWindow = new BrowserWindow({
    width: 1340,
    height: 880,
    minWidth: 1000,
    minHeight: 660,
    title: 'WhatsAuto - WhatsApp Automation & AI Suite',
    icon: icon,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
    backgroundColor: '#0b141a',
  });

  const appMenu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Reload Dashboard',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow && mainWindow.loadURL(DASHBOARD_URL),
        },
        {
          label: 'Open in Browser',
          click: () => shell.openExternal(DASHBOARD_URL),
        },
        { type: 'separator' },
        {
          label: 'Minimize to Tray',
          accelerator: 'CmdOrCtrl+W',
          click: () => mainWindow && mainWindow.hide(),
        },
        {
          label: 'Exit WhatsAuto',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            isQuitting = true;
            app.quit();
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation & Guides',
          click: () => shell.openExternal('https://whatsauto.vedanshh.dev/help'),
        },
        {
          label: 'GitHub Repository',
          click: () => shell.openExternal('https://github.com/py-kalki/Whatsup-Auto'),
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(appMenu);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      if (tray && !hasNotifiedTray) {
        hasNotifiedTray = true;
        try {
          tray.displayBalloon({
            title: 'WhatsAuto Still Active',
            content: 'WhatsAuto is running in your background tray to automate WhatsApp.',
            iconType: 'info',
          });
        } catch (e) {}
      }
    }
  });
}

function updateTrayMenu(status = 'ONLINE') {
  if (!tray) return;

  const loginSettings = app.getLoginItemSettings();
  const autoStartEnabled = loginSettings.openAtLogin;

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'WhatsAuto • Automation Suite',
      enabled: false,
    },
    {
      label: status === 'ONLINE' ? '🟢 Server: Active (Port 3000)' : '🔴 Server: Offline',
      enabled: false,
    },
    { type: 'separator' },
    {
      label: '🖥️ Open Dashboard Window',
      click: () => {
        if (mainWindow) {
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.show();
          mainWindow.focus();
        } else {
          createMainWindow();
          mainWindow.loadURL(DASHBOARD_URL);
        }
      },
    },
    {
      label: '🌐 Open in Web Browser',
      click: () => {
        shell.openExternal(DASHBOARD_URL);
      },
    },
    {
      label: '📖 Open Help & Docs',
      click: () => {
        shell.openExternal('https://whatsauto.vedanshh.dev/help');
      },
    },
    { type: 'separator' },
    {
      label: '⚡ Start on Windows Boot (Auto-Start)',
      type: 'checkbox',
      checked: autoStartEnabled,
      click: (menuItem) => {
        const enable = menuItem.checked;
        app.setLoginItemSettings({
          openAtLogin: enable,
          path: process.execPath,
          args: ['--hidden'],
        });
        console.log(`[Tray App] Auto-start on boot set to: ${enable}`);
      },
    },
    { type: 'separator' },
    {
      label: '❌ Exit WhatsAuto',
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip(`WhatsAuto Suite (${status === 'ONLINE' ? 'Active' : 'Offline'})`);
}

function createTray() {
  const icoPath = path.join(__dirname, 'public', 'icon.ico');
  const pngPath = path.join(__dirname, 'public', 'logo-whatsup.png');

  try {
    if (fs.existsSync(icoPath)) {
      tray = new Tray(icoPath);
    } else if (fs.existsSync(pngPath)) {
      const img = nativeImage.createFromPath(pngPath).resize({ width: 16, height: 16 });
      tray = new Tray(img);
    }
  } catch (err) {
    console.error('[Tray App] Error initializing system tray:', err);
    try {
      if (fs.existsSync(pngPath)) {
        const img = nativeImage.createFromPath(pngPath).resize({ width: 16, height: 16 });
        tray = new Tray(img);
      }
    } catch (e) {}
  }

  if (!tray) return;

  try {
    updateTrayMenu('ONLINE');

    tray.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isVisible()) {
          mainWindow.focus();
        } else {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    });

    tray.on('double-click', () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
  } catch (e) {
    console.error('[Tray App] Error setting tray listeners:', e);
  }
}

// App lifecycle
app.whenReady().then(async () => {
  const isHiddenLaunch = process.argv.includes('--hidden');

  createTray();

  if (!isHiddenLaunch) {
    createMainWindow();
    // Show smooth startup splash inside window
    mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>WhatsAuto Loading...</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background-color: #0b141a;
            color: #e9edef;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            user-select: none;
          }
          .card {
            background: rgba(17, 27, 33, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 40px 48px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }
          .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid #202c33;
            border-top: 4px solid #00a884;
            border-radius: 50%;
            animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            margin-bottom: 24px;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          h2 { margin: 0 0 8px 0; font-size: 22px; font-weight: 600; color: #00a884; }
          p { margin: 0; font-size: 14px; color: #8696a0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="spinner"></div>
          <h2>WhatsAuto Suite</h2>
          <p>Starting WhatsApp Engine & AI Assistant...</p>
        </div>
      </body>
      </html>
    `)}`);
  }

  try {
    console.log('[Electron Main] Starting in-process server...');
    await import('./server.js');
    console.log('[Electron Main] Server initialized.');
  } catch (err) {
    console.error('[Electron Main] Failed to initialize server:', err);
  }

  const serverReady = await checkServerReady(15000);
  if (serverReady) {
    updateTrayMenu('ONLINE');
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.loadURL(DASHBOARD_URL);
    }
  } else {
    console.error('[Electron Main] Server startup timed out.');
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.loadURL(DASHBOARD_URL);
    }
  }
});

app.on('window-all-closed', (e) => {
  e.preventDefault();
});

app.on('before-quit', () => {
  isQuitting = true;
});
