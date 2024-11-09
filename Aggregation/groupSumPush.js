// $group , $sum , $push aggregation stage


db.getCollection("practice-data").aggregate([
    // {
    //     $group: { _id: "$address.country",count: { $sum: 1 } ,  showName: {$push: '$$ROOT'  }     }
    // },
    // //Stage -2
    // { $project: {
    //   "showName.name":1,
    //     age: 1,
    //     gender: 1
    // } }
    {
        $group: { _id: null, totalSalary: {$sum: 1 },
        maxSalary:{ $max: "$salary" } ,
        minSalary:{ $min: "$salary" } ,
        avgSalary:{ $avg: "$salary" } 
           
        }
    },
    { $project: {
        totalSalary: 1,
        maxSalary: 1,
        minSalary: 1,
        avarageSalary: "$avgSalary" ,
        rangeBtwMinAndMax: {$subtract: ["$maxSalary", "$minSalary" ]} 
    } }
    
    ])