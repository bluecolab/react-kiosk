import { getAllNYStations } from '@/utils/getAllNYStations';
import { getSiteData } from '@/utils/getSiteData';
import { parseSiteData } from '@/utils/parseSiteData';
import React, { useEffect, useState } from 'react';

import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

// Graph component with white background and visible title
function SiteGraph({ data, title }: { data: any[]; title: string }) {
    // @ts-ignore
    return (
        <div
            style={{
                width: 600,
                height: 340,
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                margin: '24px auto',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <div
                style={{
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: '#222',
                    marginBottom: 12,
                    textAlign: 'center',
                    letterSpacing: 0.5,
                }}>
                {title}
            </div>
            <VictoryChart
                theme={VictoryTheme.material}
                width={540}
                height={220}
                domainPadding={20}
                style={{ parent: { background: '#fff' } }}>
                <VictoryAxis style={{ tickLabels: { fontSize: 10, angle: -30 } }} />
                <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 10 } }} />
                <VictoryLine
                    data={Array.isArray(data) ? data : []}
                    style={{
                        data: { stroke: '#007aff', strokeWidth: 2 },
                    }}
                />
            </VictoryChart>
        </div>
    );
}

// Only import Leaflet on web
const isWeb = typeof window !== 'undefined';

let MapComponent: React.FC<any> = () => null;

if (isWeb) {
    // @ts-ignore
    const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
    MapComponent = ({ stations, setStation }) => (
        <MapContainer
            center={[41.04319444, -73.896055]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {stations.map((station: any, index: number) => (
                <Marker
                    eventHandlers={{
                        click: () => {
                            setStation(station.station);
                        },
                    }}
                    key={`${station.siteCode}-${index}`}
                    position={[station.latitude, station.longitude]}>
                    <Popup>{station.siteName}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default function MyMap() {
    const [stations, setStations] = useState<any[]>([]);
    const [station, setStation] = useState<any>(null);
    const [siteDatas, setSiteDatas] = useState<any[]>();

    useEffect(() => {
        const fetchStations = async () => {
            // @ts-ignore
            const stations = await getAllNYStations();
            setStations(stations);
        };
        fetchStations();
    }, []);

    useEffect(() => {
        const fetchSiteData = async () => {
            if (station) {
                // @ts-ignore
                const data = await getSiteData(station.sourceInfo.siteCode[0].value);
                // @ts-ignore
                const parsedData = parseSiteData(data);
                setSiteDatas(parsedData);
            }
        };
        fetchSiteData();
    }, [station]);

    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                background: '#f7f7fa',
                padding: '32px 0',
            }}>
            <div
                style={{
                    width: 600,
                    height: 400,
                    borderRadius: 16,
                    overflow: 'hidden',
                    margin: '0 auto 32px auto',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                    background: '#fff',
                }}>
                <MapComponent stations={stations} setStation={setStation} />
            </div>
            {siteDatas &&
                siteDatas.map((data, index) => (
                    <SiteGraph
                        key={index}
                        data={data.values}
                        title={data.variableName || 'Untitled Variable'}
                    />
                ))}
        </div>
    );
}
