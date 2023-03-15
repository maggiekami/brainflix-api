const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const getAllVideosData = () => {
  try {
    const videosData = fs.readFileSync("./data/videos.json");
    return JSON.parse(videosData);
  } catch (err) {
    console.log(err);
  }
};

// add router get and post and get video with id (=find current video with this id)

router.get("/", (req, res) => {
  const myData = getAllVideosData();
  //   res.json(myData);
  const sideVideos = myData.map((videoItem) => {
    return {
      title: videoItem.title,
      channel: videoItem.channel,
      id: videoItem.id,
      image: videoItem.image,
    };
  });
  res.json(sideVideos);
});

// just home route = slash / is videos cause use app use - has videos

//   get videos on top, createobject, push, write to file, res.status(201).json(videotobeposted)

router.post("/", (req, res) => {
  const { title, description } = req.body;
  const videos = getAllVideosData();

  const videoToBePosted = {
    id: uuidv4(),
    title: title,
    channel: "Cool Videos",
    image: "http://localhost:8081/images/image9.jpeg",
    description: description,
    views: "1,178,023",
    likes: "300,700",
    duration: "3:45",
    video: "https://project-2-api.herokuapp.com/",
    // add image instead of video
    timestamp: 1630656720000,
    comments: [
      {
        id: uuidv4(),
        name: "John Smith",
        comment: "Amazing",
        likes: 0,
        timestamp: 1630656720000,
      },
      {
        id: uuidv4(),
        name: "Jane Doe",
        comment: "Great video.",
        likes: 0,
        timestamp: 1630656720000,
      },
    ],
  };

  videos.push(videoToBePosted);
  fs.writeFile("./data/videos.json", JSON.stringify(videos), (err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Could not write to users JSON file",
      });
    }
    res.status(201).json(videoToBePosted);
  });
});

// gives acces to current video (state variable)
// any state variable you access by route call
// router.get("/:id")
module.exports = router;

//"/:id/commments"
