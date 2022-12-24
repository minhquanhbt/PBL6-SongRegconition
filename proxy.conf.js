const PROXY_CONFIG = {
    "/api": {
        "target": "https://d07c-42-117-12-41.ap.ngrok.io",
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