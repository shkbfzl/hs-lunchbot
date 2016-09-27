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
            "help"
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
            "what’s\\s+on\\s+my\\+list",
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

    //--------- Bann ------------
    'AddBan': {
        parsers: ['RestaurantName'],
        langs: [
            "I\\s+hate\\s+\\w+",
            "I\\s+don'?\\s?t\\s+like\\s+\\w+",
            "I\\s+never\\s+go\\s?to\\s+\\w+",
            "add\\s+ban\\s+.+",
        ],
    },

    'RemoveBan': {
        parsers: ['RestaurantName'],
        langs: [
            "remove\\s+ban\\s+.+",
        ],
    },
};