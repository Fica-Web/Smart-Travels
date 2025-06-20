import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
import { toast } from 'react-toastify';
import { getCroppedImg } from '../../utils/cropImage'; // Import the utility function

const CoverImageUpload = ({
  onImageChange,
  onCroppedImage,
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
      // Validate image type
      if (!file.type.startsWith('image/')) {
        onImageChange(null); // Important to clear previous valid file
        return toast.error("Only image files are allowed");
      }

      // Validate size
      if (file.size > 2 * 1024 * 1024) {
        onImageChange(null);
        return toast.error("File size must be less than 2MB");
      }

      // If validation passes, send to parent and open crop modal
      onImageChange(file); // This is needed to set state in parent correctly
      const previewUrl = URL.createObjectURL(file);
      setImageSrc(previewUrl);
      setShowCropModal(true);
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
        onCroppedImage(file); // Pass the cropped image to the parent component
        setPreview(URL.createObjectURL(file));
        setShowCropModal(false);
      } catch (error) {
        console.error("Error cropping image", error);
      } finally {
        setLoading(false);  // Hide loading indicator after cropping
      }
    }
  };

  return (
    <div className="mb-1">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border border-gray-300 file:bg-gray-900 file:px-3 file:py-1 file:rounded-xl file:text-gray-200 cursor-pointer p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {preview && (
        <div className="relative mt-3 inline-block w-48 h-32 rounded-lg shadow-md overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-1 right-1 bg-white text-gray-700 hover:bg-gray-100 rounded-full p-1 shadow"
            aria-label="Remove image"
          >
            &times;
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Crop Modal */}
      <Modal
        isOpen={showCropModal}
        onRequestClose={() => setShowCropModal(false)}
        ariaHideApp={false}
        className="fixed inset-0 z-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-transparent z-40"
      >
        <div className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-6 w-[90vw] max-w-4xl max-h-[90vh] overflow-auto">
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={handleZoomChange}
              onCropComplete={handleCropComplete}
            />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
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
              {loading ? 'Cropping...' : 'Crop & Save'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default CoverImageUpload;
