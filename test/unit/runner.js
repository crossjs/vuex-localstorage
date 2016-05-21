import { argv } from 'yargs'
import spawn from 'cross-spawn'

export default () => {
  const args = [
    'start', 'test/unit/_karma.conf.js'
  ]
  if (argv.watch) {
    args.push('--watch')
  }
  const runner = spawn(
    './node_modules/.bin/karma',
    args,
    {
      stdio: 'inherit'
    }
  )

  runner.on('exit', function (code) {
    process.exit(code)
  })

  runner.on('error', function (err) {
    throw err
  })
}
