import express from 'express';
const route = express.Router();

route.get('/profile', (req, res) => {
    res.render("profile", { title: "Profile" });
});

export default route;
