var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path")

require('dotenv').config()

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Create the multer instance
const upload = multer({ dest: 'uploads/' });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {

  console.log("req.body: ", req.file);
  // console.log("req.body: ", req.upfile);

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
