const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let backendProcess;

const BACKEND_PORT = process.env.BACKEND_PORT || "8000";
const BACKEND_HOST = process.env.BACKEND_HOST || "127.0.0.1";

const startBackend = () => {
  const pythonBin = process.env.PYTHON_BIN || "python";
  const appPath = app.getAppPath();
  const resourcesPath = process.resourcesPath;
  const isPackaged = app.isPackaged;
  const unpackedPath = path.join(resourcesPath, "app.asar.unpacked");
  const backendScript = isPackaged
    ? path.join(unpackedPath, "backend", "main.py")
    : path.join(appPath, "backend", "main.py");
  const cwd = isPackaged ? unpackedPath : appPath;
  const pythonPath = isPackaged ? unpackedPath : appPath;

  backendProcess = spawn(pythonBin, [backendScript], {
    cwd,
    env: {
      ...process.env,
      PYTHONPATH: pythonPath,
      PORT: BACKEND_PORT,
      HOST: BACKEND_HOST,
      UVICORN_RELOAD: process.env.UVICORN_RELOAD || "0",
    },
    stdio: "inherit",
  });

  backendProcess.on("exit", (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    backgroundColor: "#f5f3ef",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const devUrl = process.env.ELECTRON_START_URL;
  if (devUrl) {
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "frontend", "dist", "index.html"));
  }
};

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
