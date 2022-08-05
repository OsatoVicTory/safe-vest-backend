const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const safelockSchema = new Schema({
    name: String,
    type: String, 
    url: String,
    id: String,
    image_url: String,
    user_id: String, 
    frequency: String,
    amt: String, 
    amttype: String,
    target: String,
    interest: String,
    days_left: String,
    nxtparam: String, 
    nxtvalue: String, 
    start_date: Date,
    end_date: Date,
    completed: Boolean,
    rate: String, 
    withdrawn: Boolean,
}, {
    timestamps: true,
});

const safelock = mongoose.model("Safelock", safelockSchema);

module.exports = safelock;