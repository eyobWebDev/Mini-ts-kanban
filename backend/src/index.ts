
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Express + TypeScript is running!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
