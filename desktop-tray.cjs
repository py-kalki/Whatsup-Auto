const { app, Tray, Menu, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let tray = null;
let serverProcess = null;
let isQuitting = false;
const PORT = process.env.PORT || 3000;
const DASHBOARD_URL = `http://localhost:${PORT}`;

// Prevent multiple instances from running
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

app.on('second-instance', () => {
  // If user tries to open app again, open dashboard in browser
  shell.openExternal(DASHBOARD_URL);
});

// Start Express & WhatsApp Server process
function startServerProcess() {
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (e) {}
  }

  const serverScript = path.join(__dirname, 'server.js');
  console.log('[Tray App] Starting WhatsApp Automation Server:', serverScript);

  const isPackaged = app.isPackaged;
  const execPath = isPackaged ? process.execPath : 'node';
  const spawnEnv = { ...process.env, PORT: String(PORT) };
  if (isPackaged) {
    spawnEnv.ELECTRON_RUN_AS_NODE = '1';
  }

  // Spawn server process silently
  serverProcess = spawn(execPath, [serverScript], {
    cwd: __dirname,
    env: spawnEnv,
    stdio: 'inherit',
    windowsHide: true,
  });

  serverProcess.on('exit', (code) => {
    console.log(`[Tray App] Server process exited with code ${code}`);
    if (!isQuitting) {
      updateTrayMenu('DISCONNECTED');
    }
  });

  serverProcess.on('error', (err) => {
    console.error('[Tray App] Failed to start server process:', err);
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
      label: status === 'ONLINE' ? '🟢 Server: Running (Port 3000)' : '🔴 Server: Offline',
      enabled: false,
    },
    { type: 'separator' },
    {
      label: '🌐 Open Web Dashboard',
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
    {
      label: '🔄 Restart Automation Engine',
      click: () => {
        startServerProcess();
        setTimeout(() => updateTrayMenu('ONLINE'), 1500);
      },
    },
    { type: 'separator' },
    {
      label: '⚡ Start on Laptop Boot (Auto-Start)',
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
        if (serverProcess) {
          try {
            serverProcess.kill();
          } catch (e) {}
        }
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip(`WhatsAuto Suite (${status === 'ONLINE' ? 'Active' : 'Offline'})`);
}

function createTray() {
  const iconPath = path.join(__dirname, 'public', 'logo-whatsup.png');

  try {
    tray = new Tray(iconPath);
  } catch (err) {
    console.error('[Tray App] Error loading tray icon, falling back to default:', err);
  }

  if (!tray) return;

  updateTrayMenu('ONLINE');

  // Left click / Double click to open browser dashboard
  tray.on('click', () => {
    shell.openExternal(DASHBOARD_URL);
  });

  tray.on('double-click', () => {
    shell.openExternal(DASHBOARD_URL);
  });
}

// App lifecycle
app.whenReady().then(() => {
  // Hide dock/taskbar window since this is a pure system tray service
  if (app.dock) app.dock.hide();

  startServerProcess();
  createTray();

  // If not started with --hidden on startup, open dashboard on first manual run
  const isHiddenLaunch = process.argv.includes('--hidden');
  if (!isHiddenLaunch) {
    setTimeout(() => {
      shell.openExternal(DASHBOARD_URL);
    }, 1200);
  }
});

app.on('window-all-closed', (e) => {
  // Keep app running in background tray even if no windows exist
  e.preventDefault();
});

app.on('before-quit', () => {
  isQuitting = true;
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (e) {}
  }
});
