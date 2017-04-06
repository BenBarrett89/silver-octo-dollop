import { spawn } from 'child_process'
import electron from 'electron'

const child = spawn(electron, ['.'], {
  env: {
    ...{
      NODE_ENV: 'development'
    },
    ...process.env
  },
  stdio: 'inherit'
})

child.on('close', () => {
  process.exit()
})
