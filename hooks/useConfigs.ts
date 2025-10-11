// useKioskConstants.js - Manages application configurations based on user preferences depending on the UI type specified in the URL.

import { constants, UIType } from './constants/constants';

export const useConfigs = () => {
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
