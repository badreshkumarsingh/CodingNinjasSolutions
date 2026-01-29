import { ObjectId } from 'mongodb';
import {getDB} from '../../config/mongodb.js';

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      await collection.insertOne(expense);
      return expense;
    } catch (err)  {
      throw err;
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try{
      const db = getDB();
      const collection = db.collection(this.collectionName);
      return await collection.findOne({_id: new ObjectId(id)});
    } catch (err) {
      throw err
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try{
      const db = getDB();
      const collection = db.collection(this.collectionName);

      return await collection.find().toArray();
    } catch (err) {
      throw err;
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      await collection.updateOne({_id: new ObjectId(id)}, {$push: {tags: tag}});
      return await collection.findOne({_id: new ObjectId(id)});
    } catch (err) {
      throw err;
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      if(criteria.minAmount) {
        return await collection.find({ amount: { $gte: criteria.minAmount }}).toArray();
      }

      if(criteria.maxAmount) {
        return await collection.find({ amount: { $lte: criteria.maxAmount }}).toArray();
      }

      if(criteria.isRecurring !== undefined) {
        return await collection.find({isRecurring: criteria.isRecurring}).toArray();
      }

      return [];
    } catch (err) {
      throw err;
    }
  }
}

export default ExpenseRepository;
