const path = require("path");
const axios = require('axios');

module.exports = (req, res, next) => {
    const address = req.query.address; // query addresses
    var addressArray = [];
    if(!Array.isArray(address)) { // Check whether address is array or not
        addressArray.push(address);
        console.log(addressArray);
    } else {
        addressArray = [...address];
        console.log(addressArray);
    }

    if(addressArray.length == 1) { // In casw of single address
        axios.get(address).then(result => {
            var title = result.data.split('<title>')[1].split('</title>')[0];
            return res.render(path.join(__dirname, "../", "views", "address.pug"), { address: address, title: title});
        }).catch(error => {
            console.log('Error occured in fetching request ' + error);
            return res.render(path.join(__dirname, "../", "views", "address.pug"), { address: address, title: 'Not Found'});
        });
    } else {
        const titlesArray = [];
        const promises = [];

        addressArray.forEach(element => {
            promises.push(axios.get(element).then(result => {
                console.log('Fetching titles');
                var title = result.data.split('<title>')[1].split('</title>')[0];
                titlesArray.push([element, title]);
                console.log(titlesArray);
            }).catch(error => {
                console.log(error);
                titlesArray.push([element, 'Not Found']);
            }));
        });
        

        Promise.all(promises).then(result => {
            console.log('Response function running');
            res.render(path.join(__dirname, "../", "views", "addressMany.pug"), { address: address, title: titlesArray});
        }).catch(error => {
            console.log(error);
        });

        // function fetchTitles(_callback) {
        //     addressArray.forEach(element => {
        //         axios.get(element).then(result => {
        //             console.log('firstttt');
        //             var title = result.data.split('<title>')[1].split('</title>')[0];
        //             titlesArray.push(title);
        //             console.log(titlesArray);
        //         }).catch(error => {
        //             console.log(error);
        //             callback(null);
        //         });
        //     });
        //     _callback();
        // }

        // fetchTitles(() => {
        //     console.log('Second timeee!!!!!!!!');
        //     res.render(path.join(__dirname, "../", "views", "addressMany.pug"), { address: address, title: titlesArray});
            
        // });

        // async.waterfall([(callback) => {
        //     addressArray.forEach(element => {
        //         axios.get(element).then(result => {
        //             var title = result.data.split('<title>')[1].split('</title>')[0];
        //             titlesArray.push(title);
        //             console.log(titlesArray);
        //         }).catch(error => {
        //             console.log(error);
        //             callback(null);
        //         });
        //     }); 
        //     callback(null, 'one');
        // }, (arg1, callback) => {
        //     console.log('SEcond time this bitch ' + titlesArray);
        //     res.render(path.join(__dirname, "../", "views", "addressMany.pug"), { address: address, title: titlesArray});
        //     callback(null, 'done');
        // }], (error, result) => {
        //     console.log(error);
        //     console.log(result);
        // });
        
        
    }


};
