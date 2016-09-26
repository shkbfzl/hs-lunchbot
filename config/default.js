/**
 * App default configuration
 */

module.exports = {

    env: 'default',

    dynamedb: {
        host: 'http://localhost:50011',
        key: "fakeAccessKey",
        secret: "fakeSecretAccessKey",
        region: 'fakeRegion', // Use fake region for local DynamoDB instance
    }
}
