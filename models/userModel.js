import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema } = mongoose
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
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {  //hash methodu bcrypt'den geliyor
        user.password = hash;
        next()  //next: islem tamamlandiktan sonra bir sonraki isleme mgecmesi icin yazdik
    })
})

    const User = mongoose.model("User", userSchema)


    export default User;