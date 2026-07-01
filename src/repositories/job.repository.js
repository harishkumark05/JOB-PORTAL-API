const Job = require('../models/job.model');
const createJob = async (jobdata)=>{
    return await Job.create(jobdata)
}
const getJobs = async(userId,query)=>{
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = Number(page-1)*limit;
    const filter ={
        createdBy:userId
    }
    if(query.search){
        filter.title={
            $regex:query.search,
            $options:'i'
        }
    }
    if(query.company){
        filter.company = query.company
    }
    if (query.location) {

    filter.location = query.location;

}
    const totalJobs = await Job.countDocuments(filter);
    const jobs= await Job.find(filter)
    .populate('createdBy',
        'name email'
    )
    .sort(query.sort || '-createdAt')
    .skip(skip)
    .limit(limit)
    return{
        jobs,
        totalJobs,
        currentPage:page,
        limit,
        totalPages:Math.ceil(totalJobs/limit),
        hasNextPage: page < Math.ceil(totalJobs/limit),
        hasPreviousPage: page >1

    }
}
const getJobById = async(jobId,userId)=>{
    return await Job.find({_id:jobId,createdBy:userId})
}
const updateJob = async (jobId,userId,updateData)=>{
    return await Job.findOneAndUpdate(
        {_id:jobId,createdBy:userId},
        updateData,
        {new:true,runValidators:true}

    )
}
module.exports ={createJob,getJobs, getJobById, updateJob}