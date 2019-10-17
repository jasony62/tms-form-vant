/**
 * Build npm lib
 */
const shell = require('shelljs')
const signale = require('signale')

const { Signale } = signale
const tasks = ['node build/build-components.js']

tasks.forEach(task => {
  signale.start(task)

  const interactive = new Signale({ interactive: true })
  interactive.pending(task)
  const result = shell.exec(`${task} --silent`)
  if (result.code !== 0) {
    interactive.error(task)
  } else {
    interactive.success(task)
  }
})
