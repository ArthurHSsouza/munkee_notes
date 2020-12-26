const {host, port, auth} = require('../config/mailer.json').mailer;
const nodemailer = require('nodemailer');

exports.transport = nodemailer.createTransport({
    host,
    port,
    auth 
});