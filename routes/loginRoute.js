import express from 'express';
import * as loginModel from '../model/loginModel.js';

const route = express.Router();
route.use(express.urlencoded({ extended: true }));

route.get('/login', (req, res) => {
    res.render("login", { title: "Login" });
});

route.get('/signup', (req, res) => {
    res.render("signup", { title: "Sign Up" });
});

route.post('/login', async (req, res) => {
    const user = await loginModel.verifyLogin(req.body.email, req.body.password);

    if (user.success) {
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

route.post('/signup', async (req, res) => {
    await loginModel.createUser(
        req.body.username,
        req.body.password,
        req.body.email
    );
    res.redirect('/login');
});

export default route;
