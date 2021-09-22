const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = proces.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    createdByName: "Rick S",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Welcome to the about page.",
    createdByName: "Rick S",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpPage: "Find all the help you need here.",
    title: "Help Page",
    createdByName: "Rick S",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
      return res.send({
        err: "Please provide a valid address.",
      })
  }

  geocode(req.query.address, (err, { latitude, longitude, locationName } = {}) => {
    if (err) {
      return res.send({ err });
    }

    forecast(latitude, longitude, (err, forecastResp) => {
      if (err) {
        return res.send({ err })
      }

      res.send({
        forecast: forecastResp,
        locationName,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404error", {
    title: "404",
    errorText: "Help article not found.",
    createdByName: "Rick S",
  });
});

app.get("*", (req, res) => {
  res.render("404error", {
    title: "404",
    errorText: "Page not found.",
    createdByName: "Rick S",
  });
});

app.listen(port, () => {
  console.log("This is working on port " + port);
});
