import express from 'express';
const route = express.Router();

route.get('/dashboard', (req, res) => {
    res.render("dashboard", { title: "Dashboard" });
});

export default route;
