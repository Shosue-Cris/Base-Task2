document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = {
        service: document.getElementById('service').value,
        email: document.getElementById('email').value.trim(),
        card_holder: document.getElementById('card_holder').value.trim(),
        card_number: document.getElementById('card_number').value.trim(),
        expiry_month: document.getElementById('expiry_month').value,
        expiry_year: document.getElementById('expiry_year').value,
        cvv: document.getElementById('cvv').value.trim(),
        amount: document.getElementById('amount').value,
        currency: document.getElementById('currency').value
    };

    // Validación básica
    if (Object.values(formData).some(value => !value)) {
        showMessage('Todos los campos son requeridos', 'error');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Procesando...';

    try {
        const response = await fetch('http://localhost:3000/payment/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (response.ok) {
            const fecha = new Date(result.payment_date).toLocaleString();
            showMessage(`¡Pago realizado con éxito!<br><small>Fecha: ${fecha}</small>`, 'success');
            e.target.reset();
        } else {
            showMessage(result.error || 'Error al procesar el pago', 'error');
        }
    } catch (error) {
        showMessage('Error de conexión con el servidor', 'error');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Realizar Pago';
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('responseMessage');
    messageDiv.innerHTML = `<p>${message}</p>`;
    messageDiv.className = type;
}