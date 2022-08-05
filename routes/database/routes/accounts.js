let account = require("../models/accounts.js");
const express = require("express");
const router = express.Router();
const { Account } = require("./findData.js");
const bcrypt = require("bcrypt");

const hashPassword = (val) => {
    return bcrypt.hashSync(val, 10);
}

//add new account on sign up
router.post("/add", (req, res) => {
    // encrypt password
    const hashedPassword = hashPassword(req.body.password);
    if(hashedPassword) {
        const Data = {
            ...req.body,
            ["password"]: hashedPassword
        }
        const newAccount = new account(Data);
        newAccount.save()
          .then(() => res.status(200).json({ "err": false }))
          .catch(err => res.status(500).json({ "err": true }))
    } else {
        res.status(500).json({ "err": true })
    }
})

//find username and edit password
router.put("/recovery", (req, res) => {

    let isEmail = req.body.input.includes("@");

    // console.log(isEmail)

    const finderEdit = async () => {
        try {
            let userAccount;
            if(isEmail) {
                const email = req.body.input;
                userAccount = await account.findOne({ email })
                if(!userAccount) {
                    return res.status(500).json({ err: true, message: "Wrong Input" });
                }
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                userAccount.password = hashedPassword;
                await userAccount.save();
                return res.status(200).json({ message: true, err: false });
                
            } else {
                const phone_number = req.body.input;
                userAccount = await account.findOne({ phone_number });
                if(!userAccount) {
                    return res.status(200).json({ err: true, message: "Wrong Input" });
                }
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                userAccount.password = hashedPassword;
                await userAccount.save();
                return res.status(200).json({ message: true, err: false });
                
            }
        } catch (err) {
            res.status(500).json({ err: true });
        }
    }

    finderEdit();
})

//update account settings
//can only update name,email,phone number
router.put("/update/:id", (req, res) => {
    // console.log(req.body)
    account.findById(req.params.id)
        .then(acc => {
            
            Account.map(val => {
                if(req.body[val]) acc[val] = req.body[val];
            })

            acc.save()
                .then(() => res.status(200).json({ "err": false }))
                .catch(err => res.status(500).json({ "err": err }))
        })
        .catch(err => res.status(500).json({ "err": err }))
})


module.exports = router;