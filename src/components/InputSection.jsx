import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  ScanText, 
  Camera as CameraIcon, 
  Image as ImageIcon, 
  FileText,
  X,
  RefreshCw,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { preprocessImageForOcr } from '../services/ocrService';
import { getTranslation } from '../data/translations';

// Helper to check if live webcam streaming via getUserMedia is supported in current environment
export function checkCameraStreamSupport() {
  if (typeof window === 'undefined') return { supported: false, reason: 'ssr' };
  
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]';

  // Browsers block getUserMedia on non-secure HTTP origins (e.g. http://172.16.x.x)
  if (!window.isSecureContext && !isLocalhost) {
    return {
      supported: false,
      reason: 'insecure_origin',
      message: 'HTTP network origins block live webcam streams. Native device camera is active.'
    };
  }

  if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return {
      supported: false,
      reason: 'not_supported',
      message: 'Browser environment does not support getUserMedia streaming.'
    };
  }

  return { supported: true, reason: null, message: null };
}

// In-App Live Camera Viewfinder Modal with Automatic Fallback
function LiveCameraScanner({ isOpen, onClose, onCapture, language }) {
  const t = getTranslation(language);
  const videoRef = useRef(null);
  const modalNativeCameraRef = useRef(null);
  const modalGalleryRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [facingMode, setFacingMode] = useState('environment'); // rear camera by default

  useEffect(() => {
    if (!isOpen) return;

    let activeStream = null;
    let isCancelled = false;

    const startCamera = async () => {
      setCameraError('');
      
      const check = checkCameraStreamSupport();
      if (!check.supported) {
        setCameraError(t.cameraFallbackDesc || check.message);
        return;
      }

      try {
        const constraints = {
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (isCancelled) {
          mediaStream.getTracks().forEach(track => track.stop());
          return;
        }

        activeStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.warn('Live camera error safely handled:', err);
        const errMsg = err.name === 'NotAllowedError'
          ? t.cameraPermissionDenied
          : (err.message || t.cameraPermissionDenied);
        setCameraError(errMsg);
      }
    };

    startCamera();

    return () => {
      isCancelled = true;
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, facingMode, language]);

  const handleCaptureFrame = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      onCapture(dataUrl);
    } catch (err) {
      console.error('Frame capture error:', err);
    }
  };

  const handleFlipCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  // Handle native file fallback within modal
  const handleModalNativeCapture = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        handleClose();
        onCapture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 backdrop-blur-md">
      {/* Hidden native input for instant fallback within modal */}
      <input
        type="file"
        ref={modalNativeCameraRef}
        onChange={handleModalNativeCapture}
        accept="image/*"
        capture="environment"
        className="hidden"
        id="modal-native-camera-input"
      />
      <input
        type="file"
        ref={modalGalleryRef}
        onChange={handleModalNativeCapture}
        accept="image/*"
        className="hidden"
        id="modal-gallery-input"
      />

      {/* Top Controls */}
      <div className="w-full max-w-[430px] flex items-center justify-between text-white py-2">
        <button
          type="button"
          onClick={handleClose}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
          <CameraIcon className="w-4 h-4" />
          <span>{cameraError ? t.cameraFallbackTitle : t.openLiveCamera}</span>
        </span>

        {!cameraError ? (
          <button
            type="button"
            onClick={handleFlipCamera}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition"
            title={t.flipCamera}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {/* Viewfinder Window OR Fallback Card */}
      <div className="w-full max-w-[400px] flex-1 relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900 border-2 border-teal-500/40 my-2">
        {cameraError ? (
          /* Automatically Hide Live Video and Show User-Friendly Native Fallback */
          <div className="p-6 text-center text-white space-y-4 max-w-sm">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center mx-auto shadow-lg">
              <Smartphone className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-teal-200">
                {t.cameraFallbackTitle}
              </h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                {cameraError}
              </p>
            </div>

            {/* Seamless One-Click Fallback Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => modalNativeCameraRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-500/30 cursor-pointer transition"
              >
                <CameraIcon className="w-4 h-4" />
                <span>{t.snapWithNativeCamera}</span>
              </button>

              <button
                type="button"
                onClick={() => modalGalleryRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-slate-200 font-semibold text-xs rounded-xl cursor-pointer transition"
              >
                <ImageIcon className="w-4 h-4 text-teal-300" />
                <span>{t.chooseFromDevice}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer pt-2"
            >
              {t.cancel}
            </button>
          </div>
        ) : (
          /* Live Stream Video Viewfinder */
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Document Guide Frame Overlay */}
            <div className="absolute inset-4 border-2 border-dashed border-teal-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
              <span className="text-[10px] bg-black/60 text-teal-300 font-bold px-2 py-0.5 rounded self-center shadow">
                {t.cameraInstruction}
              </span>
              <div className="flex justify-between w-full opacity-60">
                <div className="w-4 h-4 border-b-2 border-l-2 border-teal-400" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-teal-400" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Shutter Action Button (Only shown during active stream) */}
      <div className="w-full max-w-[430px] flex items-center justify-center py-4">
        {!cameraError && (
          <button
            type="button"
            onClick={handleCaptureFrame}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 active:scale-95 text-white font-extrabold text-sm rounded-full shadow-lg shadow-teal-500/40 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
            <span>{t.capturePhoto}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function InputSection({
  selectedReport,
  onFileUpload,
  isProcessing,
  ocrProgress,
  language
}) {
  const t = getTranslation(language);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [cameraSupport, setCameraSupport] = useState(() => checkCameraStreamSupport());

  // Input refs
  const nativeCameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCameraSupport(checkCameraStreamSupport());
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
    try {
      e.target.value = '';
    } catch (ignore) {}
  };

  // Safely process and downscale image file
  const processFile = async (file) => {
    if (!file) return;
    const name = file.name || `doc_${Date.now()}.jpg`;
    setUploadedFileName(name);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const rawDataUrl = reader.result;
          const optimizedDataUrl = await preprocessImageForOcr(rawDataUrl);
          onFileUpload(file, optimizedDataUrl);
        } catch (compErr) {
          console.warn('Preprocessing fallback:', compErr);
          onFileUpload(file, reader.result);
        }
      };
      reader.onerror = (err) => console.error('FileReader error:', err);
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('processFile error:', err);
    }
  };

  // Handle live in-app capture
  const handleLiveCameraCapture = async (dataUrl) => {
    setIsLiveCameraOpen(false);
    const fileName = `camera_prescription_${Date.now()}.jpg`;
    setUploadedFileName(fileName);
    const optimized = await preprocessImageForOcr(dataUrl);
    onFileUpload({ name: fileName, type: 'image/jpeg' }, optimized);
  };

  // Robust Camera Trigger:
  // If live getUserMedia stream is supported (secure context or localhost), open LiveCameraScanner.
  // If on non-secure HTTP origin (e.g. http://172.16.x.x) or mediaDevices is unsupported,
  // automatically trigger the native file picker with capture="environment" without crashing or blocking!
  const handleTakePhotoClick = () => {
    const check = checkCameraStreamSupport();
    if (!check.supported) {
      console.log('[Camera] Live stream not supported on this origin, falling back to native camera picker.');
      nativeCameraInputRef.current?.click();
    } else {
      setIsLiveCameraOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 transition-all">
      {/* Live In-App Camera Viewfinder with Fallback */}
      <LiveCameraScanner
        isOpen={isLiveCameraOpen}
        onClose={() => setIsLiveCameraOpen(false)}
        onCapture={handleLiveCameraCapture}
        language={language}
      />

      {/* Native Camera Fallback Input with capture="environment" */}
      <input
        type="file"
        ref={nativeCameraInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        capture="environment"
        className="hidden"
        id="native-camera-fallback-input"
      />

      {/* Gallery File Input */}
      <input
        type="file"
        ref={galleryInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
        id="gallery-file-input"
      />

      {/* Generic File/PDF Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*,.pdf"
        className="hidden"
        id="file-upload-input"
      />

      {/* Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <span className="flex h-6 w-6 rounded-lg bg-teal-100 text-teal-700 items-center justify-center font-bold text-xs">
          1
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            {t.uploadTitle}
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {t.uploadSubtitle}
          </p>
        </div>
      </div>

      {/* Notice when running on HTTP origin (LAN IP) */}
      {!cameraSupport.supported && (
        <div className="mt-2.5 px-3 py-1.5 bg-teal-50/80 border border-teal-200/70 rounded-xl text-[11px] text-teal-800 flex items-center gap-2">
          <Smartphone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="truncate">{t.cameraFallbackNotice}</span>
        </div>
      )}

      {/* Primary Action: Take Photo (Smart fallback to native camera when stream is unavailable) */}
      <div className="mt-3">
        <button
          type="button"
          onClick={handleTakePhotoClick}
          id="btn-take-photo"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-md shadow-teal-600/20 transition cursor-pointer"
        >
          <CameraIcon className="w-5 h-5" />
          <span>{t.takePhoto}</span>
        </button>
      </div>

      {/* Secondary Actions: Gallery & Files */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          id="btn-choose-gallery"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.98] text-slate-700 rounded-xl font-semibold text-xs transition cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-teal-600" />
          <span className="truncate">{t.chooseGallery}</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          id="btn-browse-files"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.98] text-slate-700 rounded-xl font-semibold text-xs transition cursor-pointer"
        >
          <FileText className="w-4 h-4 text-teal-600" />
          <span className="truncate">{t.browseFiles}</span>
        </button>
      </div>

      {/* Drag & Drop Zone */}
      <div className="mt-3">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => galleryInputRef.current?.click()}
          className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center relative min-h-[90px] ${
            isDragOver
              ? 'border-teal-500 bg-teal-50/60'
              : 'border-slate-300 hover:border-teal-400 bg-slate-50/60'
          }`}
        >
          <UploadCloud className="w-6 h-6 text-teal-600 mb-1" />
          <p className="text-xs font-semibold text-slate-700">
            {t.dragDropText}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {t.dragDropSubtext}
          </p>

          {uploadedFileName && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-medium max-w-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{uploadedFileName}</span>
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center z-10 p-4">
              <div className="w-7 h-7 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-slate-800 mt-2 flex items-center gap-1.5">
                <ScanText className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                {ocrProgress?.message || t.analyzingDoc}
              </p>
              {ocrProgress?.progress > 0 && (
                <div className="w-36 bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-teal-600 h-full transition-all duration-300"
                    style={{ width: `${ocrProgress.progress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
