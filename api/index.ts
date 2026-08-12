import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());

app.get("/api/cases", (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "python", "data", "cases.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    res.json({
      success: true,
      count: data.length,
      cases: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to load cases"
    });
  }
});

export default app;
