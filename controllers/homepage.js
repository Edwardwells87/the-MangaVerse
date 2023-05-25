const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const mainPageData = await BlogData.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const blogs = mainPageData.map((blog) => blog.get({ plain: true }));
  } catch (err) {
    res.status(500).json(err);
  }
})