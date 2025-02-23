module.exports = (name, passCount, uniqueCode, qrCode) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: black; color: white; text-align: center; }
        .container { padding: 20px; border: 2px solid red; max-width: 400px; margin: auto; background: #1a1a1a; border-radius: 10px; }
        h1 { color: red; }
        .details { text-align: left; margin-top: 15px; padding: 10px; background: #2a2a2a; border-radius: 5px; }
        .qr { margin-top: 20px; }
        .footer { font-size: 12px; margin-top: 20px; color: gray; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Prisma</h1>
        <p>Your unique pass is here...</p>
        <div class="details">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Pass Valid for:</strong> ${passCount} person(s)</p>
            <p><strong>Unique-code:</strong> ${uniqueCode}</p>
        </div>
        <div class="qr">
            <img src="${qrCode}" alt="Your Unique QR Code" />
        </div>
        <p><strong>Note:</strong> This QR code is valid for both <b>February 28th and March 1st</b>. Please keep it safe, as it will be required for entry.</p>
        <p style="color: orange;"><strong>Important:</strong> Please do not attempt to alter or manipulate the QR code, as it will make entry impossible.</p>
        <div class="footer">
            This is an auto-generated email. <strong>Do not reply</strong> to this email.<br>
            Regards,<br>
            Prisma Team
        </div>
    </div>
</body>
</html>
`;
