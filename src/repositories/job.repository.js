const Job = require('../models/job.model');
const createJob = async (jobdata)=>{
    return await Job.create(jobdata)
}
const getJobs = async(userId)=>{
    return await Job.find({
        createdBy:userId
    })
}

module.exports ={createJob,getJobs}