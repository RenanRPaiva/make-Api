import AdminJS from "adminjs";
import adminJSExpress from "@adminjs/express";
import session from "express-session";
import express from "express";
import { sequelize, mongooseDb }from "./db";
import * as AdminJSSequelize from "@adminjs/sequelize";
import * as AdminJSMongoose from '@adminjs/mongoose';
import { Category } from "./src/model/category.entity";
import { Service } from "./src/model/service.entity";
import { User } from "./src/model/user.entity";
import { generateResource } from "./src/services/resourceModel";
import bcrypt from "bcrypt";
import { auth } from "./src/routes/auth";
import { dashboard } from "./src/routes/dashboard";
import hbs from "hbs";
import UserController from "./src/controllers/UserController";
import { ReportService } from "./src/model/report_service.entity";
import { ReportUser } from "./src/model/report_user.entity";
import { ReportCategory } from "./src/model/report_category.entity";


const path = require("node:path");
const mysqlStore = require("express-mysql-session")(session);
require("dotenv").config();

const bodyParser = require("body-parser");
const PORT = process.env.PORT_HOST;

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const ROOT_DIR = __dirname;
const userCtrl = new UserController(ROOT_DIR);

const start = async () => {
  const adminOptions = {
    resources: [
      generateResource(Service),
      generateResource(Category),
      generateResource(ReportService),
      generateResource(ReportUser),
      generateResource(ReportCategory),
      generateResource(
        User,
        {
          password: {
            type: "password",
            isVisible: {
              list: false,
              edit: true,
              create: true,
              show: false,
            },
          },
          active: {
            isVisible: {
              list: true,
              edit: false,
              create: false,
              show: true,
            },
          },
          pin: {
            isVisible: {
              list: false,
              edit: false,
              create: false,
              show: false,
            },
          },
        },
        {
          new: {
            before: async function (request: any) {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(
                  request.payload.password,
                  10
                );
              }
              request.payload.pin = (Math.floor(100000 + Math.random() * 900000)).toString();
              userCtrl.sendToken(request.payload.pin, request.payload.email, request.payload.name)
             
              return request;
            },
          },
          edit: {
            before: async function (request: any) {
              if (request.payload.password) {
                if (
                  request.payload.password.indexOf("$2b$10") === -1 &&
                  request.payload.password.length < 40
                ) {
                  request.payload.password = await bcrypt.hash(
                    request.payload.password,
                    10
                  );
                }
              }
              return request;
            },
          },
        }
      ),
    ],
    rootPath: "/admin",
    dashboard: {
      handle: async () => {},
      component: AdminJS.bundle("./src/components/dashboard"),
    },
    branding: {
      favicon: "/img/logo-make.svg",
      logo: "/img/logo-make.svg",
      companyName: "Make +",
    },
  };

  const app = express();

  sequelize
    .sync()
    .then((result) => console.log(""))
    .catch((err) => console.log(err));
  
  mongooseDb.once("open", () => {
    console.log("Conexão ao mongo aberta com sucesso.")
  })

  app.use("/img", express.static("src/assets/img"));
  const admin = new AdminJS(adminOptions);
  const sessionStore = new mysqlStore({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true,
  });
  const adminRouter = adminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async function (email, password) {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
          const verifica = await bcrypt.compare(
            password,
            user.getDataValue("password")
          );
          if (verifica) {
            if (user.active) {
              return user;            
            }else {
              userCtrl.sendToken(user.pin, user.email, user.name)
              return false;
            } 
          }
        }
        return false;
      },
      cookieName: "make",
      cookiePassword: "XyGNhDR98hMgZL0MOb7L2vZ2fdZKmsHV",
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "XyGNhDR98hMgZL0MOb7L2vZ2fdZKmsHV",
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "make",
    }
  );

  app.use(express.json());
  hbs.registerPartials(path.join(__dirname, "views"));
  app.set("view engine", ".hbs");
  app.use(admin.options.rootPath, adminRouter);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/auth", auth);
  app.use("/dashboard", dashboard);


  app.listen(PORT, () => {
    console.log("Projeto rodando!");
  });
};

start();
