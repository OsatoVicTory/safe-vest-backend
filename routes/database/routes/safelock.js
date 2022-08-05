let safelocks = require("../models/safelock.js");
const express = require("express");
const router = express.Router();
const { Safelock } = require("./findData.js");

//add new created safelock
router.post("/add", (req, res) => {
    
    const newsafelock = new safelocks(req.body);
    newsafelock.save()
      .then((e) => res.status(200).json({ "err": false, "message": e._id.toString() }))
      .catch(err => res.status(500).json({ "err": true }))
})

//update by id
//features that can be updated are many sojust grab the entire data from req
router.put("/update/:id", (req, res) => {
    safelocks.findById(req.params.id)
        .then(safelock => {
            
            Safelock.map(val => {
                if(req.body[val]) safelock[val] = req.body[val];
            })

            safelock.save()
                .then(() => res.status(200).json({ "err": false }))
                .catch(err => res.status(500).json({ "err": true }))
        })
        .catch(err => res.status(500).json({ "err": true }))
})

//cant delete
module.exports = router;