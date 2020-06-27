// Basic Imports based on Application
import { ServerInstance } from './'
import { AEROSERV_PORT, HOST } from './utils'

// Visual Utilities
import signale from 'signale'
import CFonts from 'cfonts'

// General Utilities
import getPort from 'get-port'

// Development-specific Middleware
import morgan from 'morgan'
import errorhandler from 'errorhandler'

/** Development instance of whole application */
class DevelopmentInstance extends ServerInstance {
	/** Development-specific middleware. */
	public middleware(): void {
		this.core.use(morgan('dev'))
		this.core.use(errorhandler())
	}
	/** Development Runtime to run a server. */
	public async runtime(): Promise<void> {
		// Definition of preffered port.
		const PREFFERED_PORT = await getPort({
			port: 3600,
		})
		// Definition of port range (preffered and DotENV)
		const APP_PORT = AEROSERV_PORT || PREFFERED_PORT
		// Listen function of a server.
		this.core.listen(APP_PORT, function() {
			// Printing Console Logo
			CFonts.say('Aeroservv', {
				gradient: false,
				align: 'center',
			})
			// Notification about Server Runtime
			signale.success(
				`Server strated sucessfully at http://${HOST}:${APP_PORT}`
			)
		})
	}
}

new DevelopmentInstance().runtime()
