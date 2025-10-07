// useKioskConstants.js - Manages application configurations based on user preferences, specifically for "Crotter Mode".

import { constants, UIType } from './constants/constants';

export const useConfigs = () => {
    // constants.secret = localStorage.getItem('crotterMode') === 'true'; // Check if Crotter Mode is enabled
    // Adjust view area height and carousel location based on Crotter Mode status

    const type = new URLSearchParams(window.location.search).get('uiType');
    switch (type) {
        case UIType.DOCK:
            constants.SHRUNKEN.VIEW_AREA_HEIGHT = 0.73;
            constants.SHRUNKEN.CAROUSEL_LOCATION = 0.75;
            constants.mode = UIType.DOCK;
            break;
        case UIType.MODAL:
            constants.SHRUNKEN.VIEW_AREA_HEIGHT = 0.91;
            constants.SHRUNKEN.CAROUSEL_LOCATION = 0.93;
            constants.mode = UIType.MODAL;
            break;
        case UIType.MIXED:
            constants.SHRUNKEN.VIEW_AREA_HEIGHT = 0.73;
            constants.SHRUNKEN.CAROUSEL_LOCATION = 0.74;
            constants.mode = UIType.MIXED;
            break;
        case UIType.CAROUSEL:
            constants.mode = UIType.CAROUSEL;
        default:
    }

    return constants;
};
