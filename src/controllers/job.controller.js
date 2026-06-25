const jobService = require('../services/job.service');
const getJobs = async (req,res)=>{
    //   const jobs = [
    //     {
    //         id: 1,
    //         title: "Node.js Developer"
    //     },
    //     {
    //         id: 2,
    //         title: "Angular Developer"
    //     }
    // ];

  try{
    const jobs = await jobService.getJobs(req.user._id)
res.status(200).json({
        success: true,
        count: jobs.length,
        data: jobs
    });
  }catch(error){
res.status(500).json({

            success: false,

            message: error.message

        });
  }
    
}

const createJob =async (req,res)=>{
    try{
      const job = await jobService.createJob({
        ...req.body,
        createdBy:req.user?._id
      })

      res.status(201).json({
        success:true,
        message:'Job created successfully',
        data:job
      })
    }catch(e){
 res.status(500).json({
            success: false,
            message: e.message
        });

    }
}

module.exports = {getJobs,createJob};