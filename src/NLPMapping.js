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
            "I\\s+love\\s+.+",
            "I\\s+like\\s+.+",
            "I\\s+have\\s+always\\s+liked?\\s+.+"
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
            "add\\s+to\\s+my\\s+ban\\s+list.+",
            "I\\s+hate\\s+.+",
            "I\\s+don'?\\s*t\\s+like\\s+.+",
            "I\\s+never\\s+go\\s?to\\s+.+",
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

    //--------- Invite ------------
    'Choice': {
        parsers: ['RestaurantName'],
        langs: [
            "I\\s+want\\s+\\w+",
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