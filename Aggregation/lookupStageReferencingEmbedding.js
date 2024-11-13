// lookup stage, embedding vs referencing

db.order.aggregate([

    // Stage 1: $lookup
    // Performs a join between the 'order' collection and the 'practice-data' collection based on the 'userId' field
    {
        $lookup: {
            from: "practice-data",           // The collection to join with ('practice-data')
            localField: "userId",            // The field from the 'order' collection ('userId') to match
            foreignField: "_id",             // The field from 'practice-data' collection ('_id') to match with
            as: "User"                       // The field to store the joined data ('User')
        }
    }
])
