
const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(express.json()); 


app.use(cors()); 


app.use(express.static(path.join(__dirname, 'public')));


app.post('/generate-qr', async (req, res) => {
    const { data } = req.body;

    if (!data || data.trim() === "") {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        
        const qrCode = await QRCode.toDataURL(data); 
        res.json({ qrCode }); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
