const {
	app,
	BrowserWindow,
	ipcMain,
	Notification,
	dialog,
} = require('electron');
const path = require('path');

// Check if in Development mode
const isDev = !app.isPackaged;

// Show Dialog Test

const handleFileOpen = async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog();
	if (canceled) {
		return;
	} else {
		return filePaths[0];
	}
};

let mainWindow;
const createWindow = () => {
	mainWindow = new BrowserWindow({
		show: false, // don't show until finished loading
		autoHideMenuBar: true, // hide default electron menu bar
		resizable: false, // don't allow user to resize
		width: 800,
		height: 700,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// Show window when finished loading
	mainWindow.on('ready-to-show', mainWindow.show);

	// open the Dev tools (possibly change to be conditional if in development mode)
	mainWindow.webContents.openDevTools();

	// load UI window
	mainWindow.loadFile('index.html');
};

// Only do Electron reload in Dev environment
if (isDev) {
	// auto reloads Electron when changes are made
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
	});
}

// called when Electron is finished initializing and ready to create browser windows
app.whenReady().then(createWindow);

// Quit all windows, except on macOS.

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// on macOS X, common to re-create window in the app when the dock icon is clicked and there are no other windows open

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// IPC events

// say Hello test
ipcMain.handle('say-hello', (_, args) => {
	console.log(args);
	// will show in console window
	return `Hi, from Main process. This is app version ${app.getVersion()}.`;
});

// Send Message back
ipcMain.on('message', (_, args) => {
	console.log(`Message sent to Main: ${args}`);
});

// actual Notification pop-up

ipcMain.on('notify', (_, message) => {
	console.log(`Notification on Main process: ${message}`);
	new Notification({ title: 'Notification Test', body: message }).show();
});

// show Dialog test
ipcMain.handle('dialog:openFile', handleFileOpen)