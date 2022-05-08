const mongoose = require('mongoose');

// 1. Implement a way to store perday value for every month from the starting date 
const powerSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});


const Power = mongoose.model("Power", powerSchema);
module.exports = Power;