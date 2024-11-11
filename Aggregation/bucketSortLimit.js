// $bucket, $sort, and $limit aggregation stage

db.getCollection("practice-data").aggregate([
    //stage-1
    {
        $bucket: {
            groupBy: '$age',
            boundaries: [20, 40, 60, 80],
            default: "remaning 80+",
            output: {
                count: { $sum: 1 },
                nameOfThem: { $push: "$$ROOT" }
            }
        }
    },
    //STAGE -2
    {
        $sort: { count: 1 }
    },
    //stage - 3
    {
      $limit: 2  
    },
    //stage - 4
    {
        $project: { count: 1 }
    }
])