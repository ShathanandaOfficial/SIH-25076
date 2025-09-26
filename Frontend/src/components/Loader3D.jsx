import React, { useEffect, useRef, useState } from 'react';
import './Loader3D.css';

const Loader3D = ({ onLoadComplete }) => {
  const canvasContainerRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  
  console.log('Loader3D mounted, onLoadComplete:', !!onLoadComplete);
  const [stats, setStats] = useState({
    farmersHelped: 2847,
    cropsAnalyzed: 15230,
    questionsAnswered: 45672
  });
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Track start time to ensure minimum loading duration
  const startTimeRef = useRef(Date.now());
  const isFastMode = new URLSearchParams(window.location.search).has('fastload');

  const loadingMessages = [
    "Initializing 3D Environment...",
    "Growing digital crops...",
    "Setting up weather systems...",
    "Loading AI knowledge base...",
    "Connecting to satellite data...",
    "Preparing crop disease database...",
    "Calibrating precision sensors...",
    "Loading market analytics...",
    "Training neural networks...",
    "Syncing with agricultural experts...",
    "Optimizing farming algorithms...",
    "Connecting to IoT devices...",
    "Loading historical weather data...",
    "Preparing recommendation engine...",
    "Finalizing system integration...",
    "Ready to revolutionize farming!"
  ];

  const loadThreeJS = () => {
    console.log('Loading Three.js...');
    
    return new Promise((resolve, reject) => {
      // Check if Three.js is already loaded
      if (window.THREE) {
        console.log('Three.js already loaded globally');
        resolve(window.THREE);
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="three.min.js"]');
      if (existingScript) {
        console.log('Three.js script already exists, waiting for load...');
        if (window.THREE) {
          resolve(window.THREE);
          return;
        }
        
        // Wait for existing script to load
        existingScript.addEventListener('load', () => {
          console.log('Existing Three.js script loaded');
          resolve(window.THREE);
        });
        existingScript.addEventListener('error', reject);
        return;
      }

      // Create new script
      console.log('Creating new Three.js script...');
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        console.log('Three.js loaded successfully');
        resolve(window.THREE);
      };
      script.onerror = () => {
        console.error('Failed to load Three.js');
        reject(new Error('Failed to load Three.js'));
      };
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    const init3DScene = (THREE) => {
      if (!THREE || !canvasContainerRef.current) return;
      
      // Scene setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x6ba385, 10, 100);

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 8, 15);
      camera.lookAt(0, 0, 0);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      canvasContainerRef.current.appendChild(renderer.domElement);

      // Create scene elements
      createLighting(scene, THREE);
      createGround(scene, THREE);
      const windmill = createWindmill(scene, THREE);
      const crops = createCrops(scene, THREE);
      createSun(scene, THREE);
      const clouds = createClouds(scene, THREE);
      createTrees(scene, THREE);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Rotate windmill
        if (windmill) {
          windmill.rotation.z += 0.02;
        }

        // Animate crops swaying
        crops.forEach((crop, index) => {
          crop.rotation.z = Math.sin(time * 2 + index) * 0.1;
        });

        // Move clouds
        clouds.forEach((cloud) => {
          cloud.position.x += 0.02;
          if (cloud.position.x > 25) cloud.position.x = -25;
        });

        // Camera orbit
        camera.position.x = Math.cos(time * 0.1) * 15;
        camera.position.z = Math.sin(time * 0.1) * 15;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (canvasContainerRef.current && renderer.domElement.parentNode) {
          canvasContainerRef.current.removeChild(renderer.domElement);
        }
      };
    };

    // Load Three.js and initialize scene
    loadThreeJS()
      .then((THREE) => {
        console.log('Three.js loaded, initializing scene...');
        init3DScene(THREE);
      })
      .catch((error) => {
        console.error('Failed to load Three.js:', error);
        // Continue without 3D scene
      });

    // Start loading progression
    const loadingInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < loadingMessages.length - 1) {
          const next = prev + 1;
          setProgress(((next + 1) / loadingMessages.length) * 100);
          return next;
        } else {
          clearInterval(loadingInterval);
          
          // Ensure minimum loading time (20 seconds normal, 5 seconds fast mode)
          const elapsedTime = Date.now() - startTimeRef.current;
          const minLoadingTime = isFastMode ? 5000 : 20000; // 5 or 20 seconds
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
          
          setTimeout(() => {
            setIsCompleting(true);
            // Add fade out effect before completing
            setTimeout(() => {
              if (onLoadComplete) onLoadComplete();
            }, 1000);
          }, remainingTime + 3000); // Additional 3 seconds after messages complete
          return prev;
        }
      });
    }, isFastMode ? 600 : 1800); // Faster progression in fast mode

    // Animate stats
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        farmersHelped: prev.farmersHelped + Math.floor(Math.random() * 5) + 1,
        cropsAnalyzed: prev.cropsAnalyzed + Math.floor(Math.random() * 8) + 2,
        questionsAnswered: prev.questionsAnswered + Math.floor(Math.random() * 12) + 3
      }));
    }, 1500);

    // Cleanup
    return () => {
      clearInterval(loadingInterval);
      clearInterval(statsInterval);
      // Note: Script cleanup is handled by browser when component unmounts
    };
  }, [onLoadComplete, loadingMessages.length, isFastMode]);

  // Helper functions for 3D scene creation
  const createLighting = (scene, THREE) => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 15, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);
  };

  const createGround = (scene, THREE) => {
    const groundGeometry = new THREE.PlaneGeometry(50, 50, 32, 32);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x3a5f3a,
      transparent: true,
      opacity: 0.9 
    });
    
    const vertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i + 2] = Math.random() * 0.5;
    }
    groundGeometry.attributes.position.needsUpdate = true;
    groundGeometry.computeVertexNormals();

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
  };

  const createWindmill = (scene, THREE) => {
    const baseGeometry = new THREE.CylinderGeometry(0.8, 1.2, 8, 8);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(-8, 4, -5);
    base.castShadow = true;
    scene.add(base);

    const bladeGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const bladeGeometry = new THREE.BoxGeometry(0.1, 4, 0.8);
      const bladeMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.position.y = 2;
      blade.rotation.z = (i * Math.PI) / 2;
      bladeGroup.add(blade);
    }
    bladeGroup.position.set(-8, 8, -5);
    scene.add(bladeGroup);

    return bladeGroup;
  };

  const createCrops = (scene, THREE) => {
    const crops = [];
    for (let i = 0; i < 30; i++) {
      const cropGroup = new THREE.Group();
      
      const stemGeometry = new THREE.CylinderGeometry(0.05, 0.08, 1.5, 6);
      const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 0.75;
      cropGroup.add(stem);

      for (let j = 0; j < 3; j++) {
        const leafGeometry = new THREE.SphereGeometry(0.3, 6, 6);
        const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x32CD32 });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(
          Math.random() * 0.4 - 0.2,
          1 + j * 0.3,
          Math.random() * 0.4 - 0.2
        );
        leaf.scale.set(0.5, 0.3, 0.5);
        cropGroup.add(leaf);
      }

      cropGroup.position.set(
        (Math.random() - 0.5) * 20,
        0,
        (Math.random() - 0.5) * 20
      );
      cropGroup.castShadow = true;
      crops.push(cropGroup);
      scene.add(cropGroup);
    }
    return crops;
  };

  const createSun = (scene, THREE) => {
    const sunGeometry = new THREE.SphereGeometry(2, 16, 16);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFD700,
      transparent: true,
      opacity: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(15, 20, -10);
    scene.add(sun);
    return sun;
  };

  const createClouds = (scene, THREE) => {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      const cloudGroup = new THREE.Group();
      
      for (let j = 0; j < 8; j++) {
        const cloudGeometry = new THREE.SphereGeometry(Math.random() * 1 + 0.5, 6, 6);
        const cloudMaterial = new THREE.MeshLambertMaterial({ 
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0.7
        });
        const cloudPart = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloudPart.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 1,
          (Math.random() - 0.5) * 4
        );
        cloudGroup.add(cloudPart);
      }
      
      cloudGroup.position.set(
        (Math.random() - 0.5) * 40,
        15 + Math.random() * 5,
        (Math.random() - 0.5) * 40
      );
      clouds.push(cloudGroup);
      scene.add(cloudGroup);
    }
    return clouds;
  };

  const createTrees = (scene, THREE) => {
    for (let i = 0; i < 10; i++) {
      const treeGroup = new THREE.Group();
      
      const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
      const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 1.5;
      treeGroup.add(trunk);

      const foliageGeometry = new THREE.SphereGeometry(2, 8, 8);
      const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.y = 3.5;
      foliage.scale.set(1, 0.8, 1);
      treeGroup.add(foliage);

      const angle = (i / 10) * Math.PI * 2;
      treeGroup.position.set(
        Math.cos(angle) * 20,
        0,
        Math.sin(angle) * 20
      );
      treeGroup.castShadow = true;
      scene.add(treeGroup);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-1000 ${isCompleting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* 3D Canvas Container */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-10" />
      
      {/* Background */}
      <div className="loader-bg absolute inset-0 z-0" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
      </div>
      
      {/* Loading Stage */}
      <div className="absolute top-5 right-5 z-30 bg-black bg-opacity-30 px-4 py-2 rounded-lg text-white text-sm opacity-80">
        {loadingMessages[currentMessage]}
      </div>
      
      {/* Main UI Overlay */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
        <div className="bg-black bg-opacity-30 backdrop-blur-xl rounded-3xl p-10 border-2 border-white border-opacity-20 max-w-md w-11/12 mb-12 text-center text-white shadow-2xl">
          <h1 className="text-4xl font-bold mb-3 title-gradient">
            Digital Krishi Officer
          </h1>
          <p className="text-lg mb-8 text-green-200 opacity-90">
            AI-Powered 3D Farming Experience
          </p>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white bg-opacity-10 rounded-full overflow-hidden mb-5 shadow-inner">
            <div
              className="h-full progress-shine rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-fade opacity-80">
            {currentMessage < loadingMessages.length - 1 
              ? loadingMessages[currentMessage]
              : progress >= 100 
                ? "🌾 Welcome to the future of farming! 🌾"
                : "Loading complete! Preparing your experience..."
            }
          </p>
        </div>
      </div>
      
      {/* Stats Container */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-8 bg-black bg-opacity-20 px-8 py-5 rounded-2xl backdrop-blur-md border border-white border-opacity-10 text-white">
        <div className="text-center">
          <span className="block text-2xl font-bold text-white">
            {stats.farmersHelped.toLocaleString()}
          </span>
          <div className="text-xs opacity-70 mt-1 text-green-300">Farmers Helped</div>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-white">
            {stats.cropsAnalyzed.toLocaleString()}
          </span>
          <div className="text-xs opacity-70 mt-1 text-green-300">Crops Analyzed</div>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-white">
            {stats.questionsAnswered.toLocaleString()}
          </span>
          <div className="text-xs opacity-70 mt-1 text-green-300">Questions Answered</div>
        </div>
      </div>
    </div>
  );
};

export default Loader3D;