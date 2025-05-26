const PaymentController = require('./controllers/PaymentController');
const cors = require('cors');
const express = require('express');
const expressIp = require('express-ip');
const ContactsController = require('./controllers/ContactsController');
const paymentController = new PaymentController();
const basicAuth = require('express-basic-auth');
const app = express();
const contactsController = new ContactsController();
app.set('view engine', 'ejs');


app.use(expressIp().getIpInfoMiddleware);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));


app.use('/admin', basicAuth({
    users: { 'admin': 'admin123' },
    challenge: true
}));


app.post('/contacts', (req, res) => contactsController.add(req, res));
app.post('/payment/add', (req, res) => paymentController.add(req, res));
app.get('/contacts', (req, res) => contactsController.list(req, res));
app.get('/admin/contacts', (req, res) => {
    contactsController.index(req, res);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Accede a la vista en: http://localhost:${PORT}/admin/contacts`);
});