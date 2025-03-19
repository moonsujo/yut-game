export default function useShakeDetector() {
  let shakeThreshold = 15; // Set the shake threshold (you may need to tune this based on the device)
  let lastTime = 0; // Last time the shake was detected
  let shakeTimeout = 1000; // Time in milliseconds to prevent multiple shakes within a short period
  let lastAcceleration = { x: 0, y: 0, z: 0 };
  
  function detectShake(event, shakeHandler) {
    const currentAcceleration = event.accelerationIncludingGravity;
    const x = currentAcceleration.x;
    const y = currentAcceleration.y;
    const z = currentAcceleration.z;

    // Calculate the change in acceleration (magnitude of the difference)
    const deltaX = x - lastAcceleration.x;
    const deltaY = y - lastAcceleration.y;
    const deltaZ = z - lastAcceleration.z;

    const accelerationMagnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

    // Check if the magnitude exceeds the threshold (indicating a shake)
    if (accelerationMagnitude > shakeThreshold) {
        const currentTime = Date.now();
        
        // Ensure that multiple shakes are not detected in a short time
        if (currentTime - lastTime > shakeTimeout) {
            lastTime = currentTime;
            shakeHandler();
        }
    }

    // Store the current acceleration for the next comparison
    lastAcceleration = { x, y, z };
  }

  function enableShakeToThrow(shakeHandler) {

    // Listen for devicemotion event
    window.addEventListener("devicemotion", (e) => detectShake(e, shakeHandler));  
  }
  function disableShakeToThrow() {

    // Listen for devicemotion event
    window.removeEventListener("devicemotion", (e) => detectShake(e, shakeHandler));  
  }

  return [enableShakeToThrow, disableShakeToThrow]
}
  