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

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: true, message: "You must provide all the details" });
  }

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
        message: "Could not save the video, please try again",
      });
    }
    res.status(201).json(videoToBePosted);
  });
});

// gives acces to current video (state variable)
// any state variable you access by route call

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const videos = getAllVideosData();
  const currentVideo = videos.find((video) => video.id === id);
  if (currentVideo) {
    return res.json(currentVideo);
  }
  return res
    .status(404)
    .json({ error: true, message: "Could not find the video" });
});

router.post("/:id/comments", (req, res) => {
  const { name, comment } = req.body;
  const id = req.params.id;
  const videos = getAllVideosData();

  const newComment = {
    id: uuidv4(),
    name: name,
    comment: comment,
    timestamp: new Date(),
  };

  const currentVideo = videos.find((video) => video.id === id);

  if (!currentVideo) {
    return res
      .status(404)
      .json({ error: true, message: "Could not find the video" });
  }

  currentVideo.comments.push(newComment);
  fs.writeFile("./data/videos.json", JSON.stringify(videos), (err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Could not add the comment, please try again",
      });
    }
    // return res.status(201).json(currentVideo.comments);
    return res.status(201).json(newComment);
  });
});

//"/:id/commments"

module.exports = router;
