'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Bottle3DProps {
  scrollProgress?: number;
  liquidColor?: string;
  interactive?: boolean;
  className?: string;
}

export default function Bottle3D({
  scrollProgress = 0,
  liquidColor = '#E8A856',
  interactive = true,
  className = '',
}: Bottle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const keyLightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);

  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
    scene.add(ambientLight);

    // Main Warm Key Light
    const keyLight = new THREE.PointLight(0xffd59e, 35, 10);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Rim / Backlight for Glass Refraction
    const rimLight = new THREE.PointLight(0xffaa44, 30, 10);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Soft Overhead Fill
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(0, 5, 2);
    scene.add(fillLight);

    // 4. Bottle Architecture Group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;

    // A. Outer Glass Flask
    const glassGeometry = new THREE.BoxGeometry(1.6, 2.2, 0.9, 4, 4, 4);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 1.2,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.y = -0.1;
    bottleGroup.add(glassMesh);

    // B. Inner Glowing Perfume Liquid
    const liquidGeometry = new THREE.BoxGeometry(1.42, 1.85, 0.75, 4, 4, 4);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(liquidColor),
      transmission: 0.55,
      opacity: 0.88,
      transparent: true,
      roughness: 0.12,
      ior: 1.38,
      thickness: 1.0,
      emissive: new THREE.Color(liquidColor),
      emissiveIntensity: 0.18,
    });
    liquidMaterialRef.current = liquidMaterial;
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = -0.25;
    bottleGroup.add(liquidMesh);

    // C. Gold Collar / Neck Ring
    const neckGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.35, 32);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18,
    });
    const neckMesh = new THREE.Mesh(neckGeometry, goldMaterial);
    neckMesh.position.y = 1.15;
    bottleGroup.add(neckMesh);

    // D. Crystal Square Faceted Cap
    const capGeometry = new THREE.BoxGeometry(0.85, 0.7, 0.7);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      transparent: true,
      roughness: 0.03,
      ior: 1.54,
      reflectivity: 0.95,
      clearcoat: 1.0,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.position.y = 1.65;
    bottleGroup.add(capMesh);

    // Inner gold tube inside the clear cap
    const capInnerTube = new THREE.CylinderGeometry(0.18, 0.18, 0.6, 24);
    const innerTubeMesh = new THREE.Mesh(capInnerTube, goldMaterial);
    innerTubeMesh.position.y = 1.65;
    bottleGroup.add(innerTubeMesh);

    // E. Label Texture Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#F5EBDD';
      ctx.fillRect(0, 0, 512, 256);
      ctx.strokeStyle = '#B38A45';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, 480, 224);

      ctx.fillStyle = '#24160F';
      ctx.font = 'bold 36px "Cormorant Garamond", serif';
      ctx.textAlign = 'center';
      ctx.fillText('P R A H A R', 256, 95);

      ctx.fillStyle = '#B96A2D';
      ctx.font = '28px serif';
      ctx.fillText('प्रहर', 256, 140);

      ctx.fillStyle = '#B38A45';
      ctx.font = '14px monospace';
      ctx.fillText('EAU DE PARFUM • 50 ML', 256, 185);
    }
    const labelTexture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      opacity: 0.94,
    });
    const labelGeometry = new THREE.PlaneGeometry(1.05, 0.6);
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.set(0, -0.15, 0.46);
    bottleGroup.add(labelMesh);

    // 5. Floating Musical Particles & Golden Stardust
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds[i] = 0.2 + Math.random() * 0.6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd6b77c,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse Interaction Handlers
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mousePos.current.targetX = normX;
      mousePos.current.targetY = normY;

      if (isDragging.current) {
        const deltaX = clientX - dragStart.current.x;
        const deltaY = clientY - dragStart.current.y;
        manualRotation.current.y += deltaX * 0.01;
        manualRotation.current.x += deltaY * 0.01;
        dragStart.current = { x: clientX, y: clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStart.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    if (interactive) {
      container.addEventListener('mousemove', handlePointerMove);
      container.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mouseup', handlePointerUp);
      container.addEventListener('touchmove', handlePointerMove);
      container.addEventListener('touchstart', handlePointerDown);
      window.addEventListener('touchend', handlePointerUp);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Animate Bottle
      if (bottleGroup) {
        // Subtle natural floating levitation
        bottleGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

        // Base idle rotation + mouse tilt + manual drag
        const autoRotate = Math.sin(elapsedTime * 0.8) * 0.15;
        bottleGroup.rotation.y =
          autoRotate + mousePos.current.x * 0.35 + manualRotation.current.y;
        bottleGroup.rotation.x =
          mousePos.current.y * 0.25 + manualRotation.current.x;

        // Key light tracking
        if (keyLightRef.current) {
          keyLightRef.current.position.x = 3 + Math.sin(elapsedTime) * 1.2;
          keyLightRef.current.position.y = 4 + Math.cos(elapsedTime) * 0.8;
        }
      }

      // Animate Particles
      const posAttr = particleGeometry.attributes.position;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.003;
        posArray[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.002;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('mousedown', handlePointerDown);
        window.removeEventListener('mouseup', handlePointerUp);
        container.removeEventListener('touchmove', handlePointerMove);
        container.removeEventListener('touchstart', handlePointerDown);
        window.removeEventListener('touchend', handlePointerUp);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive]);

  // Update liquid color dynamically when raga changes
  useEffect(() => {
    if (liquidMaterialRef.current) {
      const color = new THREE.Color(liquidColor);
      liquidMaterialRef.current.color = color;
      liquidMaterialRef.current.emissive = color;
    }
    if (rimLightRef.current) {
      rimLightRef.current.color = new THREE.Color(liquidColor);
    }
  }, [liquidColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Click and drag to rotate the 3D PRAHAR vessel"
    />
  );
}
