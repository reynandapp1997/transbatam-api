const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    location: {
        coordinates: {
            latitude: {
                type: Number,
                required: true,
                min: -90,
                max: 90
            },
            longitude: {
                type: Number,
                required: true,
                min: -180,
                max: 180
            }
        }
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);
