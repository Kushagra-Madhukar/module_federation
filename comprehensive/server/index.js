const express = require('express');
const path = require('path');
const app = express();

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/*', function (req, res) {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});