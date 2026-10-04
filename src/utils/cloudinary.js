import { v2 as cloudinary} from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })
        //File has been uploaded successfully
        console.log("File is uploaded on cloudinary. File src: " + response.url);
        fs.unlinkSync(localFilePath);
        return response
    } catch (error) {
        if(fs.unlinkSync(localFilePath)){
            fs.unlinkSync(localFilePath);
            console.log("Deleted");
        }
        return null;
    }
}

const deleteFromCloudinary = async (publicID) => {
    try {
        const result = await cloudinary.uploader.destroy(publicID);
    } catch (error) {
        console.log("Error deleting from cloudinary", error)
        return null;
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }