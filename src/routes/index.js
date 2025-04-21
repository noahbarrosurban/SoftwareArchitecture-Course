import express from "express";
import equipment from "./equipmentRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send
    ("Node.js com Express"));    

    app.use(express.json(), equipment)
}

export default routes;
