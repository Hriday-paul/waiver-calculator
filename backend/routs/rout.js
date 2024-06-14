const express = require("express");
const { createTable, insertCourseProgram, getallInfo, getCourseWithType } = require("../controler/courseProgram");
const router = express.Router();

router.post("/createtable", createTable);
router.post("/addCourse", insertCourseProgram);
router.get("/getInfo", getallInfo);
router.get("/course/:programType", getCourseWithType);




module.exports = router;