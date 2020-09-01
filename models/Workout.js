const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new mongoose.Schema({
  workout_name: {
    type: 'string'
  },
  aprox_time: {
    type: 'number'
  },
  level: {
    type: 'string'
  },
  type: {
    type: 'string'
  },
  sets: {
    type: 'array',
    additionalItems: true,
    uniqueItems: false,
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        rest_set: {
          type: 'number'
        },
        exercises: {
          type: 'array',
          additionalItems: true,
          uniqueItems: false,
          items: {
            type: 'object',
            properties: {
              rest_exercise: {
                type: 'number'
              },
              exercises_id: {
                type: 'array',
                additionalItems: true,
                uniqueItems: true,
                items: {
                  type: string,
                  displayName: 'exercise_id'
                }
              }
            },
            additionalProperties: false
          }
        }
      }
    }
  },
  user_id: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('workout', WorkoutSchema);
