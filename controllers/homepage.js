const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require("../utils/auth")
router.get('/', async (req, res) => {
  try {
    const mainPageData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
   const blogs = mainPageData.map((blog) => blog.get({ plain: true }));
    console.log(blogs + "==============================")
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    })
  
   
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Blog,
        include: [{ model: User, attributes: ['name'] }]
      }]
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) { 
    res.redirect('/profile')
    return
  }
  res.render('login')
})


module.exports = router;
