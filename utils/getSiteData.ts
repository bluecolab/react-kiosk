export async function getSiteData(siteCode: string) {
    const response = await fetch(
        `https://waterservices.usgs.gov/nwis/iv/?sites=${siteCode}&format=json&period=P14D`
    );
    const data = await response.json();
    return data;
}
