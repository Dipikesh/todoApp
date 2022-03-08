const validation = require('../validations/todo.validation');
const todoSchema = require('../model/todo.model'); 
const logger = require('../config/logger');
const createError = require('http-errors');
exports.createTodos = async(req, res,next) => {
    
    try {
        const validate = await validation.createTodo().validateAsync(req.body, { abortEarly: false });
        const {name,description} = req.body;
        const todoObj = new todoSchema({ name, description });
        await todoObj.save();
        res.status(201).json({ message: "Todo Created Suceessfully" });
    }
    catch (err) {
       
        logger.error("Error During creating Todo " + err);
        next(err);
    }

}

exports.updateTodos = async(req, res,next) => {
    try {
        const validate = await validation.updateTodos().validateAsync(req.body, { abortEarly: false })
        const {id,name, description} = req.body;
        const result = await todoSchema.updateOne({ _id: id }, { name, description }, { upsert: false });
        logger.info("result"+JSON.stringify(result));
        if (!result.matchedCount) {
            throw createError(404, "Todo Not Found");
            return;
        }
        if (!result.modifiedCountd) {
            
            createError(401, "Todo Not Modified");
        }
        logger.debug("Todo Updated", JSON.stringify(result));
        res.status(200).json({ message: "Todo Updated successfully" });
        
    }
    catch (err) {
        logger.error('Todo Not Updated' + err);
        next(err);

    }
}

exports.getAllTodos = async(req, res,next) => {
    try {
        const result = await todoSchema.find({});
        res.status(200).json({data: result });
        
    } catch (err) {
        logger.error("Error While finding todos" + err);
        next(err);
    }
}

exports.getTodosById = async(req, res,next) => {
    const validate = await validation.getTodosById().validateAsync(req.params);
    const { id } = req.params;
    logger.info("ID is ");
    const result = await todoSchema.find({ _id: id });
    res.status(200).json({ data: result });
}

exports.deleteAllTodos = async(req, res,next) => {
    try {

        const result = await todoSchema.deleteMany({});
    res.status(200).json({ message: "Suceessfully Deleted All Todos" });

    }
    catch (err) {
        logger.error('Error while deleting By Id' + err)
next(err)

    }
}

exports.deleteTodosById = async (req, res,next) => {
    try {
        const validate = await validation.getTodosById().validateAsync(req.params);
        const { id } = req.params;
        const result = await todoSchema.deleteOne({ _id: id });
        if (!result.deletedCount)
           res.status(403).json({ message: "something went wrong" })

        res.status(200).json({ data: result });
    }
    catch (err) {
        logger.error("Error while deleting" + err);
        next(err);
    }
}