// Find all documents in the collection where the age is greater than 30, and
// only return the name and email fields.

db.getCollection("practice-data (1)").find({age:{$gt: 30}}).project({
    name:1, email:1
})