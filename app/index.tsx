import React, { useState, useEffect } from 'react';
import ScrollingCarousel from "@/components/ScrollingCarousel";
import Head from "expo-router/head";
import { View } from "react-native";
// import useGetAPIData from "../hooks/use-get-api-data";

const assetId = require('../assets/videos/background.mp4');

export default function Index() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  // Update window size dynamically
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { height, width } = windowDimensions;

  return (
    <>
      <Head>
        <title>Blue CoLab Kiosk</title>
        <meta name="description" content="Blue CoLab Kiosk" />
      </Head>
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Background Video */}
        <video
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures video covers the entire viewport
            zIndex: -1, // Keep the video behind the carousel
          }}
          autoPlay
          loop
          muted
        >
          <source src={assetId} type="video/mp4" />
        </video>

        {/* Scrolling Carousel */}
        <View
          style={{
            position: 'absolute',
            top: height * 0.75, // Adjusted position based on height
            left: 0,
            right: 0,
            zIndex: 10, // Ensure carousel is on top of video
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1, // Adjust opacity for a fade effect if needed
          }}
        >
          <ScrollingCarousel height={height} width={width}/>
        </View>
      </View>
    </>
  );
}
