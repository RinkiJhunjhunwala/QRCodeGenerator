
let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");

async function generateQR() {
    
    if (qrText.value.trim().length > 0) {
        try {
            
            const response = await fetch('http://localhost:3000/generate-qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: qrText.value.trim() }),
            });

            
            if (!response.ok) {
                throw new Error('Error generating QR code');
            }

            
            const result = await response.json();

            
            qrImage.src = result.qrCode; 
            imgBox.classList.add('show-img'); 

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate QR code. Please try again.');
        }
    } else {
        alert('Please enter valid text or URL!');
    }
}

