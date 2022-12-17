import AdminJS from "adminjs";
import adminJSExpress from "@adminjs/express";
import express from "express";
import sequelize from "./db";
import * as AdminJSSequelize from "@adminjs/sequelize";
import { Category } from "./src/model/category.entity";
import { Service } from "./src/model/service.entity";
import { User } from "./src/model/user.entity";
import { generateResource } from "./src/services/resourceModel";
import bcrypt from "bcrypt";

require("dotenv").config();

const PORT = process.env.PORT_HOST;

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const start = async () => {
  const adminOptions = {
    resources: [
      generateResource(Service),
      generateResource(Category),
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

  app.use("/img", express.static("src/assets/img"));
  const admin = new AdminJS(adminOptions);
  const adminRouter = adminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log("Projeto rodando!");
  });
};

start();
