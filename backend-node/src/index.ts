import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import routeIam from "./routes/iam"

const PORT = process.env.PORT || 3001;
const app = express();

// Enable CORS for all routes, or configure it for specific origins
app.use(cors());

// Add this line to parse JSON request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add error handler 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('¡Something broke!');
});

// Add logs 
app.use((req, res, next) => console.log('Request: %d', Date.now(), req.path) as unknown as undefined || next());

// Add the main endpoint 
app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Demo Node.js Backend");
});

// Add the routes 
app.use("/api/node/iam", routeIam);

// Start the server 
app
    .listen(PORT, () => {
        console.log("Server running at PORT: ", PORT);
    })
    .on("error", (error) => {
        console.log("Server Error: ", error.message);
    });