db.getCollection("practice-data").aggregate([
    // Stage 1: Unwind the "interests" array
    // This stage deconstructs the "interests" array field from the input documents.
    // It outputs a new document for each element in the array, with the value of the array 
    // field replaced by the individual array element.
    {
        $unwind: "$interests"
    },
    
    // Stage 2: Group by "age" field and collect all "interests" per age group
    // In this stage, documents are grouped by the "age" field. The "$push" operator is used to
    // accumulate all the "interests" of individuals with the same age into an array called "interestsPerAge".
    {
        $group: { 
            _id: "$age",  // Group by the "age" field
            interestsPerAge: { $push: "$interests" }  // Push each interest into the "interestsPerAge" array
        }
    }
])
