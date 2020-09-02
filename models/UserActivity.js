const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({});

module.exports = mongoose.model('user_activity', UserActivitySchema);
