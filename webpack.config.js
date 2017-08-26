const path = require('path');

const _entries = [
  './lib/client/Slatebox.js'
  , './lib/client/Slatebox.slate.js'
  , './lib/client/Slatebox.node.js'
  , './lib/client/slate/Slatebox.slate.birdseye.js'
  , './lib/client/slate/Slatebox.slate.canvas.js'
  , './lib/client/slate/Slatebox.slate.keyboard.js'
  , './lib/client/slate/Slatebox.slate.message.js'
  , './lib/client/slate/Slatebox.slate.collab.js'
  , './lib/client/slate/Slatebox.slate.multiselection.js'
  , './lib/client/slate/Slatebox.slate.nodes.js'
  , './lib/client/slate/Slatebox.slate.zoomSlider.js'
  , './lib/client/node/Slatebox.node.colorpicker.js'
  , './lib/client/node/Slatebox.node.connectors.js'
  , './lib/client/node/Slatebox.node.context.js'
  , './lib/client/node/Slatebox.node.editor.js'
  , './lib/client/node/Slatebox.node.images.js'
  , './lib/client/node/Slatebox.node.links.js'
  , './lib/client/node/Slatebox.node.menu.js'
  , './lib/client/node/Slatebox.node.relationships.js'
  , './lib/client/node/Slatebox.node.resize.js'
  , './lib/client/node/Slatebox.node.shapes.js'
  , './lib/client/node/Slatebox.node.template.js'
  , './lib/client/node/Slatebox.node.toolbar.js'

  , './lib/client/helpers/getDepCoords.js'
  , './lib/client/helpers/getTransformedPath.js'

  , './lib/client/raphael/eve.js'
  , './lib/client/raphael/raphael.no-deps.js'
  , './lib/client/raphael/raphael.fn.objects.js'
  , './lib/client/raphael/raphael.fn.connection.js'
  , './lib/client/raphael/raphael.el.tooltip.js'
  , './lib/client/raphael/raphael.el.style.js'
  , './lib/client/raphael/raphael.el.loop.js'
  , './lib/client/raphael/raphael.button.js'

  , './lib/client/emile/emile.js'

  , './lib/client/notify.js'
  , './lib/client/spinner.js'
]

module.exports = {
  entry: _entries, //assets/slatebox-1.0.0.js',
  output: {
    filename: './slatebox-1.0.0.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { uglify: true }]]
          }
        }
      }
    ]
  }
};