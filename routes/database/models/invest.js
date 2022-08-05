const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const investSchema = new Schema({
    company: String,
    name: String,
    location: String,
    user_id: String, 
    url: String,
    id: String,
    cycle: String,
    type: String,
    category: String,
    amt: String,
    like: Boolean,
    completed: Boolean, 
    expected_returns: String,
    percent: String,
    returns: String,
    investment_type: String,
    nxtparam: String, 
    nxtvalue: String, 
    closing_date: Date,
    maturity_date: Date,
    payout_type: String,
    unit_type: String,
    insurance_partner: String,
}, {
    timestamps: true,
});

const invest = mongoose.model("Invest", investSchema);

module.exports = invest;