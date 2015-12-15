var path = require("path");
var StringReplacePlugin = require('string-replace-webpack-plugin');
var NormalModuleReplacementPlugin = require('webpack').NormalModuleReplacementPlugin;
var pathToSource = require('./path_to_source');
var version = require('../package').version;

///////////////////////////////////////////////////
// The web build uses:                           //
// XHR, WebSocket and NetInfo in platforms/web/* //
///////////////////////////////////////////////////
module.exports = {
  entry: "./src/pusher",
  output: {
    library: "Pusher",
    path: path.join(__dirname, "../bundle/web"),
    filename: "pusher.js"
  },
  externals: {
    '../package': '{version: "'+ version +'"}'
  },
  plugins: [
    new NormalModuleReplacementPlugin(/platforms\/node\/ws/, pathToSource('platforms/web/ws')),
    new NormalModuleReplacementPlugin(/platforms\/node\/xhr/, pathToSource('platforms/web/xhr')),
    new NormalModuleReplacementPlugin(/platforms\/node\/net_info/, pathToSource('platforms/web/net_info')),
  ]
}