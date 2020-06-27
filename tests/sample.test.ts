import test from 'ava'
import { createServer } from 'http'
import got from 'got'
import listen from 'test-listen'

import { ServerInstance } from '../src'

const server = new ServerInstance().core
const instance = createServer(server)
const prefix = listen(instance, 'localhost')

test('Hello World', async t => {
	t.is(prefix, prefix)
})
