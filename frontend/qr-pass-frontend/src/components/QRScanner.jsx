import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./QRScanner.css"; // Import CSS file

const QRScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [paused, setPaused] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        });

        const onScanSuccess = async (decodedText) => {
            if (!paused) {
                setPaused(true); // Pause scanning
                setScanResult(decodedText);

                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/api/validateQR`,
                        { encryptedQR: decodedText }
                    );
                    alert(response.data.message);
                } catch (error) {
                    alert(error.response?.data?.message || "QR validation failed");
                }
            }
        };

        scanner.render(onScanSuccess, (errorMessage) => console.log(errorMessage));

        return () => scanner.clear();
    }, [paused]);

    const handleRescan = () => {
        setScanResult(null);
        setPaused(false);
        navigate("/"); // Navigate to home route after resetting
    };

    return (
        <div className="scanner-container">
            {!paused && <div id="reader" className="scanner-box"></div>}
            {scanResult && (
                <div className="result-box">
                    <p>Scanned QR: {scanResult}</p>
                    <button onClick={handleRescan}>Scan Another</button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
