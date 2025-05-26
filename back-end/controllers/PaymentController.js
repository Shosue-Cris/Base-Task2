const PaymentModel = require('../models/PaymentModel');

class PaymentController {
    constructor() {
        this.model = new PaymentModel();
    }

    async add(req, res) {
        try {
            const { 
                service, 
                email, 
                card_holder, 
                card_number, 
                expiry_month, 
                expiry_year, 
                cvv, 
                amount, 
                currency 
            } = req.body;
            
            if (!service || !email || !card_holder || !card_number || 
                !expiry_month || !expiry_year || !cvv || !amount || !currency) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }

            const ip = req.ipInfo.ip || req.connection.remoteAddress;
            
            const result = await this.model.addPayment({
                service,
                email,
                card_holder,
                card_number,
                expiry_month: parseInt(expiry_month),
                expiry_year: parseInt(expiry_year),
                cvv,
                amount: parseFloat(amount),
                currency,
                ip_address: ip
            });

            res.status(201).json({
                id: result.id,
                payment_date: result.payment_date
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = PaymentController;