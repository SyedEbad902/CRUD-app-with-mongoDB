import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import usermodel from "./usermodel.js";

const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current file
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create",async (req, res) => {
  let { name, email, image } = req.body;
   let createdUser = await usermodel.create({
        name : name,
        email : email,
        image : image,
    })
    res.redirect('/read');
    // res.send(createdUser);
});

app.get("/read", async (req, res) => {
    let allUsers = await usermodel.find();
    // res.send(allUsers)
    
    res.render("read", { allUsers : allUsers});
});

app.get("/delete/:id", async (req, res) => {
    let allUsers = await usermodel.findOneAndDelete(
        {_id : req.params.id}
    );
    // res.send(allUsers)
    res.redirect('/read');    
});

app.get("/update/:id", async (req, res) => {
    let user = await usermodel.findOne(
        {_id : req.params.id}
    );
    res.render("edit", { user: user });
    // res.send(user)
    // res.redirect('/read');    
});
app.post("/update/:id", async (req, res) => {
    let { name, email, image } = req.body;
    let user = await usermodel.findOneAndUpdate(
        { _id: req.params.id },
        {
            name: name,
            email: email,
            image: image
        },
    );
    res.redirect('/read');
    // res.send(user)
    // res.redirect('/read');    
});




app.listen(3000);
