"use client"; // Marking this file as a Client Component
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true); // State for loading GIF and background GIF
  const [isAnimated, setIsAnimated] = useState(false); // State for underline animation

  useEffect(() => {
    // Show the GIF and background for 2 seconds, then reveal the content and trigger animation
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide GIF after 2 seconds

      // Start the underline animation after the content is fully visible
      setTimeout(() => {
        setIsAnimated(true); // Start underline animation
      }, 1500); // Slight delay for visual appeal

    }, 2000); // GIF and background duration: 2 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <div className="relative min-h-screen bg-backgroundTwo">
      {isLoading && (
        <>
          {/* Background GIF for the first 2 seconds */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url("/images/background-video.gif")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          {/* Main GIF displayed on top of the background */}
          <div className="absolute top-40 left-0 right-0 flex justify-center mt-0 z-10">
            <Image
              src="/images/gani.gif" // Ensure this file path is correct
              alt="Loading..."
              width={400}
              height={300}
              priority
              quality={100}
              className="rounded-lg"
            />
          </div>
        </>
      )}

      {/* Display main content after the first 2 seconds */}
      {!isLoading && (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-backgroundTwo rounded-lg shadow-lg overflow-hidden fade-in-slide">
          <h1
            className={`text-white text-3xl sm:text-5xl lg:text-6xl ${
              isAnimated ? 'animate-underline' : ''
            }`}
          >
            Welcome to Planetary Seismology Explorer
          </h1>

          <div className="flex flex-col md:flex-row items-center mt-8">
            {/* Image on the left side */}
            <Image
              src="/images/image1.webp" // Ensure this path is correct
              alt="Seismology Image"
              width={600}
              height={400}
              priority
              quality={100}
              className="mb-4 md:mb-0 rounded-lg shadow-md"
            />

            {/* Text on the right side */}
            <div className="md:ml-8 text-center md:text-left">
              <h2 className="text-white text-lg sm:text-xl md:text-2xl mb-2">
                Unlocking the Secrets of Seismic Events on Other Worlds
              </h2>

              <p className="text-white mt-4 text-sm sm:text-base md:text-lg">
                Explore the mysteries of planetary seismology through our cutting-edge web app, designed to analyze and identify seismic quakes from historic data collected during the Apollo missions and the Mars InSight Lander. With the challenge of limited data transfer from distant planets, our innovative algorithms and manual detection methods help scientists focus on the seismic signals that matter.
              </p>

              <h3 className="text-white text-lg sm:text-xl md:text-2xl mb-2 mt-6">
              Optimize the Mission
              </h3>

              <p className="text-white mt-4 text-sm sm:text-base md:text-lg">
              Maximizing the value of seismic data is critical for planetary exploration, given the limitations in transmitting data from distant bodies. By refining algorithms to filter noise from seismic signals, we can ensure only the most scientifically relevant data is sent back to Earth. Whether through advanced algorithm development or manual analysis, the goal is to enhance data accuracy and efficiency, supporting future missions and contributing to a deeper understanding of planetary seismic activity.              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
