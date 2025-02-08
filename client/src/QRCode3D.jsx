import QRCodeStyling from "qr-code-styling";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";

export default function QrCode3d({ text, position, scale, rotation }) {
  const [texture, setTexture] = useState(null)

  // Generate the QR code as an image
  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 256,
      height: 256,
      data: text,
      image: './images/yoot.png',
      dotsOptions: {
        color: "#000000",
        type: "dots",
        // gradient applies to dots like a background
      },
      backgroundOptions: {
        color: "#ffffff",
        // gradient: {
        //   type: 'radial',
        //   colorStops: [
        //     // inner
        //     {
        //       offset: 0.1, // radius, between 0 and 1 (edge of box)
        //       color: 'yellow'
        //     },
        //     // outer
        //     {
        //       offset: 0.4,
        //       color: '#005500'
        //     }
        //   ]
        // }
      },
      cornersSquareOptions: {
        type: 'dot',
        // gradient: {
        //   type: 'radial',
        //   colorStops: [
        //     // inner
        //     {
        //       offset: 0.8, // radius, between 0 and 1 (edge of box)
        //       color: 'yellow'
        //     },
        //     // outer
        //     {
        //       offset: 1,
        //       color: '#555500'
        //     }
        //   ]
        // }
      },
      cornersDotOptions: {
        type: 'dot',
        // gradient: {
        //   type: 'radial',
        //   colorStops: [
        //     // inner
        //     {
        //       offset: 0.5, // radius, between 0 and 1 (edge of box)
        //       color: 'yellow'
        //     },
        //     // outer
        //     {
        //       offset: 1,
        //       color: '#555500'
        //     }
        //   ]
        // }
      }
    });

    // Generate the blob and set the texture
    qrCode.getRawData('png').then((blob) => {
      const url = URL.createObjectURL(blob);
      new TextureLoader().load(url, (loadedTexture) => {
        setTexture(loadedTexture);
        URL.revokeObjectURL(url); // Cleanup the object URL
      });
    });

    console.log('[useEffect] finish')
  }, []);

  if (!texture) return null; // Wait for the texture to load

  return <group>
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} />
    </mesh>
    {/* <Star position={[7.127, 0, -3.36]} scale={0.1} color='white'/>
    <Star position={[9.878, 0, -3.36]} scale={0.1} color='white'/>
    <Star position={[7.127, 0, -0.61]} scale={0.1} color='white'/> */}
  </group>
}