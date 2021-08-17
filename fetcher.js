const request = require('request');
const fs = require('fs');

const fetcher = function (url, fileName) {
  if(!url || !fileName) throw new Error('URL or file name is not defined');
  request(url, (error, response, body) => {
    if(error) throw new Error('unsaccessful request');
    fs.open(fileName, 'w', function(err, file){
      fs.write(file, body, function (err) {
        if (err) throw err;
        console.log('Saved!');
        fs.stat(fileName, (error, stats) => {
          console.log(`Downloaded and saved ${stats.size} bytes to ${fileName}`)
        })
      })
    });
  });
};

fetcher(process.argv[2], process.argv[3]);