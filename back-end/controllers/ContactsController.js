const ContactsModel = require('../models/ContactsModel');

class ContactsController {
    constructor() {
        this.model = new ContactsModel();
    }
    // Añade este nuevo método a la clase ContactsController
async index(req, res) {
    try {
        const contacts = await this.model.getContacts();
        
        // Para API JSON (opcional)
        if (req.accepts('json')) {
            return res.json(contacts);
        }
        
        // Para vista HTML
        res.render('admin/contacts', { 
            title: 'Contactos Registrados',
            contacts 
        });
    } catch (err) {
        console.error('Error al obtener contactos:', err);
        res.status(500).send('Error interno del servidor');
    }
}

    async add(req, res) {
        try {
            const { name, email, message } = req.body;
            
            if (!name || !email || !message) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }

            const ip = req.ipInfo.ip || req.connection.remoteAddress;
            const result = await this.model.addContact({ 
                name, 
                email, 
                message,
                ip_address: ip
            });
            
            res.status(201).json({ 
                id: result.id,
                timestamp: result.timestamp
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
        
    }

    async list(req, res) {
        try {
            const contacts = await this.model.getContacts();
            res.json(contacts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async index(req, res) {
        try {
            const contacts = await this.model.getContacts();
            res.render('admin/contacts', { 
                contacts: contacts,
                title: 'Contactos Registrados'
            });
        } catch (error) {
            console.log('Error al obtener contactos:', error);
            res.status(500).send('Error al cargar los contactos');
        }
    }
}

module.exports = ContactsController;