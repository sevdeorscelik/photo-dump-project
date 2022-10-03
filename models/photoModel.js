import mongoose from "mongoose"

const { Schema } = mongoose
const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    uploadedAt:{
        type: Date,
        default: Date.now,
    },
    user: { //photo modele user ekeldik, böylece yüklenen foto verilerinde onu yokleyen kullanicinin bilgileri de yer alacak
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    url: {  //fotonun urlsini buraya ekliyoruz
        type: String,
        required: true,
    },
    image_id:{
        type: String,
    }
})

const Photo = mongoose.model("Photo", photoSchema)

export default Photo