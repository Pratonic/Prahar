'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Bottle3DProps {
  scrollProgress?: number;
  liquidColor?: string;
  cameraZoom?: number; // 1.0 = normal, 1.35 = close up, etc.
  rotationAngle?: number; // scroll-driven rotation
  interactive?: boolean;
  className?: string;
}

export default function Bottle3D({
  scrollProgress = 0,
  liquidColor = '#E68A2E',
  cameraZoom = 1.0,
  rotationAngle = 0,
  interactive = true,
  className = '',
}: Bottle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

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

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 5.2);
    cameraRef.current = camera;

    // 2. High-performance WebGL Renderer with Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.85);
    scene.add(ambientLight);

    // Main Golden Key Light (top right frontal)
    const keyLight = new THREE.PointLight(0xffd59e, 40, 15);
    keyLight.position.set(3.5, 4.0, 3.5);
    scene.add(keyLight);

    // Amber Rim Light (back-left for glass edge refraction)
    const rimLight = new THREE.PointLight(0xf59e0b, 35, 12);
    rimLight.position.set(-3.5, 1.0, -3.0);
    scene.add(rimLight);

    // Soft Frontal Fill Light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.4);
    fillLight.position.set(0, 3, 4);
    scene.add(fillLight);

    // Bottom Pedestal Glow
    const bottomGlow = new THREE.PointLight(0xd97706, 25, 8);
    bottomGlow.position.set(0, -2.5, 1);
    scene.add(bottomGlow);

    // 4. Bottle Architecture (Matching user reference image exactly)
    const bottleGroup = new THREE.Group();
    bottleGroup.position.y = -0.15;
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;

    // A. Outer Thick Crystal Glass Body (Square with thick base)
    const glassGeometry = new THREE.BoxGeometry(2.1, 1.95, 1.35, 8, 8, 8);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.52,
      thickness: 1.6,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    bottleGroup.add(glassMesh);

    // Solid Glass Base Block (Thick bottom crystal base seen in photo)
    const solidBaseGeo = new THREE.BoxGeometry(2.02, 0.45, 1.28);
    const solidBaseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      transparent: true,
      roughness: 0.04,
      ior: 1.52,
      thickness: 1.8,
    });
    const solidBaseMesh = new THREE.Mesh(solidBaseGeo, solidBaseMaterial);
    solidBaseMesh.position.y = -0.73;
    bottleGroup.add(solidBaseMesh);

    // B. Inner Glowing Perfume Liquid (Cavity sits above solid base)
    const liquidGeometry = new THREE.BoxGeometry(1.82, 1.32, 1.1, 6, 6, 6);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(liquidColor),
      transmission: 0.65,
      opacity: 0.92,
      transparent: true,
      roughness: 0.08,
      ior: 1.36,
      thickness: 1.15,
      emissive: new THREE.Color(liquidColor),
      emissiveIntensity: 0.22,
    });
    liquidMaterialRef.current = liquidMaterial;
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = 0.08;
    bottleGroup.add(liquidMesh);

    // C. Curved Dip Tube (Extending from pump into liquid corner, exactly as in photo)
    const tubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.72, 0),
      new THREE.Vector3(0.05, 0.35, 0.02),
      new THREE.Vector3(0.14, -0.12, 0.08),
      new THREE.Vector3(0.32, -0.48, 0.14),
    ]);
    const tubeGeometry = new THREE.TubeGeometry(tubeCurve, 32, 0.022, 12, false);
    const tubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      roughness: 0.1,
      transparent: true,
    });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    bottleGroup.add(tubeMesh);

    // D. Gold Collar & Atomizer Nozzle (Polished 24K Gold)
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfb055,
      metalness: 0.95,
      roughness: 0.14,
    });

    // Lower Gold Collar Ring
    const collarGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.22, 36);
    const collarMesh = new THREE.Mesh(collarGeometry, goldMaterial);
    collarMesh.position.y = 1.06;
    bottleGroup.add(collarMesh);

    // Upper Gold Spray Pump Nozzle
    const nozzleGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.38, 36);
    const nozzleMesh = new THREE.Mesh(nozzleGeometry, goldMaterial);
    nozzleMesh.position.y = 1.32;
    bottleGroup.add(nozzleMesh);

    // Tiny Spray Hole Orifice
    const orificeGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.08, 16);
    orificeGeo.rotateX(Math.PI / 2);
    const orificeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const orificeMesh = new THREE.Mesh(orificeGeo, orificeMat);
    orificeMesh.position.set(0, 1.38, 0.32);
    bottleGroup.add(orificeMesh);

    // E. Clear Faceted Crystal Square Cap (As shown in user photo)
    const capGeometry = new THREE.BoxGeometry(1.08, 0.85, 0.95, 4, 4, 4);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      transparent: true,
      roughness: 0.02,
      ior: 1.54,
      reflectivity: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.position.y = 1.78;
    bottleGroup.add(capMesh);

    // Inner gold tube showing through the crystal cap
    const capInnerTube = new THREE.CylinderGeometry(0.24, 0.24, 0.55, 24);
    const innerTubeMesh = new THREE.Mesh(capInnerTube, goldMaterial);
    innerTubeMesh.position.y = 1.68;
    bottleGroup.add(innerTubeMesh);

    // F. Direct Glass-Etched Gold Branding (No ugly paper label)
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 256;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 512, 256);

      // Gold Foil Metallic Branding
      ctx.fillStyle = '#D6B77C';
      ctx.font = '600 38px "Cormorant Garamond", serif';
      ctx.textAlign = 'center';
      ctx.fillText('P R A H A R', 256, 110);

      ctx.fillStyle = '#F5EBDD';
      ctx.font = '28px serif';
      ctx.fillText('प्रहर', 256, 155);

      ctx.fillStyle = 'rgba(214, 183, 124, 0.75)';
      ctx.font = '13px monospace';
      ctx.letterSpacing = '3px';
      ctx.fillText('HAUTE PARFUM • 50 ML', 256, 195);
    }
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      opacity: 0.88,
    });
    const labelGeometry = new THREE.PlaneGeometry(1.4, 0.7);
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.set(0, 0.1, 0.69);
    bottleGroup.add(labelMesh);

    // 5. Subtle Ambient Stardust
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd6b77c,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Interaction Handlers
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
      container.addEventListener('touchmove', handlePointerMove, { passive: true });
      container.addEventListener('touchstart', handlePointerDown, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      if (bottleGroup) {
        // Natural gentle levitation
        bottleGroup.position.y = -0.15 + Math.sin(elapsedTime * 1.4) * 0.06;

        // Base rotation + mouse tilt + scroll rotation + drag
        const autoRotate = Math.sin(elapsedTime * 0.6) * 0.1;
        bottleGroup.rotation.y =
          autoRotate +
          rotationAngle +
          mousePos.current.x * 0.35 +
          manualRotation.current.y;
        bottleGroup.rotation.x =
          mousePos.current.y * 0.2 + manualRotation.current.x;

        // Dynamic light shimmer
        keyLight.position.x = 3.5 + Math.sin(elapsedTime * 0.8) * 1.0;
        rimLight.position.y = 1.0 + Math.cos(elapsedTime * 0.8) * 0.8;
      }

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
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive]);

  // Update liquid color dynamically on raga shift
  useEffect(() => {
    if (liquidMaterialRef.current) {
      const color = new THREE.Color(liquidColor);
      liquidMaterialRef.current.color = color;
      liquidMaterialRef.current.emissive = color;
    }
  }, [liquidColor]);

  // Update camera zoom based on scroll progress
  useEffect(() => {
    if (cameraRef.current) {
      const targetZ = 5.2 / Math.max(0.6, cameraZoom);
      cameraRef.current.position.z +=
        (targetZ - cameraRef.current.position.z) * 0.1;
    }
  }, [cameraZoom]);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
}