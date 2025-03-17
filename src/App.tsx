import * as React from 'react';
import Container from '@mui/material/Container';
import background from './assets/background.mp4';
import ScrollingCarousel from './components/ScrollingCarousel';
import { Box } from '@mui/material';
import logo from './assets/icons/Blue-CoLab-500-blue.png';

export default function App() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted // this allows autoplaying. See here: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
      >
        <source src={background} type="video/mp4" />
      </video>

      <div className="relative z-10 flex items-center justify-center h-full">
        <Container className="backdrop-blur-md m-5 p-5 rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <Box
            component="img"
            sx={{
              height: 50,
            }}
            alt="The house from the offer."
            src={logo}
          />
          </div>
          <ScrollingCarousel />
        </Container>
      </div>
    </div>
  );
}
