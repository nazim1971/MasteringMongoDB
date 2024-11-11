db.getCollection("practice-data").aggregate([

    // Stage 1: Group stage
    // Group all documents (no grouping by field, hence _id: null)
    // Calculate total count, max, min, and average salary
    {
        $group: { 
            _id: null, 
            totalSalary: { $sum: 1 },  // Count total documents
            maxSalary: { $max: "$salary" },  // Get maximum salary
            minSalary: { $min: "$salary" },  // Get minimum salary
            avgSalary: { $avg: "$salary" }   // Calculate average salary
        }
    },

    // Stage 2: Project stage
    // Rename avgSalary and compute salary range
    {
        $project: {
            totalSalary: 1,  // Include total count
            maxSalary: 1,    // Include maximum salary
            minSalary: 1,    // Include minimum salary
            avarageSalary: "$avgSalary",  // Rename avgSalary
            rangeBtwMinAndMax: { $subtract: ["$maxSalary", "$minSalary"] }  // Calculate range
        }
    }
])
