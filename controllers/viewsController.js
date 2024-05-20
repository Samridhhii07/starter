const Tour  =require('../models/tourModels');
const catchAsync = require('../utils/catchAsync');


exports.getOverview = catchAsync(async (req,res,next) => {
  //Get tour data from collection
  //Build template
  // Render template using tour data
  const tours = await Tour.find();
    res.status(200).render('overview',{
        title:'All tours',
        tours
    });
    
})

exports.getTour= catchAsync(async(req,res) => {
  //get the data for the requested tour
  const tour = await Tour.findOne({slug : req.params.slug}).populate({
    path: 'reviews',
    fields:'review rating user'
  });
    res.status(200).render('tour',{
      title:'the forest hiker tour',
      tour
    });
  });