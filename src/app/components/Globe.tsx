"use client";
import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

const Globe = () => {
  const [inView, setInView] = useState(false);
  const globeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is in view
      }
    );

    const currentGlobeRef = globeRef.current; // Copy the current value of the ref into a variable

    if (currentGlobeRef) {
      observer.observe(currentGlobeRef);
    }

    return () => {
      if (currentGlobeRef) {
        observer.unobserve(currentGlobeRef); // Use the copied reference in cleanup
      }
    };
  }, []);

  return (
    <div
      ref={globeRef}
      className={`hidden lg:block h-screen w-screen absolute overflow-hidden ${inView ? 'block' : 'hidden'}`}
    >
      {inView && (
        <Spline
          scene="https://prod.spline.design/eTa8kMd4ae3SOfEm/scene.splinecode"
        />
      )}
    </div>
  );
};

export default Globe;
