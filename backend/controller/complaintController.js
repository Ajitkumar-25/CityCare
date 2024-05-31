const Citizen = require("../models/citizen");
const Complaint = require("../models/complaint");
const Alert = require("../models/alert");
const cloudinary = require('cloudinary').v2;


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
});

const create_new_complaint = async (req, res) => {
  try {
    let userId = req.userId;
    const { title, type, description, latitude, longitude, address, pincode } = req.body;
    let mediaUrl = "";

        // if(req.file)
    // {
    //   mediaUrl = "public/media/"+req.file.filename;
    // }
    // console.log("req.file", req.file);

    // Upload file to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(result);
          mediaUrl = result.secure_url;
          resolve();
        }
      }).end(req.file.buffer);
    });

    // Wait for the upload to finish
    await uploadPromise;

    const newComplaint  = new Complaint({
      citizenId: userId,
      title: title, 
      status: 'Not Viewed',
      type: type,
      description: description,
      locationInfo: {
        latitude: latitude,
        longitude: longitude,
        address: address,
        pincode: pincode
      },
      media: mediaUrl,
      isActive: true
    });

    let data = await newComplaint.save();

    res.send({
      status: true,
      message: "Complaint Created Successfully",
      data
    });
  } catch(error) {
    console.log("error", error);
    res.send(error);
  }
}

const delete_all_complaints = async (req, res) => {
  try {
    await Complaint.deleteMany({});
    res.send({
      status: "success",  
      message: "deleted all complaints"
    })
  }
  catch(error) {
    console.log("error", error);
    res.send(error);
  }
}

const api_all_complaints = async (req, res) => {
  try {
    let userId = req.userId;
    let { searchQuery, page } = req.body;
    let query = {};

    console.log("req.body", req.body)
    let limit = 10;
    let filter = null;
    query.citizenId = { $ne: userId };
    // Applying search query if provided
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: 'i' };
    }

    // Applying filter if provided
    if (filter) {
      if (filter.status) {
        query.status = filter.status;
      }
      if (filter.category) {
        query.category = filter.category;
      }
    }

    // Fetching complaints with pagination, sorting by createdAt
    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit).populate('citizenId');

    let allNewComplaints = [];
    const currentDate = new Date();
      for(let i=0;i<complaints.length;i++)
      {
        let updateElem = complaints[i].toObject();
        if(updateElem.type == "Road Maintaince")
        {
          updateElem.categoryMedia = `public/media/road.jpeg`;
        }
        if(updateElem.type == "stray_animals")
        {
          updateElem.categoryMedia = `public/media/stray.jpeg`;
        }
        if(updateElem.type == "water")
        {
          updateElem.categoryMedia = `public/media/water.jpeg`;
        }
        if(updateElem.type == "sanitation")
        {
          updateElem.categoryMedia = `public/media/garbage.jpeg`;
        }
        if(updateElem.type == "garbage")
        {
          updateElem.categoryMedia = `public/media/garbage.jpeg`;
        }
        if(updateElem.type == "electricity")
        {
          updateElem.categoryMedia = `public/media/electricity.jpeg`;
        }

        const createdAt = new Date(complaints[i].createdAt);
        const diffTime = Math.abs(currentDate - createdAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const formattedCreatedAt = createdAt.toLocaleString('en-GB', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        }).replace(/,/g, '');

        updateElem.diffDays = diffDays; 
        updateElem.createdAt = formattedCreatedAt;
        allNewComplaints.push(updateElem);
      }

      let lastPage;
      if(allNewComplaints.length < 10)
      {
        lastPage = -1;
      }
      else
      {
        lastPage = page+1;
      }

      // console.log("complaints", complaints)

    res.status(200).json({
      status: "Success",
      lastPage: lastPage,
      complaints: allNewComplaints,
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const api_my_complaints = async (req, res) => {
  try {
    let userId = req.userId;
    let { searchQuery, page } = req.body;
    let query = {};

    let limit = 10;

    query.citizenId = userId;
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: 'i' };
    }

    // if (filter) {
    //   if (filter.status) {
    //     query.status = filter.status;
    //   }
    //   if (filter.category) {
    //     query.category = filter.category;
    //   }
    // }

    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit).populate('citizenId');


      let allNewComplaints = [];
      const currentDate = new Date();
      for(let i=0;i<complaints.length;i++)
      {
        let updateElem = complaints[i].toObject();
        if(updateElem.type == "Road Maintaince")
        {
          updateElem.categoryMedia = `public/media/road.jpeg`;
        }
        if(updateElem.type == "stray_animals")
        {
          updateElem.categoryMedia = `public/media/stray.jpeg`;
        }
        if(updateElem.type == "water")
        {
          updateElem.categoryMedia = `public/media/water.jpeg`;
        }
        if(updateElem.type == "sanitation")
        {
          updateElem.categoryMedia = `public/media/garbage.jpeg`;
        }
        if(updateElem.type == "garbage")
        {
          updateElem.categoryMedia = `public/media/garbage.jpeg`;
        }
        if(updateElem.type == "electricity")
        {
          updateElem.categoryMedia = `public/media/electricity.jpeg`;
        }

        const createdAt = new Date(complaints[i].createdAt);
        const diffTime = Math.abs(currentDate - createdAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const formattedCreatedAt = createdAt.toLocaleString('en-GB', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        }).replace(/,/g, '');

        updateElem.diffDays = diffDays; 
        updateElem.createdAt = formattedCreatedAt;
        updateElem.myComplaint = true;
        allNewComplaints.push(updateElem);
      }

      let lastPage;
      if(allNewComplaints.length < 10)
      {
        lastPage = -1;
      }
      else
      {
        lastPage = page+1;
      }

      res.status(200).json({
        status: "Success",
        lastPage: lastPage,
        complaints: allNewComplaints,
      });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const api_all_complaints_organization = async (req, res) => {
  try{
    let userId = req.userId;
    let { searchQuery, category } = req.body;
    let query = {};

    query.type = category;

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: 'i' };
    }

    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })


      let allNewComplaints = [];
      const currentDate = new Date();
      for(let i=0;i<complaints.length;i++)
      {
        let updateElem = complaints[i].toObject();
        const createdAt = new Date(complaints[i].createdAt);
        const diffTime = Math.abs(currentDate - createdAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const formattedCreatedAt = createdAt.toLocaleString('en-GB', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        }).replace(/,/g, '');

        updateElem.diffDays = diffDays; 
        updateElem.createdAt = formattedCreatedAt;
        updateElem.myComplaint = true;
        allNewComplaints.push(updateElem);
      }

      res.status(200).json({
        status: "Success",
        complaints: allNewComplaints,
      });    

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const api_all_complaints_organizationById = async (req, res) => {
  try{
    let complaintId = req.params.id;
    const complaint = await Complaint.findOne({_id: complaintId}).populate('citizenId')
    
    if(!complaint)
    {
      res.status(404).json({
        "status": false,
        "message": "no complaint found"
      })
    }

    let updateElem = complaint.toObject();
    const currentDate = new Date();
    const createdAt = new Date(complaint.createdAt);
        const diffTime = Math.abs(currentDate - createdAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const formattedCreatedAt = createdAt.toLocaleString('en-GB', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        }).replace(/,/g, '');

        updateElem.diffDays = diffDays; 
        updateElem.createdAt = formattedCreatedAt;


      res.status(200).json({
        status: "Success",
        complaint: updateElem,
      });    
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const api_update_status = async (req, res) => {
  try {
    let { status, message, complaintId } = req.body;

    let data = await Complaint.findOneAndUpdate({ _id: complaintId }, { $set: { status: status, message: message }});

    res.status(200).json({
      "status": true,
      "message": "status and message updated successfully"
    })

  }
  catch(error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const all_complaints_coordinates = async (req, res) => {
  try{
    let allComplaints = await Complaint.find({}).select({ locationInfo: 1, type: 1 });
    res.status(200).json({
      status: true,
      allComplaints: allComplaints,
    })
  }
  catch(error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const all_complaints_coordinates_category = async (req, res) => {
  try{
    let category = req.params.category;
    let allComplaints = await Complaint.find({ type: category }).select({ locationInfo: 1, type: 1 });
    res.status(200).json({
      status: true,
      allComplaints: allComplaints,
    })
  }
  catch(error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const migrateMediaUrlsToCloudinary = async (req, res) => {
  try {
    const complaints = await Complaint.find({}); 
    for (let i=0;i<complaints.length;i++) {
      if (complaints[i].media) { 
        const oldMediaUrl = complaints[i].media;
        const result = await cloudinary.uploader.upload(oldMediaUrl, { resource_type: 'auto' });
        let updateVal = await Complaint.findOneAndUpdate({  _id: complaints[i]._id }, { $set: { media: result.secure_url } });
        console.log(`Media migrated for complaint ${complaints[i]._id}`);
      }
    }

    res.send({
      status: true,
      message: "Migration completed successfully"
    })

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

const homeComplaintList = async (req, res) => {
  try {
    let homeComplaints = await Complaint.find({}).sort({ createdAt: -1 }).limit(4);
    res.status(200).send({
      status: true,
      message: "all complaints for home page are fetched",
      homeComplaints: homeComplaints
    })
  }
  catch(error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const upVoteComplaint = async (req, res) => {
  try {
    let userId = req.userId;
    let { complaintId } = req.body;

    let complaint = await Complaint.findOne({ _id: complaintId });
    let citizens = complaint.upVotesCitizen ? complaint.upVotesCitizen.map((citizenId) => citizenId.toString()) : [];
    let oldUpvoteVal = complaint.upVotes;
    let update;

    if (!citizens.includes(userId.toString())) {
      update = await Complaint.findOneAndUpdate(
        { _id: complaintId },
        { $push: { upVotesCitizen: userId }, $set: { upVotes: oldUpvoteVal + 1 } },
        { new: true }
      );
      return res.status(200).send({
        status: true,
        message: "upvoted successfully",
        upVoteData: update.upVotes
      });
    } else {
      update = await Complaint.findOneAndUpdate(
        { _id: complaintId },
        { $pull: { upVotesCitizen: userId }, $set: { upVotes: oldUpvoteVal>0 ? oldUpvoteVal - 1 : 0 } },
        { new: true }
      );
      return res.status(200).send({
        status: true,
        message: "downvoted successfully",
        upVoteData: update.upVotes
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const api_complaint_category_count = async (req, res) => {
  try {

    let { category } = req.body;
    let aggregationResult = await Complaint.aggregate([
      {
        $match: { "type": category } // Filter complaints by type: category
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

  const labels = aggregationResult.map(item => item._id);
  const counts = aggregationResult.map(item => item.count);

  res.status(200).send({
    status: true,
    message: "count of complaint categorywise",
    labels,
    counts
  })

  }
  catch(error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const api_complaint_pincode_count = async (req, res) => {
  try {
    let { category } = req.body;
    let aggregationResult = await Complaint.aggregate([
      {
        $match: { "type": category } // Filter complaints by type: category
      },
      {
        $group: {
          _id: "$locationInfo.pincode",
          count: { $sum: 1 }
        }
      }
    ]);

    const labels = aggregationResult.map(item => item._id);
    const counts = aggregationResult.map(item => item.count);

    res.status(200).send({
      status: true,
      message: "Count of complaints pincode-wise",
      labels,
      counts
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const create_alert = async (req, res) => {
  try {
    let { pincode, message } = req.body;
    const newAlert = new Alert({ pincode, message });
    await newAlert.save();
    res.status(200).json({ success: true, message: 'Alert saved successfully' });
  }
  catch(error) {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });    
  }
}

const show_all_alert_pincode_wise = async (req, res) => {
  try {
    let { pincode } = req.body;
    let allAlerts = await Alert.find({pincode: pincode});
    const currentDate = new Date();
    let newAlerts = [];
    for(let i=0;i<allAlerts.length;i++)
    {
      let updateElem = allAlerts[i].toObject();
      const createdAt = new Date(allAlerts[i].createdAt);
      const diffTime = Math.abs(currentDate - createdAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      updateElem.diffDays = diffDays; 
      newAlerts.push(updateElem);
    }
    res.send({
      status: true,
      message: "all alerts are fetched",
      allAlerts: newAlerts
    })
  }
  catch(error)
  {
    console.log("error", error);
    res.status(500).send({ error: 'Internal Server Error' });  
  }
}


module.exports = {
  create_new_complaint,
  delete_all_complaints,
  api_all_complaints,
  api_my_complaints,
  api_all_complaints_organization,
  api_all_complaints_organizationById,
  api_update_status,
  all_complaints_coordinates,
  all_complaints_coordinates_category,
  migrateMediaUrlsToCloudinary,
  homeComplaintList,
  upVoteComplaint,
  api_complaint_category_count,
  api_complaint_pincode_count,
  show_all_alert_pincode_wise,
  create_alert
}