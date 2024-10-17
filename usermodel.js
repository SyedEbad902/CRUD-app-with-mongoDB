import { name } from "ejs";
import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/CRUD");
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image : String

});

export default mongoose.model("User", userSchema);