const express = require("express");
const path = require("path");
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "dist", "SportStore")));

// Send all requests to index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "SportStore", "index.html"));
});

// Default Heroku port
app.listen(process.env.PORT || 8080);
