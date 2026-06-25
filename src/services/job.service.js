const jobRepo = require('../repositories/job.repository');

const createJob = async(data)=>{
    const job = await  jobRepo.createJob(data)
    return job
}

const getJobs = async(data)=>{
    return await jobRepo.getJobs(data)
}
module.exports = {createJob, getJobs}