// $facet, multiple pipeline aggregation stage

db.getCollection("practice-data").aggregate([
    {
        $facet: {
            //pipeline - 1
            "friendsCount": [
                //stage - 1
                { $unwind: "$friends" },
                //stage -2 
                { $group: { _id: "$friends", count: { $sum: 1 } } }
            ],
            //pipeline - 2
            "educationCount": [
                //stage - 1
                { $unwind: "$education" },
                //stage - 2
                { $group: { _id: "$education", count: { $sum: 1 } } }
            ],
            //pipeline - 3 
            "skillCount": [
                //stage - 1
                { $unwind: "$skills" },
                //stage - 2
                { $group: { _id: "$skills", count: {$sum: 1  } }}
                ]
        }
    }
])