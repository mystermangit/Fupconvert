// const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    entry:  __dirname + "/app/src/main.js",
    output: {
        path: __dirname + "/app/src",
        filename: "index.js"
    },
    target: 'node-webkit',
    // plugins: [
    //     new BabiliPlugin()
    // ],
    // externals: {
    // 	'fluent-ffmpeg': 'commonjs fluent-ffmpeg'
    // }
};
