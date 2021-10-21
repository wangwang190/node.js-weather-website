
//definition
const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")
const { registerPartial } = require("hbs")
const geoCode = require("./utils/geocode.js")
const foreCast = require("./utils/forecast")

// path
const pathToRoot = path.join(__dirname, "../public")

const viewsPath = path.join(__dirname, "/templates/views")
const partialsPath = path.join(__dirname, "/templates/partials")

//app.set(name, value) - customize the settings in express(). The following customize the view engine and the view location/folder.
app.set("view engine", "hbs")
app.set("views", viewsPath )
 
//load the partials
hbs.registerPartials(partialsPath)

//app.use(middleware()) - act as software glue/pipe that connects things together. The following "glue/pipe" the PathToRoot to static files in express()
app.use(express.static(pathToRoot))

//app.get(path,callback) - response with the callback when a Get request is send to the path. res.render(which file rendered to, callback) - render the responds into HTML strings to client (browser)
app.get("", (req,res) => {
    res.render('index', {title: "Weather"})
})

app.get("/about", (req, res) => {
    res.render("about", {title: "Information"})
})

app.get("/help", (req,res) => {
    res.render("help", {title:"Help"})
})

app.get("/help/*", (req,res) => {
    res.render("404", {errorMessage:"Help article not found"})
})

app.get("/weather", (req,res) => {
    if (!req.query.address) {
        res.send( {error: "please provide an address"})
    }  

    else {
        geoCode(req.query.address, (error, {latitude,longtitude, location}={}) => {
            if (error) {
                return res.send({error})
            }
            
            foreCast(latitude,longtitude, (error,data)=> {
                if (error) {
                    res.send("Something went wrong on Forecast.")
                }

                res.send({
                    temperature: data,
                    location

                })
            })
            
            
        })
    }
    
})


app.get("*", (req,res) => {
    res.render("404", {title: "ERROR", errorMessage:"ERROR 404 !"})
})



// app.listen(port, callback) - start up a server in the website
app.listen(3000, () => {
    console.log("app listening at port 3000")
})



