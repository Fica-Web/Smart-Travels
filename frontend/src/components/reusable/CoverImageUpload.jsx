import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/cropImage'; // Import the utility function

const CoverImageUpload = ({
  onImageChange,
  coverImagePreview,
  error,
  label = "Cover Image"
}) => {
  const [preview, setPreview] = useState(coverImagePreview || null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const maxZoom = 3; // Max zoom limit
  const minZoom = 1; // Min zoom limit

  useEffect(() => {
    if (coverImagePreview) {
      setPreview(coverImagePreview);
    }
  }, [coverImagePreview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageSrc(previewUrl); // Set the image source to start cropping
      setShowCropModal(true); // Open the crop modal
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setImageSrc(null);
    onImageChange(null);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleZoomChange = (zoom) => {
    if (zoom < minZoom) zoom = minZoom;
    if (zoom > maxZoom) zoom = maxZoom;
    setZoom(zoom);
  };

  const handleCropConfirm = async () => {
    if (croppedAreaPixels) {
      setLoading(true);  // Show loading indicator
      try {
        const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        onImageChange(file); // Pass the cropped image to the parent component
        setPreview(URL.createObjectURL(file));
        setShowCropModal(false);
        console.log("Cropping success");
      } catch (error) {
        console.error("Error cropping image", error);
      } finally {
        setLoading(false);  // Hide loading indicator after cropping
      }
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {preview && (
        <div className="relative mt-3 inline-block max-w-xs rounded-lg shadow-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-48 rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white text-gray-700 hover:bg-gray-100 rounded-full p-1 shadow-md"
            aria-label="Remove image"
          >
            X
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Crop Modal */}
      <Modal
        isOpen={showCropModal}
        onRequestClose={() => setShowCropModal(false)}
        ariaHideApp={false}
        className="fixed inset-0 bg-white z-50 flex justify-center items-center p-4 overflow-auto max-w-3xl mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={handleZoomChange} // Use the updated zoom handler
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="flex justify-between mt-4 space-x-4">
          <button
            onClick={() => setShowCropModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCropConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-500"
          >
            {loading ? 'Cropping...' : 'Crop & Save'} {/* Show loading text */}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CoverImageUpload;
