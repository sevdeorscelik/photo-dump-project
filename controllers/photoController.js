import Photo from "../models/photoModel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" //node.js paketidir


const createPhoto = async (req, res) => {

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'photo_dump', //cloudinarydeki folder name ile ayni
        }
    )

console.log('RESULT:::', result); //foto bilgileri

    try {

        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url,
            image_id: result.public_id,
        })

        fs.unlinkSync(req.files.image.tempFilePath); //foto yüklendikten sonra kaynak dosyamizda otomatik tmp klasörü olusuyor. bu isimize yaramaz. foto yüklenmeden hemen bunu kaldirmak icin bu yöntemi kullaniyoruz

        res.status(201).redirect("/users/dashboard") //yeni foto yükledikten sonra dashboarda yönlendirir

    } catch (error) {

        res.status(500).json({
            succeded: false,
            error,
        });

    };

}

const getAllPhotos = async (req, res) => {
    try {

        const photos = await Photo.find({})
        /*
        res.status(200).json({
            succeded: true,
            photos
        })
        //bu sekilde yazarsak sayfada json verilerini görüyoruz. o yüzden söyle yazmaliyiz:
        */

        res.status(200).render('photos', {
            photos,
            link: "photos",
        })

    } catch (error) {

        res.status(500).json({
            succeded: false,
            error,
        });

    }
}



const getAPhotos = async (req, res) => {
    try {
        const photo = await (await Photo.findById({ _id: req.params.id })).populate("user")
        res.status(200).render('photo', {
            photo,
            link: "photos",
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}


const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id)
        const photoId = photo.image_id

        await cloudinary.uploader.destroy(photoId)
        await Photo.findOneAndRemove({ _id : req.params.id })
        
        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}

export { createPhoto, getAllPhotos, getAPhotos, deletePhoto }