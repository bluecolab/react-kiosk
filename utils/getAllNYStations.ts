export async function getAllNYStations() {
    const locations = await fetch(
        'https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ny&siteStatus=active&siteType=ES,ST&altMax=0'
    );

    const data = await locations.json();
    const stations = data.value.timeSeries.map((station: any) => ({
        siteName: station.sourceInfo.siteName,
        siteCode: station.sourceInfo.siteCode[0].value,
        latitude: station.sourceInfo.geoLocation.geogLocation.latitude,
        longitude: station.sourceInfo.geoLocation.geogLocation.longitude,
        station: station,
    }));
    console.log('Fetched NY Stations:', stations);
    return stations;
}
