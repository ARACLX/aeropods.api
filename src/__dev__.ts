import { ServerInstance } from './'
import signale from 'signale'

// All of development configuration should come here

new ServerInstance().core.listen(3600, function() {
	signale.log('Server is listening on http://localhost:3600')
})
