'use strict';

var SlackAgent = require('../lib/slack-agent');

var token = process.env.BOT_API_KEY;
//var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var agent = new SlackAgent({
    token: token,
    //dbPath: dbPath,
    name: name
});

agent.run();
