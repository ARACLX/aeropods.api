// https://vercel.com/docs/v2/serverless-functions/introduction

export default (req, res) => {
	const { name = 'World' } = req.query
	res.status(200).send(`Hello ${name}!`)
}
