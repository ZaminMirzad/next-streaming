// components/ImageWithLoader.js

import { useState } from "react";
import Loader from "./Loader";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ImageWithLoader = ({ src, alt, className, width, height }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  // This function is called when the image has loaded
  const handleImageLoad = () => {
    setIsLoading(false); // Hide the loader when the image has loaded
  };

  return (
    <div className="absolute h-full w-full object-cover   object-top max-h-[700px] top-0 left-0">
      <div className={`relative ${className}`} style={{ width, height }}>
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
            <Loader />
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          className={`transition-all duration-[5000ms] ease-in-out delay-300 ${isLoading ? "opacity-0 " : "opacity-100 "
            }`}
          fill
          onLoad={handleImageLoad}

        />
      </div>
    </div>
  );
};

export default ImageWithLoader;
