const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId
  },
  workout_id: {
    type: Schema.Types.ObjectId
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user_activity', UserActivitySchema);
