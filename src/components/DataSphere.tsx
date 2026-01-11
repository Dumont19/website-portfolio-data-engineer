'use client';
import { useEffect, useRef } from 'react';

type Dot = { 
    x: number; y: number; z: number; 
    vx: number; vy: number; vz: number;
    pulse: number; pulseSpeed: number 
};

export default function DataSphere({ isIntro = false }: { isIntro?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let globeRadius = 0;
        let currentCx = 0;
        let isMobile = false;
        let globalAlpha = 1.0;

        const standardDotCount = 900; 
        const standardConnectionDistance = 45; 
        const referenceRadius = 250; 

        let dotCount = standardDotCount;
        let connectionDistance = standardConnectionDistance;
        let dots: Dot[] = [];

        let angleY = 0;
        let angleX = 0;
        
        const animate = () => {
            if (!ctx || !canvas) return;
            
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);
            
            angleY += 0.002;
            angleX += 0.0005;

            let isExploding = false;

            if (isIntro) {
                const destX = width / 2;
                currentCx += (destX - currentCx) * 0.03;
            } else {
                if (isMobile) {
                    isExploding = true;
                    currentCx = width / 2; 
                    globalAlpha -= 0.02; 
                    if (globalAlpha < 0) globalAlpha = 0;
                } else {
                    const destX = width * 0.7;
                    currentCx += (destX - currentCx) * 0.03;
                }
            }

            const cy = height / 2;
            const projected: { x: number; y: number; z: number; dotIndex: number }[] = [];

            dots.forEach((dot, i) => {
                if (isExploding) {
                    dot.x += dot.vx * 0.15;
                    dot.y += dot.vy * 0.15;
                    dot.z += dot.vz * 0.15;
                    dot.pulse = 1;
                } else {
                    if (dot.pulse <= 0 && Math.random() > 0.993) dot.pulse = 1;
                    if (dot.pulse > 0) dot.pulse -= dot.pulseSpeed;
                }

                const x1 = dot.x * Math.cos(angleY) - dot.z * Math.sin(angleY);
                const z1 = dot.z * Math.cos(angleY) + dot.x * Math.sin(angleY);
                const y1 = dot.y * Math.cos(angleX) - z1 * Math.sin(angleX);
                const z2 = z1 * Math.cos(angleX) + dot.y * Math.sin(angleX);

                const zFinal = z2 * globeRadius;
                const xFinal = x1 * globeRadius;
                const yFinal = y1 * globeRadius;
                const scale = 450 / (450 + zFinal);

                projected.push({ x: currentCx + xFinal * scale, y: cy + yFinal * scale, z: zFinal, dotIndex: i });
            });

            if (!isExploding && globalAlpha > 0.1) {
                ctx.globalCompositeOperation = 'lighter';
                if (connectionDistance > 0) {
                    for (let i = 0; i < projected.length; i++) {
                        const p1 = projected[i];
                        const dot1 = dots[p1.dotIndex];
                        if (dot1.pulse < 0.1) continue;
                        for (let j = i + 1; j < projected.length; j++) {
                            const p2 = projected[j];
                            const dot2 = dots[p2.dotIndex];
                            if (dot2.pulse < 0.1) continue;
                            
                            const dx = p1.x - p2.x;
                            const dy = p1.y - p2.y;
                            const distSq = dx * dx + dy * dy;
                            
                            if (distSq < connectionDistance * connectionDistance) {
                                const connectionStrength = Math.min(dot1.pulse, dot2.pulse);
                                const avgZ = (p1.z + p2.z) / 2;
                                const depthFactor = (avgZ + globeRadius) / (2 * globeRadius);
                                const opacity = Math.max(0.05, Math.min(0.8, depthFactor * connectionStrength));
                                
                                ctx.beginPath();
                                ctx.moveTo(p1.x, p1.y);
                                ctx.lineTo(p2.x, p2.y);
                                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                                ctx.lineWidth = opacity;
                                ctx.stroke();
                            }
                        }
                    }
                }
            }
            ctx.globalCompositeOperation = 'source-over';

            if (globalAlpha > 0) {
                projected.forEach((p) => {
                    const dot = dots[p.dotIndex];
                    const normalizedDepth = (p.z + globeRadius) / (2 * globeRadius);
                    const baseGray = Math.max(30, Math.min(200, 40 + normalizedDepth * 120));
                    
                    let r, g, b;
                    if (dot.pulse > 0) {
                        const pulseIntensity = dot.pulse;
                        r = baseGray + (255 - baseGray) * pulseIntensity;
                        g = baseGray + (255 - baseGray) * pulseIntensity;
                        b = baseGray + (255 - baseGray) * pulseIntensity;
                    } else {
                        r = (g = b = baseGray);
                    }
                    
                    ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${globalAlpha})`;
                    
                    const baseSize = (2.0 * (globeRadius / referenceRadius)) * (450 / (450 + p.z));
                    const size = dot.pulse > 0 ? baseSize * 1.3 : baseSize;
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size > 0 ? size : 0, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (canvas && ctx) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = canvas.offsetWidth * dpr;
                canvas.height = canvas.offsetHeight * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

                width = canvas.offsetWidth;
                height = canvas.offsetHeight;

                isMobile = width < 768;

                const factor = isMobile ? 0.28 : 0.18;
                globeRadius = Math.min(width, height) * factor;

                const scaleFactor = globeRadius / referenceRadius;
                connectionDistance = standardConnectionDistance * scaleFactor;
                dotCount = Math.floor(standardDotCount * Math.pow(scaleFactor, 1.2));
                dotCount = Math.max(150, dotCount);

                dots = [];
                for (let i = 0; i < dotCount; i++) {
                    const phi = Math.acos(-1 + (2 * i) / dotCount);
                    const theta = Math.sqrt(dotCount * Math.PI) * phi;
                    
                    const x = Math.cos(theta) * Math.sin(phi);
                    const y = Math.sin(theta) * Math.sin(phi);
                    const z = Math.cos(phi);

                    dots.push({ 
                        x, y, z, 
                        vx: x, vy: y, vz: z, 
                        pulse: 0, 
                        pulseSpeed: 0.005 + Math.random() * 0.01 
                    });
                }

                if (currentCx === 0) currentCx = width / 2;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [isIntro]);

    return <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" style={{ filter: 'blur(0.3px)' }} />;
}