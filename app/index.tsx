import React, { useState, useEffect, useMemo } from 'react';
import ScrollingCarousel from "@/components/ScrollingCarousel";
import Head from "expo-router/head";
import { View, Text, Easing, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// import useGetAPIData from "../hooks/use-get-api-data";

const assetId = require('../assets/videos/background.mp4');

interface Widget {
  title: string;
  image: number;
}

const widgets: Widget[] = [
  { title: 'Pond Water Data', image: require('../assets/images/icons/PondWaterDataIcon.png') },
  { title: 'Weather', image: require('../assets/images/icons/WeatherIcon.png') },
  { title: 'Data to Music', image: require('../assets/images/icons/SonificationIcon.png') },
  { title: 'Games', image: require('../assets/images/icons/GamesIcon.png') },
  { title: 'Right to Know', image: require('../assets/images/icons/RTKIcon.png') },
  { title: 'Water Reports', image: require('../assets/images/icons/WaterReportsIcon.png') },
  { title: 'Mobile App', image: require('../assets/images/icons/MobileIcon.png') },
  { title: 'Photo Gallery', image: require('../assets/images/icons/PhotoGalleryIcon.png') },
  { title: 'Videos', image: require('../assets/images/icons/VideosIcon.png') },
  { title: 'About Us', image: require('../assets/images/icons/AboutIcon.png') },
];

export default function Index() {
  const [windowDimensions, setWindowDimensions] = useState<
    {
      width: number | undefined,
      height: number | undefined
    }>({ width: undefined, height: undefined });
  const [index, setIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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


  const config = useMemo(() => ({
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  }), []);

  const carouselLocation = useSharedValue(0); // Start at 0 (off-screen or hidden)
  const viewAreaHeight = useSharedValue(0); // Start at 0 (off-screen or hidden)

  useEffect(() => {
    if (height) {
      // Animate it in when height is available
      carouselLocation.value = withTiming(height * 0.75, config);
      viewAreaHeight.value = withTiming(height * 0.73, config);
    }
  }, [config, height, carouselLocation, viewAreaHeight]);

  const carouselLocationStyle = useAnimatedStyle(() => {
    return {
      top: carouselLocation.value,
    };
  });

  const viewAreaHeightStyle = useAnimatedStyle(() => {
    return {
      height: viewAreaHeight.value,
    };
  });

  return (
    <>
      <Head>
        <title>Blue CoLab Kiosk</title>
        <meta name="description" content="Blue CoLab Kiosk" />
      </Head>

      {height && width && <View style={{ flex: 1, position: 'relative' }}>
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

        <View style={{
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          zIndex: 1,
        }}>
          <Animated.View style={[{
            backgroundColor: '#111111dd',
            borderRadius: 20,
            padding: 15,
            alignItems: 'center',
            width: "98%",
            // height: 300
          }, viewAreaHeightStyle]
          }>
            <Text style={{
              marginBottom: 15,
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold'
            }}>{widgets[index].title}</Text>
          </Animated.View>


          <View style={{
            position: 'relative',
            bottom: 40,
            padding: 10,
            borderRadius: 10,
            zIndex: 100,
            width: "98%"
          }}>

            <TouchableOpacity
              onPress={() => {
                if (height && !isExpanded) {
                  carouselLocation.value = withTiming(height * 1.05, config); // Move it off screen
                  viewAreaHeight.value = withTiming(height * 0.95, config); // Move it off screen
                  setIsExpanded(!isExpanded);
                } else if (height && isExpanded) {
                  carouselLocation.value = withTiming(height * 0.75, config); // Move it back screen
                  viewAreaHeight.value = withTiming(height * 0.73, config); // Move it back screen
                  setIsExpanded(!isExpanded);
                }
              }}

            >
              <Text style={{ color: 'white', alignContent: 'center', justifyContent: 'center', textAlign: 'center' }}>{isExpanded ? "△ Shrink △" : "▽ Expand ▽"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View
          style={[carouselLocationStyle, {
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1,
          }]}
        >
          <ScrollingCarousel widgets={widgets} height={height} width={width} setIndex={setIndex} />
        </Animated.View>
      </View>}
    </>
  );
}
