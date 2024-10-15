const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        "querystring": path.resolve(__dirname, 'node_modules/querystring-es3')
    })
);