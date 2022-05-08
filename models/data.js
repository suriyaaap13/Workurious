const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sDate: {
        type: Date
    },
    eDate: {
        type: Date
    },
    pConsumed: {
        type: Number
    }
},{
    timestamps: true
});


const Data = mongoose.model("Data", dataSchema);
module.exports = Data;