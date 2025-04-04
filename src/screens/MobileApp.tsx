import { Box } from '@mui/material';
import * as React from 'react';
import NotFound from '../components/Error404';

export default function MobileApp() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Download our mobile app for better access.</p>
        <NotFound />
    </Box>)
}   