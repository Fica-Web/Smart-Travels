// src/utils/cropImage.js
export const getCroppedImg = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = 'anonymous';  // Required if image comes from a different domain
      image.onload = () => {
        // Check if croppedAreaPixels is valid
        if (!croppedAreaPixels || croppedAreaPixels.width <= 0 || croppedAreaPixels.height <= 0) {
          reject(new Error('Invalid cropping area'));
          return;
        }
  
        const canvas = document.createElement('canvas');
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext('2d');
  
        // Draw the cropped area from the original image to the canvas
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
  
        // Convert canvas content to a blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Blob creation failed'));
            } else {
              resolve(blob);  // Resolving the blob to be used for further processing
            }
          },
          'image/jpeg',
          0.85  // Quality setting for jpeg (between 0 and 1)
        );
      };
  
      // Handling errors with image loading
      image.onerror = () => {
        reject(new Error('Image failed to load'));
      };
    });
  };
  