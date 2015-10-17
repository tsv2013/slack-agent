'use strict';

var util = require('util');
var Bot = require('slackbots');

var SlackAgent = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'agent';
    //this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

    //this.user = null;
    //this.db = null;
};

util.inherits(SlackAgent, Bot);

SlackAgent.prototype.run = function () {
    SlackAgent.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

SlackAgent.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

SlackAgent.prototype._connectDb = function () {
    // if (!fs.existsSync(this.dbPath)) {
    //     console.error('Database path ' + '"' + this.dbPath + '" does not exists or it\'s not readable.');
    //     process.exit(1);
    // }
    //
    // this.db = new SQLite.Database(this.dbPath);
};

SlackAgent.prototype._firstRunCheck = function () {
    var self = this;
    // self.db.get('SELECT val FROM info WHERE name = "lastrun" LIMIT 1', function (err, record) {
    //     if (err) {
    //         return console.error('DATABASE ERROR:', err);
    //     }
    //
    //     var currentTime = (new Date()).toJSON();
    //
    //     // this is a first run
    //     if (!record) {
    //         self._welcomeMessage();
    //         return self.db.run('INSERT INTO info(name, val) VALUES("lastrun", ?)', currentTime);
    //     }
    //
    //     // updates with new last running time
    //     self.db.run('UPDATE info SET val = ? WHERE name = "lastrun"', currentTime);
    // });
};

SlackAgent.prototype._onStart = function () {
    this._loadBotUser();
    this._connectDb();
    this._firstRunCheck();
};

SlackAgent.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?' +
        '\n I can tell jokes, but very honest ones. Just say `Chuck Norris` or `' + this.name + '` to invoke me!',
        {as_user: true});
};

SlackAgent.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

SlackAgent.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

SlackAgent.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

SlackAgent.prototype._replyWithRandomJoke = function (originalMessage) {
    var self = this;
    // self.db.get('SELECT id, joke FROM jokes ORDER BY used ASC, RANDOM() LIMIT 1', function (err, record) {
    //     if (err) {
    //         return console.error('DATABASE ERROR:', err);
    //     }
    //
    //     var channel = self._getChannelById(originalMessage.channel);
    //     self.postMessageToChannel(channel.name, record.joke, {as_user: true});
    //     self.db.run('UPDATE jokes SET used = used + 1 WHERE id = ?', record.id);
    // });
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel(channel.name, "uups!", { as_user: true });
};

SlackAgent.prototype._onMessage = function (message) {
    if(this._isChatMessage(message) &&
        this._isChannelConversation(message) /*&&
        !this._isFromNorrisBot(message) &&
        this._isMentioningChuckNorris(message)*/
    ) {
        this._replyWithRandomJoke(message);
    }
};

module.exports = SlackAgent;
