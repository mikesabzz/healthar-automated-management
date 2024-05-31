const express = require('express');
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const mockData = [
    {
        id: 1,
        patientName: 'John Doe',
        paymentAmount: 100.00,
        serviceDate: '2024-05-01',
        insuranceCompany: 'ABC Insurance',
        balance: 200.00,
        creditCard: '4111111111111111',
        phoneNumber: '1234567890'
    },
    {
        id: 2,
        patientName: 'Jane Smith',
        paymentAmount: 150.00,
        serviceDate: '2024-05-02',
        insuranceCompany: 'XYZ Insurance',
        balance: 300.00,
        creditCard: '82222222222222',
        phoneNumber: '0987654321'
    },
    // Add more mock data as needed
];


// Endpoint to fetch all mock data
app.get('/api/mockdata', (req, res) => {
    res.json(mockData);
});

// Endpoint to fetch data for a specific ID
app.get('/api/mockdata/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = mockData.find(item => item.id === id);
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

app.post('/api/update-patient-balances', (req, res) => {
    const updates = req.body;

    updates.forEach(update => {
        const patient = mockData.find(item => item.id === update.id);
        if (patient) {
            patient.paymentAmount = update.paymentAmount;
        }
    });

    res.json({ message: 'Patient balances updated successfully' });
});

// Endpoint to generate invoices
app.get('/api/generate-invoices', (req, res) => {
    const invoices = mockData.map(patient => {
        return {
            patientName: patient.patientName,
            serviceDate: patient.serviceDate,
            insuranceCompany: patient.insuranceCompany,
            paymentAmount: patient.paymentAmount,
            balance: patient.balance,
            invoiceAmount: patient.balance - patient.paymentAmount
        };
    });

    res.json(invoices);
});

// Endpoint to charge credit cards
app.post('/api/charge-credit-cards', (req, res) => {
    const charges = req.body;

    const chargedPatients = charges.map(charge => {
        const patient = mockData.find(item => item.id === charge.id);
        if (patient && patient.creditCard) {
            // Mock charging the credit card
            patient.balance -= charge.amount;
            return {
                patientName: patient.patientName,
                amount: charge.amount,
                success: true
            };
        } else {
            return {
                patientName: patient ? patient.patientName : 'Unknown',
                amount: charge.amount,
                success: false,
                message: patient ? 'Credit card not found' : 'Patient not found'
            };
        }
    });

    res.json(chargedPatients);
});

// Endpoint to send text messages to patients
app.post('/api/send-text-messages', (req, res) => {
    const messages = req.body;

    const sentMessages = messages.map(message => {
        const patient = mockData.find(item => item.id === message.id);
        if (patient && patient.phoneNumber) {
            // Mock sending text message
            return {
                patientName: patient.patientName,
                phoneNumber: patient.phoneNumber,
                success: true
            };
        } else {
            return {
                patientName: patient ? patient.patientName : 'Unknown',
                success: false,
                message: patient ? 'Phone number not found' : 'Patient not found'
            };
        }
    });

    res.json(sentMessages);
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
