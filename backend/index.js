import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//Generate content route
export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
app.post("/generate", async (req, res) => {
  const {prompt} = req.body;
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      
    });


    const { totalTokens } = await model.countTokens(prompt);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
});

async function run() {}

run();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
