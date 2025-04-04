import Box from '@mui/material/Box';
import * as React from 'react';
import NotFound from '../components/Error404';

export default function PondWaterData() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Monitor pond water quality with real-time data.</p>
        <NotFound />
    </Box>)
}