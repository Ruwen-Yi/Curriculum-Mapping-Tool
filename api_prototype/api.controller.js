/* Functions to execute when receiving http requests */

const sayHi = (req, res) => {
    res.status(200).json({ success: true, msg: `Hello, I am sayHi() from controller` });
};

const sayBye = (req, res) => {
    res.status(200).json({ success: true, msg: 'ByeBye, I am sayBye() from controller' });
};

module.exports = {
    sayHi,
    sayBye,
};