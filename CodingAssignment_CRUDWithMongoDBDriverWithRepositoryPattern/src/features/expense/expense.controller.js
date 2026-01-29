import ExpenseRepository from "./expense.repository.js";
import ExpenseModel from "./expense.model.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const {title, amount, date, isRecurring, tags} = req.body;
      const expense = new ExpenseModel(title, amount, date, isRecurring, tags);
      const expenseResult = await this.expenseRepository.addExpense(expense);
      return res.status(201).send(expense);
    } catch(err) {
      throw err;
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try {
      const id = req.params.id;
      const expense = await this.expenseRepository.getOne(id);
      return res.status(200).send(expense);
    } catch (err) {
      throw err;
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      return res.status(200).send(expenses);
    } catch (err) {
      throw err;
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const id = req.params.id;
      const {tag} = req.body;
      const updatedTagExpense = await this.expenseRepository.addTagToExpense(id, tag);
      return res.status(200).send(updatedTagExpense);
    } catch (err) {
      throw err;
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const minAmount = parseFloat(req.query.minAmount);
      const maxAmount = parseFloat(req.query.maxAmount);
      const isRecurring = req.query.isRecurring;
      const criteria = {minAmount, maxAmount, isRecurring};

      const filteredExpenses = await this.expenseRepository.filterExpenses(criteria);

      return res.status(200).send(filteredExpenses);
    } catch (err) {
      throw err;
    }
  };
}
