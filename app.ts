import AdminJS from 'adminjs';
import adminJSExpress from '@adminjs/express';
import  express  from "express";

require('dotenv').config()

const PORT = process.env.PORT_HOST;

const start = async () => {
    const adminOptions = {
        rootPath: '/admin',
        dashboard:{},
        branding:{
            logo: "/img/logo-make.svg", 
            companyName: 'Make +'
        }
    };

    const app = express();
    app.use("/img", express.static("src/assets/img"));
    const admin = new AdminJS(adminOptions);
    const adminRouter = adminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log("Projeto rodando!")
    });
};

start();