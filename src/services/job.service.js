const jobRepo = require('../repositories/job.repository');

const createJob = async(data)=>{
    const job = await  jobRepo.createJob(data)
    return job
}

const getJobs = async(userId,query)=>{
    return await jobRepo.getJobs(userId, query)
}

const getJobById = async(jobid,userId)=>{
   return await jobRepo.getJobById(jobid,userId)
}

const updateJob = async(jobid,userId,updateData)=>{
    return await jobRepo.updateJob(jobid,userId,updateData)
}
module.exports = {createJob, getJobs,getJobById,updateJob}