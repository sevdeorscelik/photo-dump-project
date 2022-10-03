import express from "express"
import { createPhoto, getAllPhotos, getAPhotos, deletePhoto } from '../controllers/photoController.js'


const router = express.Router()

/*
router.route("/").post(createPhoto)
router.route("/").get(getAllPhotos)
*/

//**** wir können so kurz schreiben ****//

router
    .route("/")
    .post(createPhoto)
    .get(getAllPhotos)

router
    .route("/:id")
    .get(getAPhotos)

router
    .route("/:id")
    .delete(deletePhoto)

export default router