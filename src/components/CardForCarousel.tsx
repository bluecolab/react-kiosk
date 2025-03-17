import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FullScreenDialog from './FullScreenDialog';

interface CardForCarouselProps {
  title: string,
  image: string
}

export default function CardForCarousel(
  { title, image }: CardForCarouselProps
) {
  return (
    <Card sx={{ minWidth: 275, m: 2, background: 'transparent' }}
      onClick={() => { console.log("Hello"); }}>

      <div className="select-none pointer-events-none">
        <CardContent>
          <Typography className="text-white text-lg text-center">
            {title}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ height: 150, width: 'auto', maxWidth: '100%', mx: 'auto' }}
          image={image}
          title=""
        />
      </div>
        <div className="flex items-center justify-center">
      <FullScreenDialog/>
      </div>
    </Card>
  );
}