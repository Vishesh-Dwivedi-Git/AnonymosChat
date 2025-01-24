import React from "react";
import { cn } from "../lib/utils";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import LandVideo from "../assets/LandVideo.mp4.mp4";
import img1 from "../assets/output.jpg";
import img2 from "../assets/output (1).jpg";
import img3 from "../assets/output (2).jpg";
import img4 from "../assets/output (3).jpg";
import createGlobe from "cobe";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Unleash Anonymous Connections",
      description:
        "Connect with strangers, share thoughts, and build new experiences without revealing your identity.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3",
    },
    {
      title: "Express Yourself with Voice",
      description:
        "Break free from text and share your personality through expressive voice messages.",
      skeleton: <SkeletonTwo />,
      className: "col-span-1 lg:col-span-3",
    },
    {
      title: "Dare to Be Different",
      description:
        "Challenge your friends with fun and intriguing dares, turning conversations into unforgettable moments.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-6",
    },
  ];

  return (
    <div
      id="features"
      className="relative font-grotesk bg-black py-10 lg:py-40 max-w-7xl mx-auto"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium">
            <span className="text-white">Connect,</span>{" "}
            <span className="text-blue-500">Converse,</span>{" "}
            <span className="text-white">Challenge—</span>{" "}
            <span className="text-blue-500">Anonymously</span>
          </h4>

          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 font-normal">
            Dive into a world where anonymity meets excitement.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6 xl:border rounded-md px-4 sm:px-6 lg:px-8 dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-6 sm:p-8 relative overflow-hidden rounded-md",
        "bg-black bg-opacity-50",
        "border border-neutral-500 lg:border-none", // Remove borders on large screens
        className
      )}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-lg md:text-xl lg:text-2xl font-medium text-white">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base text-neutral-400 mt-2">{children}</p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-auto">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          <video id="bannerVideo" autoPlay muted loop>
            <source src={LandVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="absolute bottom-0 z-5 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-5 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = () => {
  const images = [img1, img3, img2, img4];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 10,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 10,
    },
  };

  return (
    <div className="relative ml-10 flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 z-[5] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[5] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-96 md:h-96 flex justify-center items-center relative bg-transparent dark:bg-transparent">
      <Globe className="absolute w-full h-full" />
    </div>
  );
};


const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0; // Rotation angle for the globe
    const canvas = canvasRef.current;

    if (!canvas) return;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 1200, // Adjusted size for retina displays
      height: 700,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 }, // Example marker
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01; // Controls rotation speed
      },
    });

    return () => {
      // Cleanup globe instance on unmount
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%", // Ensures responsiveness
        height: "100%",
        maxWidth: "600px", // Optional max size for smaller screens
        maxHeight: "600px",
        aspectRatio: "1", // Maintains a square aspect ratio
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Add temporary background for debugging
      }}
      className={className}
    />
  );
};

export default Globe;