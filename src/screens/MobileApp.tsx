// Yes Yes work in progress - V
import { Box } from '@mui/material';
import * as React from 'react';
import Mobile from '../assets/icons/MobileNewUI.png'
// Import for QR code still needed - V

export default function MobileApp() {
    return (<Box sx={{ textAlign: 'center', p: 2 }}>
        <div style={{ display: 'flex' }}>        
            <img src={Mobile} alt="Mobile App" style={{  width: '100%', height: 'auto', maxWidth: '450px' }} />
        </div>
        {/* Need to create Style for this section  - V */}
        <div>
            <h2>Mobile App</h2>
            <p>Access our research data and information on the go.</p>
            <p>Stay updated with real-time notifications.</p>
            <p>Download our mobile app for better access.</p>
                  <NotFound />

        </div>
    </Box>)
}   