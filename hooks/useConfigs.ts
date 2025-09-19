// useKioskConstants.js

import { constants } from './constants/constants';

export const useConfigs = () => {
    constants.secret = localStorage.getItem('crotterMode') === 'true';

    if (!constants.secret) {
        constants.SHRUNKEN.VIEW_AREA_HEIGHT = 0.73;
        constants.SHRUNKEN.CAROUSEL_LOCATION = 0.75;
    }
    return constants;
};
