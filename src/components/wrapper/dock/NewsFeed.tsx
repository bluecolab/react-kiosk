'use-dom';

import { News } from './Dock';

export function NewsFeed({ openModal, news }: { openModal: (key: number) => void; news: News[] }) {
    const containerStyle: React.CSSProperties = {
        width: '100%',
        fontSize: '25px',
        color: '#000',
        background: 'rgba(255, 255, 255, 0.8)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        boxSizing: 'border-box',
    };

    const marqueeStyle: React.CSSProperties = {
        display: 'inline-block',
        paddingLeft: '100%',
        animation: 'marquee 45s linear infinite',
    };

    return (
        <div style={containerStyle}>
            <style>{`@keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-100%,0,0); } }`}</style>
            <div style={marqueeStyle}>
                {news.map((item) => (
                    <span
                        key={item.id}
                        style={{
                            marginRight: '50px',
                            userSelect: 'none',
                            cursor: item.link ? 'pointer' : 'default',
                        }}
                        onClick={() => item.text && openModal(item.id)}>
                        <b>{item.date}</b> - {item.title} (touch to learn more)
                    </span>
                ))}
            </div>
        </div>
    );
}
