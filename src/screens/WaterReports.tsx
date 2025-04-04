import { Box } from '@mui/material';
import * as React from 'react';
import { waterReports } from '../components/WaterReportFiles'; // Where all the files are stored

export default function WaterReport() {
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <p>WATER REPORTR!!!!!</p>
              <NotFound/>

    </Box>
  );
}


/* 
Packages Used that may or may not be removed 
        "pdfjs-dist": "^5.1.91",
        "react-native-pdf": "^6.7.7",
        "react-pdf": "^9.2.1",
        "react-pdf-viewer": "^0.1.0",
*/
