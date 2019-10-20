const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new Schema({
    plateNumber: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bus', busSchema);
