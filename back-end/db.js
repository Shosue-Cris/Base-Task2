const sqlite3 = require('sqlite3').verbose();

class DB {
    constructor() {
        this.db = new sqlite3.Database('./database.sqlite', (err) => {
            if (err) {
                console.error('Error al conectar a SQLite:', err);
            } else {
                console.log('Conectado a SQLite');
                this.initDB();
            }
        });
    }

// ... (código existente)

initDB() {
    const createTablesSQL = `
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            ip_address TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime'))
        );
        
        CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service TEXT NOT NULL CHECK(service IN ('web_design', 'seo', 'hosting')),
            email TEXT NOT NULL,
            card_holder TEXT NOT NULL,
            card_number TEXT NOT NULL,
            expiry_month INTEGER NOT NULL CHECK(expiry_month BETWEEN 1 AND 12),
            expiry_year INTEGER NOT NULL CHECK(expiry_year >= 2023),
            cvv TEXT NOT NULL CHECK(length(cvv) BETWEEN 3 AND 4),
            amount REAL NOT NULL,
            currency TEXT NOT NULL CHECK(currency IN ('USD', 'EUR', 'MXN')),
            payment_date TEXT DEFAULT (datetime('now', 'localtime')),
            ip_address TEXT
        );
    `;

    this.db.exec(createTablesSQL, (err) => {
        if (err) {
            console.error('Error al crear tablas:', err.message);
        } else {
            console.log('Tablas verificadas/creadas correctamente');
        }
    });
}
}

module.exports = new DB().db;