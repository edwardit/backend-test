import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { ApiController } from "./controller/api.controller";
import * as cors from 'cors';
import 'dotenv/config'
const allowedOrigins = ['https://codetest-pre-interview-frontend.pages.dev'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

class App {

    public express: express.Application;
    public logger: APILogger;
    public apiController: ApiController;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.apiController = new ApiController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(cors(options));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get('/home', (req, res) => {
            if (req.query['skip'] && req.query['take']) {
                this.apiController.getItemQuery(req.query).then(data => res.json(data));
            } else {
                res.status(422).send({
                    message: '422 Unprocessable Entity'
                });
            }
        });

        this.express.post('/home', (req, res) => {
            if (req.body.name && req.body.desc && req.body.price && req.body.post_code) {
                this.apiController.createItem(req.body).then(data => res.json(data));
            } else {
                res.status(422).send({
                    message: '422 Unprocessable Entity'
                });
            }
        });

        this.express.patch('/home/:id', (req, res) => {
            if (req.body.name && req.body.desc && req.body.price && req.body.post_code) {
                this.apiController.updateItem(req.body).then(data => res.json(data));
            } else {
                res.status(422).send({
                    message: '422 Unprocessable Entity'
                });
            }
        });

        this.express.delete('/home/:id', (req, res) => {
            if (req.params.id) {
                this.apiController.deleteItem(req.params.id).then(data => res.json(data));
            } else {
                res.status(422).send({
                    message: '422 Unprocessable Entity'
                });
            }
        });

        this.express.get('/postCode', (req, res) => {
            this.apiController.getPostCode().then(data => res.json(data));
        });

        this.express.get('/postCode/:id', (req, res) => {
            if (req.params.id) {
                this.apiController.getPostCodeAvg(req.params.id).then(data => res.json(data));
            } else {
                res.status(422).send({
                    message: '422 Unprocessable Entity'
                });
            }
        });

        this.express.get("/", (req, res, next) => {
            res.send("App works!!");
        });

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.status(404).send({
                message: '404 Not Found'
            });
        });
    }
}

export default new App().express;