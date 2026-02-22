require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Groq = require("groq-sdk");

const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Review = require("./models/Review");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log(" MongoDB Error:", err.message));

// Groq
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


app.get("/", (req, res) => {
  res.send(" CodeForge Backend Running");
});

app.get("/history", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "secret123");

    const history = await Review.find({ userId: decoded.id })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});



app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});



app.post("/review", async (req, res) => {
  try {
    const { code } = req.body;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Review this code:\n${code}`,
        },
      ],
    });

    const review = completion.choices?.[0]?.message?.content;

   
    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = jwt.verify(token, "secret123");

        await Review.create({
          userId: decoded.id,
          code,
          review,
        });
      } catch {}
    }

    res.json({ review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});


// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});