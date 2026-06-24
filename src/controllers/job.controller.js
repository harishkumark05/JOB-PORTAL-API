
const getJobs = (req,res)=>{
      const jobs = [
        {
            id: 1,
            title: "Node.js Developer"
        },
        {
            id: 2,
            title: "Angular Developer"
        }
    ];

    res.status(200).json({
        success: true,
        requestTime: req.reqTime,
        data: jobs
    });
}


module.exports = {getJobs};