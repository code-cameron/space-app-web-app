"use client"; // Marking this file as a Client Component

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true); // Trigger the animation after a short delay
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4">
      <h1 className={`text-white text-6xl ${isAnimated ? "animate-underline" : ""}`}>
        Welcome to Planetary Seismology Explorer
      </h1>
      
      <div className="flex flex-col md:flex-row items-center mt-8">
        {/* Image on the left side */}
        <Image
          src="/images/image1.webp" // Ensure this path points to the correct image
          alt="Seismology Image"
          width={600}
          height={400}
          priority
          quality={100}
          className="mb-4 md:mb-0" // Margin below on mobile, none on larger screens
        />
        

        
        {/* h2 and p on the right side */}
        <div className="md:ml-8 text-center md:text-left">
          <h2 className="text-white text-xl mb-2">
            Unlocking the Secrets of Seismic Events on Other Worlds
          </h2>
          <p className="text-white mt-4">
            Explore the mysteries of planetary seismology through our cutting-edge web app, designed to analyze and identify seismic quakes from historic data collected during the Apollo missions and the Mars InSight Lander. With the challenge of limited data transfer from distant planets, our innovative algorithms and manual detection methods help scientists focus on the seismic signals that matter.
          </p>
        </div>
      </div>
    </div>
  );
}
