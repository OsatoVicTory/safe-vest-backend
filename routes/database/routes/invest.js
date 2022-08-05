// let toDo = require("../models/models.js");
const express = require("express");
const router = express.Router();
const { Invest } = require("./findData.js");
const invest = require("../models/invest.js");

//add new created investment
router.post("/add", (req, res) => {
    
    const newInvest = new invest(req.body);
    newInvest.save()
      .then(() => res.status(200).json({ "err": false, "message": e._id.toString()  }))
      .catch(err => res.status(500).json({ "err": true }))
})

//update by id investment
//only completed and like feature can be updated
router.put("/update/:id", (req, res) => {
    invest.findById(req.params.id)
        .then(inv => {
            inv.completed = req.body.completed;
            inv.like = req.body.like;

            inv.save()
                .then((e) => res.status(200).json({ "err": false }))
                .catch(err => res.status(500).json({ "err": true }))
        })
        .catch(err => res.status(500).json({ "err": true }))
})

//cannot delete investments

module.exports = router;