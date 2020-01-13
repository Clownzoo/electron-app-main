const EventTypes = require('../constants/event-type.js');
const { BrowserWindow, ipcMain } = require('electron');
const DEFAULT_OPTION = {
  title: '',
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true
  }
};
class WindowManager {
	constructor() {
    this.winMap = {};
    this.icpRegister();
  }
  
  icpRegister() {
    ipcMain.on(EventTypes.OPEN_WINDOW, async (event, data) => {
      this.open(data);
    });
    ipcMain.on(EventTypes.CLOSE_WINDOW, async (event, data) => {
      this.close(data);
    })
  }

  fromId(id) {
    return BrowserWindow.fromId(id);
  }

	getWindow(name) {
    if (name) {
      if (!this.winMap[name]) return false;
      return this.fromId(this.winMap[name]);
    }
    return BrowserWindow.getCurrentWindow();
  }

	open(payload) {
    const { name, url, options } = payload;
    if (this.winMap[name]) {
      // this.show(name);
      return;
    }
    const win = new BrowserWindow(Object.assign({...DEFAULT_OPTION, ...options}));
    const winId = win.id;
    this.winMap[name] = winId;
    win.loadURL(url);
  }
  
  close(name) {
    console.log('关闭')
  }

	openTool(name) {
		const win = this.getWindow(name);
		win.openDevTools({ mode: 'detach' });
  }
  
  openCurWinTool() {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.openDevTools({ mode: 'detach' });
    }
  }

  openAllWinTool() {
    const allWin = BrowserWindow.getAllWindows();
    if (allWin.length) {
      allWin.forEach(win => {
        win.openDevTools({ mode: 'detach' });
      })
    }
  }

}
const windowManager = new WindowManager();
module.exports = windowManager;