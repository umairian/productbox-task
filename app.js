const express = require('express');
const app = express();
const http = require('follow-redirects').http;
const url = require('url');
const port = 3000;

app.get('/I/want/title/', (req, res, next) => {
    const address = req.query.address;

    var addressArray = [];
    if(!Array.isArray(address)) { // Check whether address is array or not
        addressArray.push(address);
        console.log(addressArray);
    } else {
        addressArray = [...address];
        console.log("ruungnign");
    }

    if(addressArray.length == 1) { // In case of single address
        let data = [];

        http.get(address, (resp) => {
            
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data.push(chunk);
                console.log(chunk);
                
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const result = Buffer.concat(data).toString('utf-8');
                console.log(result);
                var title = result.split('<title>')[1].split('</title>')[0];
                console.log(title);

                return res.send(`<ul><li>${address} - ${title}</li></ul>`);
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
        }
});

app.get('*', (req, res, next) => {
    return res.send('<h1>Error 404, not found</h1>');
});

app.listen(port);