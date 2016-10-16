/**
 * App default configuration
 */

module.exports = {

    env: 'default',
    server: {
      port: 50151
    },

    mongodb: {
        host: 'mongodb://localhost',
        port: 27017,
        database: 'lunchio'
    },

    slack: {
    	api_token: 'fakeAPIToken',
        webHookURL: 'https://hooks.slack.com/services/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',
    },

    inviteFeedbackUrl: 'http://localhost'
}
