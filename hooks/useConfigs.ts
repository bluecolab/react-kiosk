// useKioskConstants.js - Manages application configurations based on user preferences, specifically for "Crotter Mode".

import { constants } from './constants/constants';

export const useConfigs = () => {
    constants.secret = localStorage.getItem('crotterMode') === 'true'; // Check if Crotter Mode is enabled
    // Adjust view area height and carousel location based on Crotter Mode status

    if (!constants.secret) {
        // Normal Mode
        constants.SHRUNKEN.VIEW_AREA_HEIGHT = 0.73; // Default height for view area
        constants.SHRUNKEN.CAROUSEL_LOCATION = 0.75; // Default position for carousel
    } else {
        // Crotter Mode Enabled - more space for Crotter image - V for Victory :)
        constants.SHRUNKEN.VIEW_AREA_HEIGHT = 0.73; // Lowered to make room for Crotter image
        constants.SHRUNKEN.CAROUSEL_LOCATION = 0.74; // Lowered to make room for Crotter image
    }
    return constants;
};
