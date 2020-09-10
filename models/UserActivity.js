const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserActivitySchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId
  },
  workout_id: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user_activity', UserActivitySchema);
