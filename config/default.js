/**
 * App default configuration
 */

module.exports = {

    env: 'default',

    dynamedb: {
        host: 'http://localhost:8000',
        key: null,
        secret: null,
        region: 'fakeRegion', // Use fake region for local DynamoDB instance
    }
}
