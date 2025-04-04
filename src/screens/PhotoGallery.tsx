import { Box } from '@mui/material';
import * as React from 'react';
import NotFound from '../components/Error404';

export default function PhotoGallery() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Explore our photo gallery of research and events.</p>
        <NotFound/>
    </Box>)
}   