import AdminJS from 'adminjs';
import adminJSExpress from '@adminjs/express';
import  express  from "express";
import sequelize from './db';

require('dotenv').config()

const PORT = process.env.PORT_HOST;

const start = async () => {
    const adminOptions = {
        rootPath: '/admin',
        dashboard:{
            handle: async () => {},
            component: AdminJS.bundle('./src/components/dashboard'), 
        },
        branding:{
            favicon: "/img/logo-make.svg", 
            logo: "/img/logo-make.svg", 
            companyName: 'Make +'
        }
    };

    const app = express();
       
    sequelize.sync()
             .then((result) => console.log(result))
             .catch((err) => console.log(err));

    app.use("/img", express.static("src/assets/img"));
    const admin = new AdminJS(adminOptions);
    const adminRouter = adminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log("Projeto rodando!")
    });
};

start();