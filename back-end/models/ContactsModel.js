const db = require('../db');

class ContactsModel {
    async addContact(contactData) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO contacts (name, email, message, ip_address) VALUES (?, ?, ?, ?)`,
                [contactData.name, contactData.email, contactData.message, contactData.ip_address],
                function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ 
                        id: this.lastID,
                        timestamp: new Date().toISOString()
                    });
                }
            );
        });
    }

    async getContacts() {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT id, name, email, message, ip_address, created_at 
                FROM contacts 
                ORDER BY created_at DESC
                `, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
    
}
class ContactsModelAdmin {
    getContacts() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM contacts ORDER BY created_at DESC", (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}
module.exports = ContactsModel;