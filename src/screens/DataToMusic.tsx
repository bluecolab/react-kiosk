import { Box } from '@mui/material';
import * as React from 'react';
import NotFound from '../components/Error404';



export default function DataToMusic() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Convert water data into music.</p>
                <NotFound />
        
    </Box>)
}