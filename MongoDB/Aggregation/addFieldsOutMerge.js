db.getCollection("practice-data").aggregate([

    // Stage 1: Group stage
    // Group by country and count documents per country, push full documents into 'showName'
    {
        $group: { 
            _id: "$address.country",  // Group by country
            count: { $sum: 1 },  // Count total documents per country
            showName: { $push: "$$ROOT" }  // Push the entire document into 'showName' array
        }
    },

    // Stage 2: Project stage
    // Include only the 'name' field inside 'showName' and include 'age' and 'gender' in the output
    {
        $project: {
            "showName.name": 1,  // Include only 'name' field from 'showName'
            age: 1,  // Include 'age'
            gender: 1  // Include 'gender'
        }
    }

])
