const cloudinary = require("cloudinary").v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: "osatocloud9",
    api_key: "541892434313181",
    api_secret: "wulkKLxs_6uDe98n86TlRPDZrAY",
})

const getSigned = async () => {
    const date = new Date()
    const timestamp = Math.round((date.getTime())/1000);
    const api_key = "541892434313181";
    const cloud_name = "osatocloud9";
    // console.log(timestamp)
    const params = {
      timestamp: timestamp
    };
    const signature = await cloudinary.utils.api_sign_request(params, "wulkKLxs_6uDe98n86TlRPDZrAY");
    // console.log({ timestamp, signature });
    return { timestamp, signature, api_key, cloud_name }; 
}
exports.getSigned = getSigned;