// Import necessary webpack plugins and modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Export a configuration function for Webpack
module.exports = () => {
  return {
    mode: 'development', // Set the mode to 'development'

    // Define entry points for the application
    entry: {
      main: './src/js/index.js', // Main application entry point
      install: './src/js/install.js', // Install script entry point
    },

    // Configure output settings
    output: {
      filename: '[name].bundle.js', // Output file name
      path: path.resolve(__dirname, 'dist'), // Output directory path
    },

    // Configure plugins for Webpack
    plugins: [
      // Generate HTML files from template
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Html Webpack Plugin',
      }),

      // Inject the service worker into the application
      new InjectManifest({
        swSrc: './src-sw.js', // Service worker source file
        swDest: 'src-sw.js', // Destination for the service worker
      }),

      // Generate a web app manifest
      new WebpackPwaManifest({
        name: 'Its Text Editor Time!', // App name
        short_name: 'JATE', // Short app name
        description: 'A text editor that you can use on and off the grid!', // App description
        start_url: '/', // Start URL for the app
        publicPath: '/', // Public path for assets
        fingerprints: false, // Disable adding fingerprints to asset filenames
        background_color: '#d0033', // Background color for splash screen
        theme_color: '#a8ff80', // Theme color for the app
        inject: true, // Inject manifest into the HTML
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the app icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination directory for icons
          },
        ],
      }),
    ],

    // Configure module rules
    module: {
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style and CSS loaders
        },
        {
          test: /\.m?js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude the 'node_modules' directory
          use: {
            loader: 'babel-loader', // Use Babel for transpilation
            options: {
              presets: ['@babel/preset-env'], // Use preset for modern JS
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', // Enable object spread syntax
                '@babel/transform-runtime', // Use runtime for polyfills
              ],
            },
          },
        },
      ],
    },
  };
};
