const PROXY_CONFIG = {
    "/api": {
        "target": "http://118.68.172.92:8000",
        "changeOrigin": true,
        "secure": true,
        "logLevel": "debug",
        "onProxyRes": function(pr, req, res) {
            if (pr.headers['set-cookie']) {
                const cookies = pr.headers['set-cookie'].map(cookie => 
                    cookie.replace(/;(\ )*secure/gi, '')
                );
                pr.headers['set-cookie'] = cookies;
              }
        }
   }
};
module.exports = PROXY_CONFIG;