import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QRScanner = ({ onScan }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear(); // Stop scanning after first successful scan
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    return () => scanner.clear();
  }, [onScan]);

  return <div id="reader" className="p-4 bg-gray-800 rounded-lg"></div>;
};

export default QRScanner;
