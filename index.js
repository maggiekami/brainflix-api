require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const videosRoutes = require("./routes/videos");

const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use("/", videos);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
