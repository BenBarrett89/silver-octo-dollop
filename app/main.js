import {app, BrowserWindow} from 'electron'
import path from 'path'
import url from 'url'

let mainWindow
let forceQuit = false

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault()
          mainWindow.hide()
        }
      })

      app.on('activate', () => {
        mainWindow.show()
      })

      app.on('before-quit', () => {
        forceQuit = true
      })
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null
      })
    }
  })
})
