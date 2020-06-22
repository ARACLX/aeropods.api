const { statSync, writeFileSync } = require('fs')
const { basename, relative, resolve } = require('path')
const { promisify } = require('util')

const bytes = require('bytes')
const glob = promisify(require('glob'))
const mkdirp = promisify(require('mkdirp'))
const ncc = require('@zeit/ncc')

const DIST_DIR = resolve(__dirname, '../dist')
const CACHE_DIR = resolve(DIST_DIR, '.cache')

const options = {
	// provide a custom cache path
	cache: CACHE_DIR,
	// externals to leave as requires of the build
	externals: [],
	minify: true,
	sourceMap: false,
	watch: false, // default
}

function write(file, data) {
	writeFileSync(file, data)

	console.log(
		`✓ ${relative(__dirname + '/../', file)} (${bytes(statSync(file).size)})`
	)
}
async function build(file) {
	const { code, map, assets } = await ncc(file, options)

	if (Object.keys(assets).length)
		console.error('New unexpected assets are being emitted for', file)

	const name = basename(file, '.ts')
	await mkdirp(resolve(DIST_DIR, name))
	write(resolve(DIST_DIR, 'bundle.js'), code)
	write(resolve(DIST_DIR, 'bundle.map.js'), map)
}

async function main() {
	// create our output and custom cache directories
	await mkdirp(CACHE_DIR)

	// find all routes we want to bundle
	const files = await glob(resolve(__dirname, '../src/**/*.ts'))

	// build all found files
	return Promise.all(files.map(build))
}

main()
