import { Box } from '@mui/material';
import * as React from 'react';
import About from '../assets/videos/Blue-CoLab.mp4';
import fellowship from '../assets/videos/fellowship.webm'

export default function Videos() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Watch educational videos on water science.</p>
        <video width="500" preload="auto" controls controlsList=" nodownload noremoteplayback noplaybackrate foobar" disablePictureInPicture>
            <source src={About} type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <video width="500" preload="auto" controls  controlsList=" nodownload noremoteplayback noplaybackrate foobar" disablePictureInPicture>
            <source src={fellowship} type="video/webm" />
            Your browser does not support the video tag.
        </video>
    </Box>)
}   