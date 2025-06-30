
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff, Mail, Lock, Person } from "@mui/icons-material";
import axios from "axios";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setIsError(true);
      setSnackbarMessage("Passwords do not match!");
      setOpenSnackbar(true);
      return;
    }

    if (!selectedFile) {
      setIsError(true);
      setSnackbarMessage("Please upload a face image.");
      setOpenSnackbar(true);
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("faceImage", selectedFile);

      const res = await axios.post("http://localhost:8080/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data?.id) {
        setIsError(false);
        setSnackbarMessage("Signup successful! Redirecting to login...");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/loginpage"), 2000);
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setIsError(true);
      setSnackbarMessage(
        error.response?.data || "Something went wrong during signup."
      );
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mt-20">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600 mb-6">Sign up to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              placeholder="Name"
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '44px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" color="action" />
                  </InputAdornment>
                ),
                sx: { backgroundColor: "white" }
              }}
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              placeholder="Email"
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '44px',
                  marginTop: '8px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail fontSize="small" color="action" />
                  </InputAdornment>
                ),
                sx: { backgroundColor: "white" }
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              placeholder="Password"
              variant="outlined"
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '44px',
                  marginTop: '8px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { backgroundColor: "white" }
              }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              placeholder="Confirm Password"
              variant="outlined"
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '44px',
                  marginTop: '8px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { backgroundColor: "white" }
              }}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match"
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <TextField
              type="file"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: '44px',
                  marginTop: '8px',
                  marginBottom: '8px'
                }
              }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#00AEEF",
                borderRadius: '12px',
                height: '44px',
                '&:hover': {
                  backgroundColor: '#0085FF',
                  boxShadow: '0 4px 12px rgba(0, 174, 239, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </div>

        {/* Right side - Branding */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">OddTech</h2>
            <h3 className="text-3xl font-semibold mb-4">Solutions</h3>
            <p className="text-lg font-semibold mb-2">Build. Track. Achieve.</p>
            <p className="text-sm">Empowering your work with speed and clarity.</p>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}



// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import axios from "axios";

// export default function SignUp() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const password = watch("password");

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const toBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = reject;
//     });

//   const onSubmit = async (data) => {
//     if (data.password !== data.confirmPassword) {
//       setIsError(true);
//       setSnackbarMessage("Passwords do not match!");
//       setOpenSnackbar(true);
//       return;
//     }

//     if (!selectedFile) {
//       setIsError(true);
//       setSnackbarMessage("Please upload a face image.");
//       setOpenSnackbar(true);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("email", data.email);
//       formData.append("password", data.password);
//       formData.append("faceImage", selectedFile); // ✅ This matches your controller

//       const res = await axios.post("http://localhost:8080/api/auth/signup", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.status === 201) {
//         setIsError(false);
//         setSnackbarMessage("Signup successful! Redirecting...");
//         setOpenSnackbar(true);
//         setTimeout(() => navigate("/loginpage"), 2000);
//       } else {
//         throw new Error("Signup failed.");
//       }
//     } catch (error) {
//       setIsError(true);
//       setSnackbarMessage(
//         error.response?.data || "Something went wrong during signup."
//       );
//       setOpenSnackbar(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-100 to-pink-100">
//       <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mt-20">
//         <div className="w-full md:w-1/2 p-10">
//           <h2 className="text-3xl font-bold mb-2">Create Account</h2>
//           <p className="text-gray-600 mb-6">Sign up to get started</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 ">
//             <div className="mb-3">
//               <TextField
//                 label="Name"
//                 variant="outlined"

//                 fullWidth
//                 InputProps={{ sx: { backgroundColor: "white" } }}
//                 {...register("name", { required: "Name is required" })}
//                 error={!!errors.name}
//                 helperText={errors.name?.message}
//               />
//             </div>
//             <div className="mb-3">
//               <TextField
//                 label="Email"
//                 variant="outlined"
//                 fullWidth

//                 InputProps={{ sx: { backgroundColor: "white" } }}
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address"
//                   }
//                 })}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//               />
//             </div>
//             <div className="mb-3">
//               <TextField
//                 label="Password"
//                 variant="outlined"
//                 fullWidth
//                 type={showPassword ? "text" : "password"}
//                 InputProps={{
//                   sx: { backgroundColor: "white" },
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={togglePasswordVisibility}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters"
//                   }
//                 })}
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />
//             </div>
//             <div className="mb-3">
//               <TextField
//                 label="Confirm Password"
//                 variant="outlined"
//                 fullWidth
//                 type={showPassword ? "text" : "password"}
//                 InputProps={{
//                   sx: { backgroundColor: "white" },
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={togglePasswordVisibility}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//                 {...register("confirmPassword", {
//                   required: "Please confirm your password",
//                   validate: (value) =>
//                     value === password || "Passwords do not match"
//                 })}
//                 error={!!errors.confirmPassword}
//                 helperText={errors.confirmPassword?.message}
//               />
//             </div>
//             <div className="mb-3">
//               {/* Image Upload */}
//               <TextField
//                 type="file"
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 inputProps={{ accept: "image/*" }}
//                 onChange={(e) => setSelectedFile(e.target.files[0])}
//               />

//             </div>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 backgroundColor: "#dc2626",
//                 "&:hover": { backgroundColor: "#b91c1c" }
//               }}
//               disabled={isLoading}
//             >
//               {isLoading ? "Creating account..." : "Sign Up"}
//             </Button>
//           </form>
//         </div>

//         {/* Right side - Branding */}
//         <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-black via-red-600 to-orange-500 text-white items-center justify-center p-10">
//           <div className="text-center">
//             <h2 className="text-4xl font-bold mb-2">OddTech</h2>
//             <h3 className="text-3xl font-semibold mb-4">Solutions</h3>
//             <p className="text-lg font-semibold mb-2">Build. Track. Achieve.</p>
//             <p className="text-sm">Empowering your work with speed and clarity.</p>
//           </div>
//         </div>
//       </div>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={isError ? "error" : "success"}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }
