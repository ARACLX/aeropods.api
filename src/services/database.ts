import { getConnectionManager, ConnectionManager, Connection } from 'typeorm'
import {
	COCKROACH_HOST,
	COCKROACH_DATABASE,
	COCKROACH_PORT,
	COCKROACH_PASSWORD,
	COCKROACH_USERNAME,
} from '../utils'
import { User } from '../entity'

/** Service that contains multiple integrations with databases that can be used in whole application. (needs modyfication of controllers.) */
export class DatabaseService {
	/** TypeORM */
	public async typeorm() {
		const connectionManager = new ConnectionManager()
		const connection: Connection = connectionManager.create({
			type: 'cockroachdb',
			host: 'localhost',
			username: 'root',
			password: '',
			port: 26257,
			database: 'defaultdb',
			logging: false,
			synchronize: true,
			entities: [User],
		})
		await connection.connect()
	}
	public prisma() {}
	public mongoose() {}
}
