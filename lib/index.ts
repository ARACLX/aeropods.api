import signale from 'signale'

import { ServerInstance } from './server'

class ServerRuntime extends ServerInstance {
	/** Runs application on dedidacted port */
	public launchup() {
		this.core.listen(process.env.API_PORT || 3600, () => {
			signale.success('🚀  Application running on http://localhost:%d', 3600)
		})
	}
}

new ServerRuntime().launchup()
