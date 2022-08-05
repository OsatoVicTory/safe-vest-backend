const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const database = require("./routes/database/routes/Index.js");
const cloudinary = require("./routes/cloudinary/index.js");
const auth = require("./routes/auth/index.js");


require('dotenv').config();
const app = express();
const port = 8080;
app.use(express.json());
app.use(cors({ origin: true, methods: "GET,HEAD,PUT,PATCH,DELETE", credentials: true }));

//send signature to client for uploading
//on cloudinary
app.use("/api/cloudinary", cloudinary);
//auth
app.use("/api/auth", auth);


const uri = process.env.MONGODB_ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) console.log(err);
    else console.log("mongodb connected succefully");
});

//for mongodb
app.use("/api/db", database);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})