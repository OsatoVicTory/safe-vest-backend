const account = require("../models/accounts.js");
const invest = require("../models/invest.js");
const savings = require("../models/savings.js");
const safelocks = require("../models/safelock.js");
const accountRoute = require("./accounts.js");
const investRoute = require("./invest.js");
const savingsRoute = require("./savings.js");
const safelockRoute = require("./safelock.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


router.use("/user/account", accountRoute);
router.use("/user/invest", investRoute);
router.use("/user/savings", savingsRoute);
router.use("/user/safelock", safelockRoute);

//load up all users data
router.post("/user", (req, res) => {

    const comparePassword = (hash, value) => {
        return bcrypt.compareSync(hash, value);
    }

    const findUser = (data) => {

        return data.find(x => 
            (x.email == req.body.input || x.phone_number == req.body.input)
             && comparePassword(req.body.password, x.password));
    }

    const filterData = (data, id) => {
        return data.filter(x => x.user_id == id)
    }
    
    const getData = async () => {
        try {
            const Data = {};
            const users = await account.find();
            const authUser = await findUser(users);
            if(!authUser) return { "message": null };

            Data["userAccount"] = authUser;
            var models = [invest,savings,safelocks];
            var ref = ["userInvestments", "userTargetsavings","userSafelocks"];
            for(var i=0;i<3;i++) {
                const data = await models[i].find();
                Data[ref[i]] = await filterData(data, authUser.user_id);
            }
            return { "message": Data };
        } catch (err) {
            return { "err": true };
        }
    }

    getData().then(data => res.status(200).json(data))
    
});


module.exports = router;
