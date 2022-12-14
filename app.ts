import AdminJS from "adminjs";
import adminJSExpress from "@adminjs/express";
import express from "express";
import sequelize from "./db";
import * as AdminJSSequelize from "@adminjs/sequelize";
import { Category } from "./src/model/category.entity";
import { Service } from "./src/model/service.entity";

require("dotenv").config();

const PORT = process.env.PORT_HOST;

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const generateResource = (model: object) => {
    return {
        resource: model,
        options: {
          properties: {
            createdAt: {
              isVisible: {
                list: true,
                edit: false,
                create: false,
                show: true,
              },
            },
            updatedAt: {
              isVisible: {
                list: true,
                edit: false,
                create: false,
                show: true,
              },
            },
          },
        },
    };
};

const start = async () => {
  const adminOptions = {
    resources: [
      generateResource(Service),
      generateResource(Category),
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
    .then((result) => console.log(result))
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
