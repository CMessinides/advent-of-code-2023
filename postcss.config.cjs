const OpenProps = require('open-props')

module.exports = {
	plugins: [
		require('postcss-jit-props')(OpenProps)
	]
}
