const QRCode = require("qrcode");
const { encrypt } = require("./encryptor");

const generateQR = async (user) => {
    const encryptedUUID = encrypt(user.uuid);
    return await QRCode.toDataURL(encryptedUUID);
};

module.exports = generateQR;