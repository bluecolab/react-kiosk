import { Box } from '@mui/material';
import * as React from 'react';
import NotFound from '../components/Error404';

export default function AboutUs() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <p>Learn more about Blue CoLab. Test edit to trigger a build.</p>
        <NotFound />
    </Box>)
}
