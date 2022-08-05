const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const savingsSchema = new Schema({
    name: String,
    type: String, 
    category: String,
    url: String,
    Category: String,
    friends: Array,
    savings_preference: String,
    id: String,
    image_url: String,
    time: String,
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
    members: String, 
    rate: String,
    lock: Boolean, 
    break: Boolean, 
}, {
    timestamps: true,
});

const savings = mongoose.model("Savings", savingsSchema);

module.exports = savings;