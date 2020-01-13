const { app, Menu } = require('electron');
const winManage = require('./window-manager');

class Tool {
	constructor(env, platform) {
		this.env = env;
		this.platform = platform;
		this.macTool = [
			{
				label: app.name,
			},
			{
				label: 'Dev Tool',
				submenu: [
					{
						label: 'Home DevTool',
						accelerator: 'Alt+Command+I',
						click: () => {
							winManage.openTool('home');
						},
					},
					{ 
						label: 'Current Window DevTool',
						accelerator: 'Alt+Command+C',
						click: () => {
							winManage.openCurWinTool();
						},
					},
					{ 
						label: 'All Window',
						accelerator: 'Alt+Command+A',
						click: () => {
							winManage.openAllWinTool();
						},
					},
				]
			}
		];
		this.winTool = [];
	}

	init() {
		if (this.platform === 'darwin') this.buildMacTool();
		if (this.platform === 'win32') this.buildWinTool();
	}

	buildWinTool() { }

	buildMacTool() {
		const menu = Menu.buildFromTemplate(this.macTool);
		Menu.setApplicationMenu(menu);
	}

}
module.exports = Tool;