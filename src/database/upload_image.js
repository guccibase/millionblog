import { uuid } from "uuidv4";
import { storage } from "../firebase";
import imageCompression from "browser-image-compression";

const imageCompressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
};

export default async (file) => {
    let imageUrl = "";
    const imageId = "cover-image-" + uuid();
    console.log("start of upload");
    // async magic goes here...
    if (file === "") {
        console.error(`not an image, the image file is a ${typeof file}`);
    }

    const image = await imageCompression(file, imageCompressionOptions);
    const uploadTask = await storage
        .ref(`/images/${imageId}`)
        .put(image)
        .then(async (snapshot) => {
            await storage
                .ref("images")
                .child(imageId)
                .getDownloadURL()
                .then(async (firebaseUrl) => {
                    imageUrl = await firebaseUrl;
                    console.log(imageUrl);
                    console.log(firebaseUrl);
                });
        });
    //initiates the firebase side uploading

    return { imageUrl, imageId };
};

export const handleFireBaseUploadUpdate = async (file, imageId) => {
    let imageUrl = "";
    console.log("start of upload");
    // async magic goes here...
    if (file === "") {
        console.error(`not an image, the image file is a ${typeof file}`);
    }

    const image = await imageCompression(file, imageCompressionOptions);
    const uploadTask = await storage
        .ref(`/images/${imageId}`)
        .put(image)
        .then(async (snapshot) => {
            await storage
                .ref("images")
                .child(imageId)
                .getDownloadURL()
                .then(async (firebaseUrl) => {
                    imageUrl = await firebaseUrl;
                    console.log(imageUrl);
                    console.log(firebaseUrl);
                });
        });
    //initiates the firebase side uploading

    return imageUrl;
};
