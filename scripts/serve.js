import { spawn } from 'child_process'
import electron from 'electron'

const child = spawn(electron, ['.'], {
  stdio: 'inherit'
})

child.on('close', () => {
  process.exit()
})
