const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Workout = require('../../models/Workout');
const UserActivity = require('../../models/UserActivity');

// @route    POST api/workout
// @desc     Create a workout
// @access   Private

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const newSets = [
      {
        rest_set: 10,
        exercises: [{ rest_exercise: 10, exercises_id: ['999989', '878708'] }]
      }
    ];

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newWorkout = new Workout({
        workout_name: name,
        aprox_time: 10.0,
        level: 'hard',
        type: 'upper-body',
        sets: newSets,
        user_id: req.user.id
      });
      const workout = await newWorkout.save();
      res.json(workout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post(
  '/wokout',
  [auth, [check('workout_id', 'workout_id is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, workout_id } = req.body;

    try {
      const newUserActivity = new UserActivity({
        user_id: req.user_id,
        workout_id: workout_id
      });
      const userWorkout = await newUserActivity.save();
      res.json(userWorkout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
