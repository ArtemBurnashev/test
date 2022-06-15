import { createServer } from "https";
import { parse } from "url";
import next from "next";
import { readFileSync } from "fs";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: readFileSync("./https_cert/localhost+1-key.pem"),
    cert: readFileSync("./https_cert/localhost+1.pem")
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log("ready - started server on url: https://localhost:" + port);
    });
});