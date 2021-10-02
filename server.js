const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect DB
connectDB();

// Init Middleware
// using this allows us to accept body data
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
