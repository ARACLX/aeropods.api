import Bugsnag from '@bugsnag/js'
import BugsnagPluginExpress from '@bugsnag/plugin-express'

import { BUGSNAG_KEY } from '../utils'

Bugsnag.start({
	apiKey: BUGSNAG_KEY,
	plugins: [BugsnagPluginExpress],
})

Bugsnag.notify(new Error('Test error'))

const bugsnag = Bugsnag.getPlugin('express')

export default bugsnag
