// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Register from './pages/Register'
// import Login from './pages/Login'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import Detection from './pages/Detection'
// import History from './pages/History'
// import About from './pages/About'
// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
//         <Navbar />
//         <Register />
//         <Login />
        
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/detect" element={<Detection />} />
//           <Route path="/history" element={<History />} />
//           <Route path="/about" element={<About />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detection from './pages/Detection';
import History from './pages/History';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Loader3D from './components/Loader3D';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  console.log('App render - isLoading:', isLoading);

  useEffect(() => {
    // Check if we should skip the loader (only in development)
    const skipLoader = import.meta.env.DEV && window.location.search.includes('skiploader');
    
    if (skipLoader) {
      // Skip loader only in development with ?skiploader
      setIsLoading(false);
    }
    // Note: Removed hasSeenLoader check - loader will show every time
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Removed localStorage - loader will show every time for better UX
  };

  if (isLoading) {
    return <Loader3D onLoadComplete={handleLoadComplete} />;
  }
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar />
        <Routes>
          {/* Public Routes */} 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detection />} />
           <Route path="/history" element={<History />} />
           <Route path="/about" element={<About />} />

          {/* Protected Routes */}
          {/* <Route path="/detect" element={<PrivateRoute><Detection /></PrivateRoute>}/>
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>}/> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
