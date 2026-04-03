const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HelpdeskSchema = new Schema({
    key: {
        type: String,
        required: [true, 'kindly enter the key'],
        unique: true,
        trim: true,
        uppercase: true,
        index: true
    },
    value: {
        type: String,
        required: [true, 'kindly enter the value'],
        trim: true
    },
    category: {
        type: String,
        enum: ['general', 'technical', 'billing', 'IT support', 'Account'],
        default: 'general',
        lowercase: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },

    notes: {
        type: String,
        maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'closed'],
        default: 'open'
    },
    timestamps: true
});
module.exports = mongoose.model('Helpdesk', HelpdeskSchema);