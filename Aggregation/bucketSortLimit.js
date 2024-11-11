db.getCollection("practice-data").aggregate([

    // Stage 1: Bucket stage
    // Group documents into age ranges (20-40, 40-60, 60-80) and count how many fall into each range
    // Any age above 80 goes into the "remaining 80+" bucket
    {
        $bucket: {
            groupBy: '$age',  // Field to group by (age)
            boundaries: [20, 40, 60, 80],  // Define age ranges
            default: "remaining 80+",  // Bucket for ages above 80
            output: {
                count: { $sum: 1 },  // Count documents in each bucket
                nameOfThem: { $push: "$$ROOT" }  // Push all documents in the bucket into 'nameOfThem'
            }
        }
    },

    // Stage 2: Sort stage
    // Sort the buckets by count in ascending order
    {
        $sort: { count: 1 }  // Sort by 'count' field (ascending)
    },

    // Stage 3: Limit stage
    // Limit the output to only 2 results (buckets)
    {
      $limit: 2  
    },

    // Stage 4: Project stage
    // Only return the 'count' field in the final output
    {
        $project: { count: 1 }  // Only project the 'count' field
    }

])
