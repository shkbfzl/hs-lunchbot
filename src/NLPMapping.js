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

    'RemoveRestaurant': {
        parser: ['RestaurantName'],
        langs: [
            "remove\\s+place\\s+.+",
        ],
    },

    //--------- Banned ------------
    'AddBan': {
        parser: ['RestaurantName'],
        langs: [
            "add\\s+ban\\s+.+",
        ],
    },

    'RemoveBan': {
        parser: ['RestaurantName'],
        langs: [
            "remove\\s+ban\\s+.+",
        ],
    },
};