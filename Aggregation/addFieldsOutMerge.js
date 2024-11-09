// $addFields , $out , $merge aggregation stage


db.getCollection("practice-data").aggregate([
    {
        $group: { _id: "$address.country",count: { $sum: 1 } ,  showName: {$push: '$$ROOT'  }     }
    },
    //Stage -2
    { $project: {
      "showName.name":1,
        age: 1,
        gender: 1
    } }
    
    ])