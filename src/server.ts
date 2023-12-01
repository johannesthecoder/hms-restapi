import { NextFunction, Request, Response, Router } from "express";
import { App } from "./app";
import { AppResponse } from "./core/interfaces/app_response.interface";

import { model, Schema, Document } from "mongoose";

interface ISampleUser {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  code: string;
  email?: string;
  isActive: boolean;
}

const sampleUserSchema: Schema = new Schema<ISampleUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    phone: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    email: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { collection: "sample_users" }
);

const sampleModel = model<ISampleUser & Document>("SampleUser", sampleUserSchema);

const sampleRoute: Router = Router();

sampleRoute.all("/sample", async (req: Request, res: Response, next: NextFunction) => {
  let databaseResult = {
    success: true,
    result: "" as any,
  };

  try {
    let result: any = await sampleModel.find({});

    if (Array.isArray(result)) {
      if (result.length === 0) {
        result = await sampleModel.create({
          firstName: "yohannes",
          lastName: "tesfay",
          middleName: "niguse",
          phone: "+254011454001",
          code: "code",
          email: "johannesthecoder@gmail.com",
          isActive: true,
        });
      }
    }

    databaseResult.result = result;
  } catch (error) {
    databaseResult.success = false;
    databaseResult.result = error;
  }

  try {
    const response: AppResponse = {
      success: true,
      result: {
        message:
          "🎉 Woohoo! It works! 🚀 Time to get things done! Let's embark on our journey and make magic happen! 💻✨ #ProductivityModeActivated 🎊👏 Let's do this bro! 🙌",
        databaseResult,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

const app: App = new App([{ router: sampleRoute }]);
app.listen();
