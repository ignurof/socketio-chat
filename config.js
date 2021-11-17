module.exports = {
    port: 3002,

    svelteViewEngine: {
        env: "dev",
        template: `${__dirname}/src/template.svelte`,
        dir: `${__dirname}/src/routes`,
        type: "svelte",
        buildDir: `${__dirname}/build/routes`,
        assetsPrefix:  "/assets/",
    },

    // CORS SETUP
    corsOptions: {
        "origin": 'chat.ignurof.xyz',
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "credentials": true
    },
};