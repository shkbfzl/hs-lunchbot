/**
 * NLP Engine routing file
 *
 */

module.exports = {

    'Hello': {
        langs: [
            "h+i+\\s*",
            "hello\\s*",
            "holla\\s*",
            "Bonjour\\s*"
        ],
    },
    'Help': {
        langs: [
            "help",
            "\\?",
        ]
    },

    //--------- Add me ------------
    'AddMe': {
        langs: [
            "add\\s+me",
            "add\\s+me\\s+in"
        ]
    },

    //--------- My list ------------
    'MyList': {
        langs: [
            "show\\s+my\\s+list",
            "my\\s+list",
            "what’*s\\s+on\\s+my\\s+list\\s*\\?*",
        ],
    },
    //--------- Add favorite ------------
    'AddRestaurant': {
        parsers: ['RestaurantName'],
        langs: [
            "I\\s+love\\s+\\w+",
            "I\\s+like\\s+\\w+",
            "I\\s+have\\s+always\\s+liked?\\s+\\w+"
        ],
    },
    'RemoveRestaurant': {
        parsers: ['RestaurantName'],
        langs: [
            "remove\\s+place\\s+.+",
        ],
    },

    //--------- Ban ------------
    'AddBan': {
        parsers: ['RestaurantName'],
        langs: [
            "add\\s+ban\\s+.+",
        ],
    },

    'RemoveBan': {
        parsers: ['RestaurantName'],
        langs: [
            "remove\\s+ban\\s+.+",
        ],
    },

    //--------- Invite ------------
    'Invite': {
        parsers: ['UserName'],
        langs: [
            "invite\\s+.+",
        ],
    },

    //--------- Joke ------------
    'FoodJoke': {
        langs: [
            "\\?{2,}",
            "what\\s*\\?*",
        ],
    },

};