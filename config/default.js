/**
 * App default configuration
 */

module.exports = {

    env: 'default',
    server: {
      port: 50151
    },

    dynamedb: {
        host: 'http://localhost:50011',
        key: "fakeAccessKey",
        secret: "fakeSecretAccessKey",
        region: 'fakeRegion', // Use fake region for local DynamoDB instance
    },

    mongodb: {
        host: 'http://localhost',
        port: 27017,
        databse: 'lunchio'
    },

    slack: {
    	api_token: 'fakeAPIToken'
    },
}
