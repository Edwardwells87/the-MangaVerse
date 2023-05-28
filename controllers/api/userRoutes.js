const router = require('express').Router();
const { User, Blog } = require('../../models');
const withAuth = require("../../utils/auth")

router.post('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }}
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
console.log('logged in')
      res.json({ user: userData, message: 'Welcome back' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req,res)=>{
  if(req.session.logged_in){
      req.session.destroy(()=>{
        console.log('logged out')
          res.status(204).end();
      });
  } else{
      res.status(404).end();
  }
});

module.exports = router;
