const { Hotels } = require("../models");
const { uploadImage2 } = require("../middlewares/upload/upload-mutileImage.js")
const express = require("express");
const {
  createHotel,
  getAllHotel,
  getDetailHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotel.controllers.js");

const HotelRouter = express.Router();


// HotelRouter.post("/createHotel", createHotel);
HotelRouter.get("/getAllHotel", getAllHotel);
HotelRouter.get("/getDetailHotel/:id", getDetailHotel);
HotelRouter.put("/updateHotel/:id", updateHotel);
HotelRouter.delete("/deleteHotel/:id", deleteHotel);

HotelRouter.post("/createHotel", uploadImage2("hotel", 10), createHotel);
HotelRouter.get("/", getAllHotel);
HotelRouter.get("/:id", getDetailHotel);

// HotelRouter.put("/:id", checkExist(Hotel), updateHotel);
// HotelRouter.delete("/:id", checkExist(Hotel), deleteHotel);

module.exports = {
  HotelRouter,
};
