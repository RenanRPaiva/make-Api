import AdminJS from 'adminjs';
import adminJSExpress from '@adminjs/express';
import  express  from "express";
require('dotenv').config()

const PORT = process.env.PORT_HOST;

const start = async () => {
    const adminOptions = {
        rootPath: '/admin'
    };

    const app = express();
    const admin = new AdminJS(adminOptions);
    const adminRouter = adminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log("Projeto rodando!")
    });
};

start();