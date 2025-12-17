import express from 'express';
const route = express.Router();

route.get('/receipt', (req, res) => {
    res.render("receipt", { title: "Receipt" });
});

export default route;
