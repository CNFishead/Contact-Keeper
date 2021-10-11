const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect DB
connectDB();

// Init Middleware
// using this allows us to accept body data
app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
