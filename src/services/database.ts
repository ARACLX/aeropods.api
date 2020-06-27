import { getConnectionManager, ConnectionManager, Connection } from 'typeorm'

/** Service that contains multiple integrations with databases that can be used in whole application. (needs modyfication of controllers.) */
export class DatabaseService {
	public async typeorm() {
		const connectionManager = new ConnectionManager()
		const connection: Connection = connectionManager.create({
			type: 'cockroachdb',
		})
		await connection.connect()
	}
}
