import Box from '@mui/material/Box';
import * as React from 'react';
import NotFound from '../components/Error404';

export default function Weather() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Check live weather conditions at our research sites.</p>
        <NotFound/>
    </Box>)
}