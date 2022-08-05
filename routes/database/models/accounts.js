const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    first_name: String,
    last_name: String,
    type: String, 
    card_name: String,
    cvc: String,
    card_number: String,
    expiry: String,
    user_id: String,
    user_name: String,
    createdwith_password: Boolean, 
    password: String,
    email: String,
    phone_number: String,
    amt: Number,
    top_up: Date,
    withdrawal: Date,
    lst_redeemed: String,
    lst_balance: Number,
    lst_withdrawal: Date,
    profile_picture: String,
    flexnaira_amt: Number,
    flexnaira_withdrawal: Date,
    flexnaira_topup: Date,
}, {
    timestamps: true,
});

const account = mongoose.model("Account", accountSchema);

module.exports = account;