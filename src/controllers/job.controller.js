const jobService = require('../services/job.service');
const mongoose = require('mongoose');
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
    const result = await jobService.getJobs(req.user._id,req.query)
    const {
    jobs,
    ...pagination
} = result;
res.status(200).json({
        success: true,
       ...pagination,
       data:jobs
    });
  }catch(error){
    console.log()
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

const getJobById = async(req,res)=>{
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Job ID"
        });
    }
  try{
    const job = await jobService.getJobById(req.params.id,req.user._id)

        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Job not found"

            });

        }

        res.status(200).json({

            success: true,

            data: job

        });

  }catch(e){
 res.status(500).json({

            success: false,

            message: e.message

        });
  }
}

const updateJob = async (req,res)=>{
  console.log('update Job')
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({

                success: false,

                message: "Invalid Job ID"

            });
          }

      const job = await jobService.updateJob(
        req.params.id,
        req.user._id,
        req.body 
      )
       if (!job) {

            return res.status(404).json({

                success: false,

                message: "Job not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Job updated successfully",

            data: job

        });
    
  }catch(error){
 res.status(500).json({

            success: false,

            message: error.message

        });

  }
}
module.exports = {getJobs,createJob, getJobById,updateJob};