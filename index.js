require("dotenv").config();
const { PORT } = process.env || 8081;
const express = require("express");

const cors = require("cors");
const videosRoutes = require("./routes/videos");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/videos", videosRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
