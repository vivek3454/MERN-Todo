const mongoose = require('mongoose');
const { Schema } = mongoose;
const todoSchema = new Schema({
    userId: { type: String },
    todo: {
        type: String,
        minlength: [5, 'Todo must be at least 5 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const todoModel = mongoose.model('todo', todoSchema);
module.exports = todoModel;