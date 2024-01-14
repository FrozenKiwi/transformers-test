/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

const inputElement = document.getElementById('text');
const outputElement = document.getElementById('output');

console.log("renderer", inputElement);

// 1. Send input data to the worker thread when it changes.
inputElement.addEventListener('input', async (event) => {
    // 2. Await the result from the worker thread.
    //@ts-ignore
    const result = await window.electronAPI.run(event.target.value);

    // 3. Update the UI.
    outputElement.innerText = JSON.stringify(result, null, 2);
});


console.log('👋 This message is being logged by "renderer.js", included via webpack');
