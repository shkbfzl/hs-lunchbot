// Copyright 2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"). You may not
// Use this file except in compliance with the License. A copy of the License is
// located at
//     http://aws.amazon.com/apache2.0/
//
// or in the "license" file accompanying this file. This file is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied. See the License for the specific language governing
// permissions and limitations under the License.

require('rootpath')();

const lambda = new AWS.Lambda({region: 'us-west-2'});
var NLPEngine = require('src/NLPEngine.js');
var log = require('log4js').getLogger('Lamda');
var nlpRoute = require('src/NLPRoute.js');


exports.handler = function (event, context, callback) {

    params = {
        FunctionName: 'FAQBot'
    }

    runTimePromise = lambda.getFunction(params).promise();

    runTimePromise.then(function(data) {

        log.debug("----- BOT RUN -----");
        log.debug("Parameters= ", data);

        var engine = new NLPEngine(nlpRoute);

        engine.process(text, function(error, result){

            if (error) {
                callback(error);
                return;
            }

            log.debug("Response= "+result);
            callback(null, {"text": result})
        });

    })
};
