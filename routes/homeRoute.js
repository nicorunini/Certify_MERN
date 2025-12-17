import express from 'express';
const route = express.Router();

route.get('/', (req, res) => {
    res.render("home", { title: "Home" });
});

route.get('/home', (req, res) => {
    res.redirect('/');
});

export default route;
