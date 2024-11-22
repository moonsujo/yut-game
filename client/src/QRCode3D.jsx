import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Image, Html } from '@react-three/drei';
import * as THREE from 'three';

const QRCode3D = ({ url }) => {
  const [qrCodeDataURL, setQRCodeDataURL] = useState('');

  useEffect(() => {
    // Generate the QR code as a Data URL
    if (url) {
      QRCode.toDataURL(url, { margin: 2, width: 512 }, (err, url) => {
        if (err) {
          console.error('Failed to generate QR Code', err);
        } else {
          setQRCodeDataURL(url); // Save the generated QR code as a data URL
        }
      });
    }
  }, [url]);

  return qrCodeDataURL ? (
    <group position={[0,3,0]} rotation={[-Math.PI/8,0,0]} scale={[1,1,1]}>
      {/* Display QR Code */}
      <Image position={[0, 0, 0]} scale={[4, 4, 2]} url={qrCodeDataURL} side={THREE.DoubleSide}/>

      {/* Optional: Add explanatory text */}
      {/* <Html position={[0, -1.5, 0]} center>
        <p style={{ color: 'white', fontSize: '1rem', textAlign: 'center' }}>
          Scan the QR Code to join!
        </p>
      </Html> */}
    </group>
  ) : (
    <Html center>
      <p style={{ color: 'white' }}>Generating QR Code...</p>
    </Html>
  )
};

export default QRCode3D;
