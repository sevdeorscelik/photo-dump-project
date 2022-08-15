import mongoose from "mongoose"

const { userSchema } = mongoose
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

},
{
    timestamps: true
})

const User = mongoose.model("Photo", userSchema)

export default Photo