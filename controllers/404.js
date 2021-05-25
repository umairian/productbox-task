const path = require('path');

module.exports = (req, res, next) => {
    return res.status(404).sendFile(path.join(__dirname, '../', 'views', '404.html'));
};