import express from "express";
import equipment from "./equipmentRoutes.js"
import user from "./userRoutes.js";
import auth from "./authRouter.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send
    ("Node.js com Express"));    

    app.use(express.json());

    app.use(auth);
    
    app.use(user);
    app.use(equipment);
}

export default routes;
