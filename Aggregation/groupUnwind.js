// Explore $group with $unwind aggregation stage

db.getCollection("practice-data").aggregate([
    // stage
    {
        $unwind: "$interests"
    },
    //stage-2 grouping 
    {
        $group: { _id: "$age", interestsPerAge: {$push: "$interests" } }
    }
    
    ])