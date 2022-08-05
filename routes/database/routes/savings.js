let savings = require("../models/savings.js");
const express = require("express");
const router = express.Router();
const { Savings } = require("./findData.js");


//add new created savings
router.post("/add", (req, res) => {
    
    const Data = req.body;
    const newSavings = new savings(Data);
    newSavings.save()
        .then((e) => res.status(200).json({ "err": false, "message": e._id.toString()  }))
        .catch(err => res.status(500).json({ "err": true }));
})

//update by id
//features that can be updated are many sojust grab the entire data from req
router.put("/update/:id", (req, res) => {
    savings.findById(req.params.id)
        .then(saving => {
            
            Savings.map(val => {
                if(req.body[val]) saving[val] = req.body[val];
            })

            saving.save()
                .then(() => res.status(200).json({ "err": false }))
                .catch(err => res.status(500).json({ "err": true }))
        })
        .catch(err => res.status(500).json({ "err": true }))
})

//cant delete
module.exports = router;