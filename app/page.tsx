"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showScrollText, setShowScrollText] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [rocketPosition, setRocketPosition] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsContentVisible(true);
        setIsAnimated(true);
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setRocketPosition(scrolled);

      const progressBar = document.getElementById("progress-bar");
      const rocket = document.getElementById("rocket");

      if (progressBar) {
        progressBar.style.width = scrolled + "%"; // Update progress bar width
      }

      if (rocket) {
        const rocketOffset = -10; // Adjust this value to fine-tune the rocket's position on the tip of the bar
        rocket.style.left = `calc(${scrolled}% + ${rocketOffset}px)`; // Keep rocket at the tip
      }

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight * 0.9) {
        setShowScrollText(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="relative min-h-screen">
    {/* Progress bar with rocket */}
    <div id="progress-bar" className="fixed top-0 left-0 h-1 bg-yellow z-50"></div>
    <img
      id="rocket"
      src="/images/r2.png" // Path to your rocket image
      alt="Rocket"
      className="absolute" // Keep it absolute for positioning
      style={{ 
        position: 'fixed', 
        top: '-20px', // Adjust this value to position it correctly above the progress bar
        left: '0', 
        width: '70px', // Adjusted width for a wider rocket
        height: 'auto' // Maintain aspect ratio
      }} 
    />
  


      {isLoading && (
        <div className="absolute top-40 left-0 right-0 flex justify-center mt-0 z-10">
          <Image
            src="/images/gani.gif"
            alt="Loading..."
            width={400}
            height={300}
            priority
            quality={100}
            className="rounded-lg"
          />
        </div>
      )}

      {/* Background elements */}
      <div className="background-container">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png"
          alt="Moon"
          className="moving-bg-image"
        />
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      {!isLoading && (
        <div
          className={`relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 rounded-lg shadow-lg overflow-hidden ${
            isContentVisible ? "fade-in" : "opacity-0"
          }`}
        >
          <h1
            className={`text-blue-500 text-3xl sm:text-5xl lg:text-6xl transition-all duration-1000 ease-out ${
              isAnimated ? "animate-underline" : ""
            }`}
          >
            Welcome to Planetary Seismology Explorer
          </h1>

          <div className="flex flex-col md:flex-col lg:flex-row items-center mt-8">
            <Image
              src="/images/image1.webp"
              alt="Seismology Image"
              width={600}
              height={400}
              priority
              quality={100}
              className="mb-4 md:mb-8 lg:mb-0 rounded-lg shadow-md"
            />

            <div className="md:ml-0 lg:ml-8 text-center md:text-center lg:text-left">
              <h2 className="text-white text-lg sm:text-xl md:text-2xl mb-2 hover:text-shadow-lg">
                Unlocking the Secrets of Seismic Events on Other Worlds
              </h2>

              <p className="text-white mt-4 text-sm sm:text-base md:text-lg">
                Explore the mysteries of planetary seismology through our cutting-edge web app, designed to analyze and
                identify seismic quakes from historic data collected during the Apollo missions and the Mars InSight
                Lander. With the challenge of limited data transfer from distant planets, our innovative algorithms and
                manual detection methods help scientists focus on the seismic signals that matter.
              </p>

              <h3 className="text-white text-lg sm:text-xl md:text-2xl mb-2 mt-6">
                Optimize the Mission
              </h3>

              <p className="text-white mt-4 text-sm sm:text-base md:text-lg">
                Maximizing the value of seismic data is critical for planetary exploration, given the limitations in
                transmitting data from distant bodies. By refining algorithms to filter noise from seismic signals, we
                can ensure only the most scientifically relevant data is sent back to Earth. Whether through advanced
                algorithm development or manual analysis, the goal is to enhance data accuracy and efficiency,
                supporting future missions and contributing to a deeper understanding of planetary seismic activity.
              </p>
            </div>
          </div>

          {/* Scroll-triggered content */}
          {showScrollText && (
            <div className="scroll-text-container fade-in-scroll flex items-center">
              <div className="scroll-text-left text-white text-lg sm:text-xl md:text-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl mb-2">Advancing Planetary Insights</h3>
                <p>
                  By leveraging the unique seismic data from extraterrestrial environments, our platform empowers
                  scientists to better understand planetary interiors. Detecting and analyzing seismic activity on the
                  Moon and Mars provides critical insights into the geophysical processes that shape these celestial
                  bodies. As we refine our detection methods, we not only improve our understanding of seismic phenomena
                  but also contribute to future exploration missions by offering more efficient data transmission and
                  analysis.
                </p>
              </div>

              <div className="scroll-image-right">
                <Image
                  src="/images/img3.avif"
                  alt="Scroll Image"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md fade-in-image"
                />
              </div>
            </div>
          )}

          <div id="date-time" className="text-white text-lg">
            {formatDateTime(currentTime)}
          </div>
        </div>
      )}
    </div>
  );
}
