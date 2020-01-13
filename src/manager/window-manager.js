const { BrowserWindow } = require('electron');
class WindowManager {
	constructor() {
		this.winMap = {};
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
    const win = new BrowserWindow(options);
    const winId = win.id;
    this.winMap[name] = winId;
    win.loadURL(url);
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