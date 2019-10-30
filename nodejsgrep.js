const filename = __dirname + city.list.js;

// This line opens the file as a readable stream
const readStream = fs.createReadStream(filename);

readStream.on('open', function () {
  // This just pipes the read stream to the response object (which goes to the client)
  readStream.pipe(res);
});

// This catches any errors that happen while creating the readable stream (usually invalid names)
readStream.on('error', function (err) {
  res.end(err);
});
