
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import WebcamCapture from "./Webcam";
// import { useNavigate } from "react-router-dom";

// // Cosine similarity function for frontend comparison
// const cosineSimilarity = (a, b) => {
//   if (!a || !b || a.length !== b.length) return 0;
//   let dotProduct = 0;
//   let magnitudeA = 0;
//   let magnitudeB = 0;

//   for (let i = 0; i < a.length; i++) {
//     dotProduct += a[i] * b[i];
//     magnitudeA += a[i] * a[i];
//     magnitudeB += b[i] * b[i];
//   }

//   magnitudeA = Math.sqrt(magnitudeA);
//   magnitudeB = Math.sqrt(magnitudeB);

//   return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
// };

// const FaceLogin = ({
//   loggedUser,
//   onSuccess = () => { },
//   onFailure = () => { }
// }) => {
//   const navigate = useNavigate();
//   const [welcomeUser, setWelcomeUser] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [cachedEmbeddings, setCachedEmbeddings] = useState(null);
//   const webcamRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [similarityThreshold] = useState(0.3); // Adjust threshold as needed

//   const fetchCache = useCallback(async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/auth/cache");
//       if (!response.ok) throw new Error("Failed to fetch embeddings");
//       return await response.json();
//     } catch (err) {
//       console.error("❌ Error loading embeddings:", err);
//       throw err;
//     }
//   }, []);

//   useEffect(() => {
//     let isMounted = true;

//     const loadCache = async () => {
//       const start = performance.now();
//       try {
//         const data = await fetchCache();
//         if (isMounted) {
//           setCachedEmbeddings(data);
//           const end = performance.now(); // End time
//           console.log(`✅ Cache loaded in ${(end - start).toFixed(2)} ms`);
//         }
//       } catch (err) {
//         onFailure();
//       }
//     };

//     loadCache();
//     return () => { isMounted = false; };
//   }, [fetchCache, onFailure]);

//   const sendToRecognitionServer = useCallback(async (base64Image) => {
//     if (!loggedUser?.email || !cachedEmbeddings) return;

//     setIsLoading(true);
//     try {
//       // Get current embedding from Python server
//       const embeddingResponse = await fetch("http://localhost:5005/generate-embedding", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: base64Image })
//       });
//       if (!embeddingResponse.ok) throw new Error("Embedding generation failed");
//       const embeddingResult = await embeddingResponse.json();
//       const currentEmbedding = embeddingResult.embedding;

//       // Get cached embedding
//       const cachedUser = cachedEmbeddings.find(u => u.email === loggedUser.email);
//       if (!cachedUser) throw new Error("User not in cache");
//       const cachedEmbedding = cachedUser.embedding;

//       // Compare embeddings in frontend
//       const similarityScore = (cosineSimilarity(currentEmbedding, cachedEmbedding) + 1);
//       console.log(`Similarity score: ${similarityScore}`);

//       if (similarityScore < similarityThreshold) {
//         throw new Error("Face not recognized (low similarity score)");
//       }

//       // Get geolocation (non-blocking)
//       const position = await new Promise(resolve => {
//         navigator.geolocation.getCurrentPosition(
//           resolve,
//           () => resolve({ coords: { latitude: 0, longitude: 0 } }),
//           { timeout: 5000, enableHighAccuracy: true }
//         );
//       });

//       // Send login data to backend
//       const payload = {
//         name: loggedUser.name || "Dhaval",
//         email: loggedUser.email,
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//         photo: base64Image,
//         embedding: currentEmbedding
//       };

//       const loginResponse = await fetch("http://localhost:8080/api/auth/login-by-face", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       if (!loginResponse.ok) throw new Error("Login failed");

//       const loginData = await loginResponse.json();
//       console.log("Login response:", loginData);
//       if (!loginData.name) throw new Error("Invalid response");

//       // Success
//       localStorage.setItem("token", loginData.token); // ✅ Store token
//       localStorage.setItem("username", loginData.name);
//       localStorage.setItem("role", loginData.role);
//       setWelcomeUser(loginData.name);
//       setShowModal(true);
//     } catch (err) {
//       console.error("FaceLogin Error:", err);
//       alert(`Error: ${err.message}`);
//       onFailure();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [loggedUser, cachedEmbeddings, onFailure, similarityThreshold]);

//   const handleModalClose = useCallback(() => {
//     setShowModal(false);
//     onSuccess();
//     navigate("/");
//   }, [onSuccess, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h2 className="font-bold text-4xl text-white mb-4">Face Recognition</h2>

//       {!showModal && (
//         <WebcamCapture ref={webcamRef} onCapture={sendToRecognitionServer} />
//       )}

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
//             <h3 className="text-2xl font-semibold text-green-600 mb-4">
//               🎉 Welcome {welcomeUser}!
//             </h3>
//             <p className="text-gray-700 mb-4">You have successfully logged in.</p>
//             <button
//               onClick={handleModalClose}
//               className="mt-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceLogin;






import React, { useEffect, useState, useRef, useCallback } from "react";
import WebcamCapture from "./Webcam";
import { useNavigate } from "react-router-dom";

// Cosine similarity function for frontend comparison
const cosineSimilarity = (a, b) => {
  if (!a || !b || a.length !== b.length) return 0;
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

const FaceLogin = ({
  loggedUser,
  onSuccess = () => { },
  onFailure = () => { }
}) => {
  const navigate = useNavigate();
  const [welcomeUser, setWelcomeUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cachedEmbeddings, setCachedEmbeddings] = useState(null);
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [similarityThreshold] = useState(0.3); // Adjust threshold as needed

  const fetchCache = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/cache");
      if (!response.ok) throw new Error("Failed to fetch embeddings");
      return await response.json();
    } catch (err) {
      console.error("❌ Error loading embeddings:", err);
      throw err;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCache = async () => {
      const start = performance.now();
      try {
        const data = await fetchCache();
        if (isMounted) {
          setCachedEmbeddings(data);
          const end = performance.now(); // End time
          console.log(`✅ Cache loaded in ${(end - start).toFixed(2)} ms`);
        }
      } catch (err) {
        onFailure();
      }
    };

    loadCache();
    return () => { isMounted = false; };
  }, [fetchCache, onFailure]);

  const sendToRecognitionServer = useCallback(async (base64Image) => {
    if (!loggedUser?.email || !cachedEmbeddings) return;

    setIsLoading(true);
    try {
      // Get current embedding from Python server
      const embeddingResponse = await fetch("http://localhost:5005/generate-embedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image })
      });
      if (!embeddingResponse.ok) throw new Error("Embedding generation failed");
      const embeddingResult = await embeddingResponse.json();
      const currentEmbedding = embeddingResult.embedding;

      // Get cached embedding
      const cachedUser = cachedEmbeddings.find(u => u.email === loggedUser.email);
      if (!cachedUser) throw new Error("User not in cache");
      const cachedEmbedding = cachedUser.embedding;
      const userName = cachedUser.name || loggedUser.name || "User";

      // Compare embeddings in frontend
      const similarityScore = (cosineSimilarity(currentEmbedding, cachedEmbedding) + 1);
      console.log(`Similarity score: ${similarityScore}`);

      if (similarityScore < similarityThreshold) {
        throw new Error("Face not recognized (low similarity score)");
      }

      // Get geolocation (non-blocking)
      const position = await new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          () => resolve({ coords: { latitude: 0, longitude: 0 } }),
          { timeout: 5000, enableHighAccuracy: true }
        );
      });

      // Send login data to backend
      const payload = {
        name: userName,
        email: loggedUser.email,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        photo: base64Image,
        embedding: currentEmbedding
      };

      const loginResponse = await fetch("http://localhost:8080/api/auth/login-by-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!loginResponse.ok) throw new Error("Login failed");

      const loginData = await loginResponse.json();
      console.log("Login response:", loginData);
      if (!loginData.name) throw new Error("Invalid response");

      // Success
      localStorage.setItem("username", loginData.name);
      localStorage.setItem("role", loginData.role);
      setWelcomeUser(userName);
      setShowModal(true);
    } catch (err) {
      console.error("FaceLogin Error:", err);
      alert(`Error: ${err.message}`);
      onFailure();
    } finally {
      setIsLoading(false);
    }
  }, [loggedUser, cachedEmbeddings, onFailure, similarityThreshold]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    onSuccess();
    navigate("/");
  }, [onSuccess, navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold text-4xl text-white mb-4">Face Recognition</h2>

      {!showModal && (
        <WebcamCapture ref={webcamRef} onCapture={sendToRecognitionServer} />
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              🎉 Welcome {welcomeUser}!
            </h3>
            <p className="text-gray-700 mb-4">You have successfully logged in.</p>
            <button
              onClick={handleModalClose}
              className="mt-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceLogin;