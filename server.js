const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

// Define the directory where partials will be stored
hbs.registerPartials(__dirname + '/views/partials');
// Tell express the type of engine we wanna use
app.set('vew engine', 'hbs');

// next is not being called
// app.use((req, res, next) => {
//   res.render('maintanance.hbs');
//
// });

// Use this middleware function to specify the static folder
app.use(express.static(__dirname + '/public'));

// middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} - ${req.url} \n`;
  console.log(log);
  fs.appendFile('server.log', log, (err) => {
    if (err) {
      console.log('Unable to create the server.log file.');
    }
  });
  next();
});

// To have define functions
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// Router
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project Page'
  });
});

// Use the app and listen to any change
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
