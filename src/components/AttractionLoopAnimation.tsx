import * as React from 'react';
import { useState, useEffect } from 'react';

const logo = require('@/assets/images/logo512.png');
const bgVideo = require('@/assets/videos/background.mp4');

// Deterministic bubble positions — stable across renders, no Math.random()
const BUBBLES = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (i * 3.7 + 1.3) % 100,
    delay: (i * 0.37) % 10,
    duration: 7 + (i % 8) * 1.3,
    size: 3 + (i % 6) * 2,
    opacity: 0.12 + (i % 5) * 0.06,
}));

export function AttractionLoopAnimation() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#001829',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}>
            <style>{`
                /* ── Background video slow zoom ── */
                @keyframes bc-vid-zoom {
                    0%, 100% { transform: scale(1.06); }
                    60%      { transform: scale(1.14); }
                }

                /* ── Logo: big → small → big (breathe) ── */
                @keyframes bc-breathe {
                    0%   { transform: scale(1.18); }
                    45%  { transform: scale(0.82); }
                    100% { transform: scale(1.18); }
                }

                /* ── Combined float + breathe for the orb ── */
                @keyframes bc-float {
                    0%   { transform: translateY(0px)  scale(1.06); }
                    45%  { transform: translateY(-8px) scale(0.96); }
                    100% { transform: translateY(0px)  scale(1.06); }
                }

                /* ── Radial glow pulses with the orb ── */
                @keyframes bc-bg-glow {
                    0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1.06); }
                    45%      { opacity: 0.20; transform: translate(-50%, -50%) scale(0.96); }
                }

                /* ── Orb box-shadow breathes ── */
                @keyframes bc-orb-glow {
                    0%, 100% {
                        box-shadow:
                            0 0 50px 18px rgba(59,154,217,0.75),
                            0 0 110px 40px rgba(59,154,217,0.25),
                            0 0 22px  8px rgba(247,183,49,0.30);
                    }
                    45% {
                        box-shadow:
                            0 0 18px  5px rgba(59,154,217,0.30),
                            0 0 40px 12px rgba(59,154,217,0.10),
                            0 0  8px  3px rgba(75,170,80,0.15);
                    }
                }

                /* ── Ripple rings ── */
                @keyframes bc-ripple {
                    0%   { transform: translate(-50%, -50%) scale(0.6);  opacity: 0.70; }
                    100% { transform: translate(-50%, -50%) scale(5.5);  opacity: 0;    }
                }

                /* ── Bubbles rise ── */
                @keyframes bc-bubble {
                    0%   { transform: translateY(0);      opacity: 0;   }
                    6%   { opacity: 1;                                   }
                    94%  { opacity: 0.55;                                }
                    100% { transform: translateY(-115vh); opacity: 0;   }
                }

                /* ── Wordmark breathes with the orb ── */
                @keyframes bc-wordmark {
                    0%, 100% { letter-spacing: 0.18em; opacity: 1;    font-size: 4.6vmin; }
                    45%      { letter-spacing: 0.06em; opacity: 0.80; font-size: 3.8vmin; }
                }

                /* ── Tagline fades in/out ── */
                @keyframes bc-tagline {
                    0%, 100% { opacity: 0;    transform: translateY(8px);  }
                    20%, 80% { opacity: 1;    transform: translateY(0px);  }
                }

                /* ── Shimmer scan line across the logo ── */
                @keyframes bc-shimmer {
                    0%   { left: -60%; }
                    100% { left: 160%; }
                }
            `}</style>

            {/* ── Background video ── */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    animation: 'bc-vid-zoom 18s ease-in-out infinite',
                    zIndex: 0,
                }}>
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* ── Dark overlay so content stays legible ── */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />

            {/* ── Pulsing radial glow behind logo ── */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '40%',
                    width: '50vmin',
                    height: '50vmin',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(59,154,217,0.65) 0%, rgba(0,24,41,0) 70%)',
                    animation: 'bc-bg-glow 6s ease-in-out infinite',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />

            {/* ── Water ripple rings (5 rings, 1.2 s apart) ── */}
            {[0, 1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        right: '50%',
                        bottom: '50%',
                        width: '30vmin',
                        height: '30vmin',
                        borderRadius: '100%',
                        border: '2px solid rgba(59,154,217,0.50)',
                        animation: 'bc-ripple 6s ease-out infinite',
                        animationDelay: `${i * 1.2}s`,
                        pointerEvents: 'none',
                        zIndex: 2,
                    }}
                />
            ))}

            {/* ── Rising water bubbles ── */}
            {BUBBLES.map((b) => (
                <div
                    key={b.id}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: `${b.x}%`,
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        borderRadius: '100%',
                        background: `rgba(59,154,217,${b.opacity})`,
                        animation: `bc-bubble ${b.duration}s ease-in infinite`,
                        animationDelay: `${b.delay}s`,
                        pointerEvents: 'none',
                        zIndex: 2,
                    }}
                />
            ))}

            {/* ── Logo orb (breathes big → small → big) ── */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 6,
                    overflow: 'visible',
                }}>
                <img
                    src={logo}
                    alt="Blue CoLab logo"
                    style={{
                        objectFit: 'contain',
                        display: 'block',
                        borderRadius: '50%',
                        animation:
                            'bc-float 6s ease-in-out infinite, bc-orb-glow 6s ease-in-out infinite',
                    }}
                />
                {/* Shimmer scan line */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '60%',
                        width: '60%',
                        height: '100%',
                        background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                        animation: 'bc-shimmer 10s ease-in-out infinite',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            {/* ── "Blue CoLab" wordmark ── */}
            <p
                style={{
                    margin: '2.4vmin 0 0',
                    fontWeight: 500,
                    userSelect: 'none',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 4,
                    fontSize: '4.0vmin',
                    letterSpacing: '0.00em',
                }}>
                <span style={{ color: '#3B9AD9' }}>Blue </span>
                <span style={{ color: '#4BAA50' }}>CoLab</span>
            </p>

            {/* ── Tagline ── */}
            <p
                style={{
                    margin: '1.0vmin 0 0',
                    fontSize: '2.4vmin',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.92)',
                    letterSpacing: '0.00em',
                    userSelect: 'none',
                    textAlign: 'center',
                    animation: 'bc-tagline 6s ease-in-out infinite',
                    position: 'relative',
                    zIndex: 3,
                }}>
                What do you know about your water?
            </p>

            {/* ── Live clock — bottom-right ── */}
            <p
                style={{
                    position: 'absolute',
                    bottom: '1.5vmin',
                    right: '2vmin',
                    margin: 0,
                    fontSize: '2vmin',
                    fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.80)',
                    zIndex: 4,
                }}>
                {time.toLocaleTimeString()}
            </p>
        </div>
    );
}
