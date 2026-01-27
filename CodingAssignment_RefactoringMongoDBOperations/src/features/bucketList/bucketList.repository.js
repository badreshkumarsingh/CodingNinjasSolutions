// Please don't change the pre-written code
// Import the necessary modules here
import {getDB} from "../../config/mongodb.js";

class BucketListRepository {
  constructor() {
    this.collection = "bucketListItems";
  }
  async addBucketListItem(bucketListItem) {
    // Write your code here
    try{
      // 1. Get Database
      const db = getDB();

      // 2. Get Collection
      const collection = db.collection(this.collection);
      
      // 3. Insert Document
      await collection.insertOne(bucketListItem);

      return bucketListItem;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOneBucketListItem(title) {
    // Write your code here
    try{
      // 1. Get Database
      const db = getDB();

      // 2. Get Collection
      const collection = db.collection(this.collection);

      // 3. Find Document
      const item = await collection.findOne({title: title});

      return item;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default BucketListRepository;
