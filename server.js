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
        insuranceCompany: 'ABC Insurance'
    },
    {
        id: 2,
        patientName: 'Jane Smith',
        paymentAmount: 150.00,
        serviceDate: '2024-05-02',
        insuranceCompany: 'XYZ Insurance'
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

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
