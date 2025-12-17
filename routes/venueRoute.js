import express from 'express';
const route = express.Router();

route.get('/venue', (req, res) => {
    res.render("venue", { title: "Venues" });
});

export default route;
