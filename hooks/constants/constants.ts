export enum UIType {
    CAROUSEL = 'CAROUSEL',
    DOCK = 'DOCK',
    MODAL = 'MODAL',
    MIXED = 'MIXED',
}
export const constants = {
    MAX_IDLE_TIME: 300000, //  300000 = 5 minutes 4000 = 4 seconds (for testing)
    SHRUNKEN: {
        // CAROUSEL_LOCATION: 0.75, // set as percentage of height
        VIEW_AREA_HEIGHT: 0.73,
        VIEW_AREA_WIDTH: 0.98,
        VIEW_AREA_BORDER_RADIUS: 15,
        VIEW_AREA_MARGIN_TOP: 10,
        VIEW_AREA_COLOR: '#efefefdd',
    },
    EXPANDED: {
        // CAROUSEL_LOCATION: 1.05,
        VIEW_AREA_HEIGHT: 1.0,
        VIEW_AREA_WIDTH: 1.0,
        VIEW_AREA_BORDER_RADIUS: 0,
        VIEW_AREA_MARGIN_TOP: 0,
        VIEW_AREA_COLOR: '#efefefff',
    },
    mode: UIType.CAROUSEL as UIType,
};
