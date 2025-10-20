export async function getAllNYStations() {
    const locations = await fetch(
        'https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ny&siteStatus=active&siteType=ES&altMax=0'
    );

    const data = await locations.json();
    return data;
}
