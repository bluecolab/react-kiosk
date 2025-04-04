import { Box } from '@mui/material';
import * as React from 'react';
import NotFound from '../components/Error404';

export default function RightToKnow() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Understand your right to know about water quality.</p>
        <NotFound />
    </Box>)
}   