const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');
const Workout = require('../../models/Workout');

// @route    POST api/posts
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
        workout_name: req.body.text,
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

module.exports = router;
