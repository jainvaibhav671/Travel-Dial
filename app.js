
let express = require ("express");
let hbs = require("hbs");
let path = require ("path");
let bodyParser = require('body-parser');
let mongoose = require("mongoose");

let app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static (path.join(__dirname, "public")))

app.set ("view engine", "hbs")    
app.set("views", path.join(__dirname, "templates/views"))
hbs.registerPartials(path.join(__dirname, "templates/partials"));

let id = 1;

let schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    // photo: {
    // 	type: String,
    // 	required: true
    // },
    destinations: {
        type: Number,
        required: true
    },
    haults: {
        type: Number,
        required: true
    },
    duration: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    itenaries: {
        type: Array,
        required: true
    },
    "Wi-Fi": {
        type: Boolean
    },
    "TV": {
        type: Boolean
    },
    "Swimming Pool": {
        type: Boolean
    },
    "AC": {
        type: Boolean
    },
    "Fire Extinguisher": {
        type: Boolean
    },
    "Housekeeping": {
        type: Boolean
    },
    "Meals": {
        type: Boolean
    },
    "RO Water": {
        type: Boolean
    },
    "Card Payment": {
        type: Boolean
    },
    "Power_Backup": {
        type: Boolean
    },
    "Reception": {
        type: Boolean
    },
    "Cab Service": {
        type: Boolean
    },
    "CCTV": {
        type: Boolean
    },
    "24/7 Check-In": {
        type: Boolean
    },
    "Travel Guide": {
        type: Boolean
    },
    "First Aid": {
        type: Boolean
    }
});

let Package = new mongoose.model("Package", schema);

app.get("/", (req, res) => {
    app.set({
        "Allow-access-Allow-Origin": "*"
    });
    res.render("home")
});

app.get("/Destinations", (req,res)=>{
    // res.sendFile (path.join(__dirname, "/public/Destination.html"))
    res.render("Destination")
});

app.get("/About", (req, res) => {
    res.render("About");
})

app.get("/Login", (req,res)=>{
    // res.sendFile (path.join(__dirname, "/public/login.html"))
    res.render("Login");
});

app.get("/Partner", (req,res)=>{
    res.render("registration");
    // res.sendFile (path.join(__dirname, "/public/registration.html"))
});

app.post("/post", (req, res) => {

    console.log(req.body);

    req.body["id"] = id;
    id++;
    console.log(req.body);

    let _package = new Package(req.body);

    _package.save();

    console.log("Data saved");

    return res.redirect("package_added.html")

})

app.all("*", (req, res) => {
    res.render("error");
    res.sendFile(path.join(__dirname, "/public/error.html"));
})

app.listen("6969 ", ()=>{
    console.log('connected...');
	console.log(path.join(__dirname, "public"));
});


let connectdb = require("./connectdb");
connectdb();
