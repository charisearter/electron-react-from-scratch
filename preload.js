// preload api for communications goes here

const { contextBridge, ipcRenderer } = require('electron');

const API = {
	sayHello: arg => ipcRenderer.invoke('say-hello', arg),
};

contextBridge.exposeInMainWorld('api', API);
