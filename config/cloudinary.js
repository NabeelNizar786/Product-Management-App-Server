const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadTocloudinary = async(path, folder) => {
    try {
        const data = await cloudinary.v2.uploader.upload(path, {folder})
        const secureUrl = data.secure_url
        return {url:secureUrl, public_id: data.public_id}
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    uploadTocloudinary
}