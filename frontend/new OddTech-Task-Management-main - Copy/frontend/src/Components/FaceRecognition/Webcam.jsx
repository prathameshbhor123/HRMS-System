// import React, { useRef, useEffect, useState } from 'react';

// const WebcamCapture = ({ onCapture }) => {
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//         setIsCameraReady(true);
//       } catch (err) {
//         console.error('Error accessing webcam:', err);
//         alert('Please allow camera access.');
//       }
//     };

//     startCamera();

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const handleCapture = async () => {
//     setIsLoading(true);

//     const video = videoRef.current;
//     if (!video) return;

//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const imageData = canvas.toDataURL('image/jpeg');

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }

//     try {
//       await onCapture(imageData);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="text-center space-y-4">
//       <video ref={videoRef} autoPlay className="rounded-lg w-full max-w-md border" />

//       {isLoading ? (
//         <div className="flex items-center justify-center space-x-3">
//           <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
//           <span className="text-lg font-bold text-white">Processing...</span>
//         </div>
//       ) : (
//         <button
//           onClick={handleCapture}
//           className="bg-white text-red-600 font-semibold py-2 px-6 rounded shadow hover:bg-red-100"
//           disabled={!isCameraReady}
//         >
//           🔒 Login
//         </button>
//       )}
//     </div>
//   );
// };

// export default WebcamCapture;





import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';

const Webcam = React.forwardRef(({ onCapture }, ref) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraError, setCameraError] = useState(false);



  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;

        const interval = setInterval(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsCameraReady(true);
            clearInterval(interval);
          }
        }, 100);
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setCameraError(true);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    stopWebcam
  }));

  const stopWebcam = () => {
    if (streamRef.current) {

      streamRef.current.getTracks().forEach(track => {

        track.stop();
        track.enabled = false; // Additional measure
      });
      videoRef.current.srcObject = null; // Clear video source
      streamRef.current = null;
      setIsCameraReady(false);
    }
  };

  const handleCapture = async () => {
    setIsLoading(true);

    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    try {
      await onCapture(imageData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center space-y-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="rounded-lg w-full max-w-md border"
      />

      {cameraError && (
        <p className="text-red-400 font-medium">❌ Please allow camera access to continue.</p>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-bold text-white">Processing...</span>
        </div>
      ) : (
        <button
          onClick={handleCapture}
          className="bg-white text-red-600 font-semibold py-2 px-6 rounded shadow hover:bg-red-100 transition"
          disabled={!isCameraReady}
        >
          🔒 Login
        </button>
      )}
    </div>
  );
});

export default Webcam;
