module.exports = {
	entry: './app/app.js',
	output: {
		filename: './public/bundle.js'
	},
	devServer: {
		inline: true,
		port: 3006
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}