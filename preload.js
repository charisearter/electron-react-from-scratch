// preload api for communications goes here

const { contextBridge, ipcRenderer } = require('electron');

const API = {
	sayHello: arg => ipcRenderer.invoke('say-hello', arg),
	sendMsg: msg => ipcRenderer.send('message', msg),

	notification: {
		sendNotification(message) {
			console.log(`Notify is working: Message is - ${message}`);
			ipcRenderer.send('notify', message);
		},
  },
  openFile: () => ipcRenderer.invoke('dialog:openFile')
};

contextBridge.exposeInMainWorld('api', API);
