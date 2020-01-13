const mongoose = require('mongoose');

const CustomerAssetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    serialNumber: {
        type: String,
        required: false,
        max: 255,
        min: 1,
    },
    purchaseDateTime: {
        epoch: {
            type:Number,
            required: true,
        },
        date: {
            type:Date,
            default:Date.now
        }
    },
    serviceTag: {
        type: String,
        required: false,
        max: 255,
        min: 1,
    },
    notes: [{
        epoch: {
            type:Number,
            required: true,
        },
        date: {
            type:Date,
            default:Date.now
        },
        note: {
            type: String,
            required: false,
            max: 255,
            min: 1,
        }
        }],
    tags: [{
        type: String,
        required: false,
        max: 255,
        min: 1,
    }],
    inService: {
        epoch: {
            type:Number,
            required: true,
        },
        date: {
            type:Date,
            default:Date.now
        },
        inService: {
            type:Boolean,
            required: true
        }
    }
});

module.exports = mongoose.model('c001', CustomerAssetSchema);