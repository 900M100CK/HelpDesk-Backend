const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HelpdeskSchema = new Schema({
    Key: {
        type: String,
        required: 'kindly enter the key'
    },
    Value: {
        type: String,
        required: 'kindly enter the value'
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