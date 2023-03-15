const express = require("express");
const fs = require("fs");
const { v4: uuid } = require("uuid");

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
router.post("/", (req, res) => {
  const { title, description } = req.body;
  const videos = getAllVideosData();

  // const videoToBePosted = {
  // "id": uuid(),
  // "title": title
  // "channel": "Cool Videos",
  // "image": "https://i.imgur.com/l2Xfgpl.jpg",
  // "description": description,
  // "views": "1,178,023",
  // "likes": "300,700",
  // "duration": "3:45",
  // "video": "https://project-2-api.herokuapp.com/",
  //   add image instead of video
  // "timestamp": 1630656720000,
  // "comments": [
  //   {
  //     "id": uuid(),
  //     "name": "John Smith",
  //     "comment": "Amazing",
  //     "likes": 0,
  //     "timestamp": 1630656720000
  //   },
  //   {
  //     "id": uuid(),
  //     "name": "Jane Doe",
  //     "comment": "Great video.",
  //     "likes": 0,
  //     "timestamp": 1630656720000
  //   }]
  // }

  videos.push(videoToBePosted);

  //   get videos on top, createobject, push, write to file, res.status(201).json(videotobeposted)
});

// gives acces to current video (state variable)
// any state variable you access by route call
// router.get("/:id")
module.exports = router;

//"/:id/commments"
