const path = require("path");
const axios = require('axios');

module.exports = (req, res, next) => {
    const address = req.query.address;

    axios.get(address).then(res => {
        var title = res.data.split('<title>')[1].split('</title>')[0]
        return res
        .status(200)
        .render(path.join(__dirname, "../", "views", "address.pug"), { address: address, title: title});
    }).catch(error => {
        console.log('Error occured in fetching request ' + error);
        return res.status(500).json({
            status: false,
            errorCode: 'server-error',
            message: 'Request fetching failed'
        });
    });

      
};
