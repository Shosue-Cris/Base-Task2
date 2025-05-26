const db = require('../db');

class PaymentModel {
    async addPayment(paymentData) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO payments (
                    service, email, card_holder, card_number, 
                    expiry_month, expiry_year, cvv, amount, currency, ip_address
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    paymentData.service,
                    paymentData.email,
                    paymentData.card_holder,
                    paymentData.card_number,
                    paymentData.expiry_month,
                    paymentData.expiry_year,
                    paymentData.cvv,
                    paymentData.amount,
                    paymentData.currency,
                    paymentData.ip_address
                ],
                function(err) {
                    if (err) return reject(err);
                    resolve({ 
                        id: this.lastID,
                        payment_date: new Date().toISOString()
                    });
                }
            );
        });
    }
}

module.exports = PaymentModel;