import express from "express"
import { createPhoto, getAllPhotos, getAPhotos, deletePhoto, updatePhoto } from '../controllers/photoController.js'


const router = express.Router()

/*
router.route("/").post(createPhoto)
router.route("/").get(getAllPhotos)
*/

//**** wir können so kurz schreiben ****//

router
    .route("/")
    .post(createPhoto)
    .get(getAllPhotos);

router
    .route("/:id")
    .get(getAPhotos);

router
    .route("/:id")
    .delete(deletePhoto);

router
    .route("/:id")
    .put(updatePhoto);

export default router