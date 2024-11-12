// $facet, multiple pipeline aggregation stage

db.getCollection("practice-data").aggregate([

    // Stage 1: Facet stage
    // Multiple independent pipelines run in parallel
    {
        $facet: {

            // Pipeline 1: Count the number of friends
            "friendsCount": [
                { $unwind: "$friends" },  // Unwind the 'friends' array
                { $group: { _id: "$friends", count: { $sum: 1 } } }  // Group by each friend and count occurrences
            ],

            // Pipeline 2: Count the number of education records
            "educationCount": [
                { $unwind: "$education" },  // Unwind the 'education' array
                { $group: { _id: "$education", count: { $sum: 1 } } }  // Group by each education entry and count occurrences
            ],

            // Pipeline 3: Count the number of skills
            "skillCount": [
                { $unwind: "$skills" },  // Unwind the 'skills' array
                { $group: { _id: "$skills", count: { $sum: 1 } } }  // Group by each skill and count occurrences
            ]
        }
    }

])
