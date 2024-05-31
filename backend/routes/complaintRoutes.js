const multer = require('multer');
const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();
const path = require("path");

// Set up Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, "public/media");
//   },                    
//   filename: function (req, file, cb) {
//       const ext = path.extname(file.originalname);
//       const sanitizedOriginalname = file.originalname.replace(/[^a-zA-Z0-9\-_.]/g, ''); // Remove spaces and special characters
  
//       if (ext) {
//         cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname.replace(ext, '') + ext);
//       } 
//       else if (req.body.post_type == 3) {
//         cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname + ".mp4");
//       } 
//       else {
//         cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()) + "-" + sanitizedOriginalname.replace(ext, '') + ext);
//       }
//     },
//     onError: function (err, next) {
//       console.log('error', err);
//       next(err);
//     }
//   });

//   const upload = multer({ storage: storage });

  const auth = require("../middleware/auth");
  const orgauth = require("../middleware/orgAuth");
  const controller = require("../controller/complaintController");

  router.post('/create_new_complaint', auth, upload.single("files"), controller.create_new_complaint);
  router.delete('/delete_all_complaints', controller.delete_all_complaints);
  router.post('/api_all_complaints', auth, controller.api_all_complaints);
  router.post('/api_my_complaints', auth, controller.api_my_complaints);
  router.post('/api_all_complaints_organization', orgauth, controller.api_all_complaints_organization);
  router.post('/api_all_complaints_organization/:id', orgauth, controller.api_all_complaints_organizationById);
  router.post('/api_update_status', orgauth, controller.api_update_status);
  router.post('/all_complaints_coordinates', controller.all_complaints_coordinates);
  router.post('/all_complaints_coordinates_category/:category', controller.all_complaints_coordinates_category);
  router.post('/migrateMediaUrlsToCloudinary', controller.migrateMediaUrlsToCloudinary);
  router.post('/homeComplaintList', controller.homeComplaintList);
  router.post('/upVoteComplaint', auth, controller.upVoteComplaint)
  router.post('/api_complaint_category_count', controller.api_complaint_category_count);
  router.post('/api_complaint_pincode_count', controller.api_complaint_pincode_count);
  router.post('/create_alert', controller.create_alert);
  router.post('/show_all_alert_pincode_wise', controller.show_all_alert_pincode_wise);

  module.exports = router;
  