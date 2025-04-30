import express from "express";
import equipment from "./equipmentRoutes.js"
import user from "./userRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send
    ("Node.js com Express"));    

    app.use(express.json(), equipment, user)
}

export default routes;
