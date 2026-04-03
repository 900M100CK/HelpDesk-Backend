const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HelpdeskSchema = new Schema({
    key: {
        type: String,
        required: [true, 'kindly enter the key'],
        unique: true,
        trim: true,
        uppercase: true
    },
    value: {
        type: String,
        required: [true, 'kindly enter the value'],
        trim: true
    },
    category: {
        type: String,
        enum: ['general', 'technical', 'billing', 'IT support', 'Account'],
        default: 'general'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },

    notes: {
        type: String
    },
    created_date: { 
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'closed'],
        default: 'open'
    }
});
module.exports = mongoose.model('helpdesk', HelpdeskSchema);