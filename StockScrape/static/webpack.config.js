// webpack.config.js
const path = require('path');
module.exports = [
    {
        name: 'server',
        entry: './PSE_Edge.js',
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'PSE_Edge.js',
        },
    },
    {
        name: 'client',
        entry: './PSE_Edge.js',
        // target: 'web', // by default
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'PSE_Edge.js',
        },
    }
];