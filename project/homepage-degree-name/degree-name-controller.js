/* Render ejs files */

/* Import DAO*/
const getAllDegreeName = require('./degree-name-dao');

/* Render degree names with data return from degree-name-dao.js */
const renderAllDegreeName = (req, res) => {
    let data = getAllDegreeName();
    res.status(200).send(`Data ${data} comes from dao.js, and then render degree names in this page`);
};

/* Export the function to be used by routes.js */
module.exports = renderAllDegreeName;