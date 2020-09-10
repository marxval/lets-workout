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
    const { workout_name, aprox_time, level, type, sets } = req.body;

    try {
      const newWorkout = new Workout({
        workout_name,
        aprox_time,
        level,
        type,
        sets,
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

// @route    POST api/workout/activity
// @desc     Register a user workout-activity
// @access   Private

router.post(
  '/activity',
  [auth, [check('workout_id', 'workout_id is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { workout_id } = req.body;
    console.log(req.userid);

    try {
      const newUserActivity = new UserActivity({
        user_id: req.user.id,
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

// @route    GET api/workout/activity
// @desc     Get all workouts done by the user
// @access   Private

router.get('/activity', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user_workouts = await UserActivity.find({ user_id: req.user.id });
    console.log(user_workouts);
    res.json(user_workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/workout/activity/:id
// @desc     Get all workouts done by a user_id
// @access   Private

router.get('/activity/:id', [auth], async (req, res) => {
  try {
    const post = await User.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
