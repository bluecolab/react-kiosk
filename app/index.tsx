import ScrollingCarousel from "@/components/ScrollingCarousel";
import Head from "expo-router/head";
import { View } from "react-native";

const assetId = require('../assets/videos/background.mp4');

export default function Index() {
  return (
    <>
      <Head>
        <title>Blue CoLab Kiosk</title>
        <meta name="description" content="Blue CoLab Kiosk" />
      </Head>
      <View style={{ flex: 1, position: 'relative' }}>
        {/* Background Video (remains constant) */}
        <video
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          autoPlay
          loop
          muted
        >
          <source src={assetId} type="video/mp4" />
        </video>

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1, // You can adjust the opacity for a fade effect
          }}
        >
          <ScrollingCarousel />
        </View>
      </View>
    </>
  );
}
