const { app } = require('electron');
const color = require('colors-cli');
const os = require('os');
const path = require('path');
const winManage = require('./manager/window-manager');
const ToolManager = require('./manager/tool-manager');

const platform = os.platform();
const env = process.env.NODE_ENV; // path

const configFile = require(path.resolve('builder', `builder.${env}.json`));
const { bootstrap, window } = configFile;
app.name = bootstrap.name; // set app name

const toolManager = new ToolManager(env, platform);

app.on('ready', () => {
	for (const winItem of window) {
		winManage.open(winItem);
	};
	toolManager.init();
});

app.on('window-all-closed', () => {
  app.quit();
});

console.log(color.green('electron is ready...'));