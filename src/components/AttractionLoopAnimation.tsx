import * as React from 'react';
import { useState, useEffect, Component } from 'react';

// Safe asset loading — missing files won't crash the module
let logo: string | undefined;
let bgVideo: string | undefined;
try {
    logo = require('@/assets/images/logo512.png') as string;
} catch {
    logo = undefined;
}
try {
    bgVideo = require('@/assets/videos/background.mp4') as string;
} catch {
    bgVideo = undefined;
}

class AttractionLoopErrorBoundary extends Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
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
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <p style={{ color: '#3B9AD9', fontSize: '2vmin' }}>Blue CoLab</p>
                </div>
            );
        }
        return this.props.children;
    }
}

// Deterministic bubble positions — stable across renders, no Math.random()
const BUBBLES = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (i * 3.7 + 1.3) % 100,
    delay: (i * 0.37) % 10,
    duration: 7 + (i % 8) * 1.3,
    size: 3 + (i % 6) * 2,
    opacity: 0.12 + (i % 5) * 0.06,
}));

// Deterministic fish — swim left-to-right or right-to-left at various depths
const FISH = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    y: 8 + ((i * 11.3) % 78), // vertical position 8–86 %
    duration: 14 + ((i * 2.9) % 14), // 14–28 s per pass
    delay: -(i * 3.7), // stagger so they don't all start together
    size: 28 + (i % 4) * 10, // 28–58 px
    opacity: 0.25 + (i % 4) * 0.07, // subtle, behind content
    flip: i % 2 === 1, // alternate direction
}));

// One whale — large silhouette, slow, right-to-left, deep background
const WHALE = { y: 55, duration: 55, delay: -18, size: 380, opacity: 0.42, flip: false };

// One shark — medium, faster, right-to-left in the middle
const SHARK = { y: 38, duration: 22, delay: -8, size: 100, opacity: 0.32, flip: true };

// One diver — slow, right-to-left, upper-mid depth
const DIVER = { y: 22, duration: 35, delay: -6, size: 90, opacity: 0.72 };

function AttractionLoopInner() {
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

                /* ── Orb glow fades via opacity (no paint cost) ── */
                @keyframes bc-orb-glow {
                    0%, 100% { opacity: 1; }
                    45%      { opacity: 0.4; }
                }

                /* ── Ripple rings ── */
                @keyframes bc-ripple {
                    0%   { transform: translate(-50%, -50%) scale(0.6);  opacity: 0;    }
                    8%   { opacity: 0.70;                                               }
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
                    0%   { transform: translateX(-160%); }
                    100% { transform: translateX(360%); }
                }

                /* ── Fish swim left → right ── */
                @keyframes bc-fish-ltr {
                    0%   { transform: translateX(-120px); }
                    100% { transform: translateX(calc(100vw + 120px)); }
                }

                /* ── Fish swim right → left ── */
                @keyframes bc-fish-rtl {
                    0%   { transform: translateX(calc(100vw + 120px)); }
                    100% { transform: translateX(-120px); }
                }

                /* ── Fish tail wiggle ── */
                @keyframes bc-fish-wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25%      { transform: rotate(3deg); }
                    75%      { transform: rotate(-3deg); }
                }

                /* ── Diver kick legs ── */
                @keyframes bc-diver-kick {
                    0%, 100% { transform: rotate(0deg); }
                    40%      { transform: rotate(18deg); }
                    70%      { transform: rotate(-14deg); }
                }

                /* ── Diver bubble trail ── */
                @keyframes bc-diver-bubble {
                    0%   { transform: translateY(0px);   opacity: 0.7; }
                    100% { transform: translateY(-28px); opacity: 0;   }
                }

                /* ── Coral gentle sway ── */
                @keyframes bc-coral-sway {
                    0%, 100% { transform: rotate(0deg);   }
                    40%      { transform: rotate(4deg);   }
                    70%      { transform: rotate(-3deg);  }
                }
                @keyframes bc-coral-sway-r {
                    0%, 100% { transform: rotate(0deg);   }
                    40%      { transform: rotate(-4deg);  }
                    70%      { transform: rotate(3deg);   }
                }

                /* ── Text shine sweep across Blue CoLab wordmark ── */
                @keyframes bc-text-shine {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }

                .bc-wordmark-shine {
                    background: linear-gradient(
                        90deg,
                        #3B9AD9 0%,
                        #3B9AD9 35%,
                        #ffffff 48%,
                        #aee4ff 52%,
                        #4BAA50 65%,
                        #4BAA50 100%

                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    animation: bc-text-shine 3.5s linear infinite;
                }
            `}</style>

            {/* ── Animated fish ── */}
            {FISH.map((f) => (
                <div
                    key={f.id}
                    style={{
                        position: 'absolute',
                        top: `${f.y}%`,
                        left: 0,
                        width: `${f.size}px`,
                        height: `${f.size * 0.6}px`,
                        opacity: f.opacity,
                        animation: `${f.flip ? 'bc-fish-rtl' : 'bc-fish-ltr'} ${f.duration}s linear ${f.delay}s infinite`,
                        pointerEvents: 'none',
                        zIndex: 2,
                        willChange: 'transform',
                    }}>
                    {/* Flip wrapper — scaleX is static so it never animates */}
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            transform: f.flip ? 'none' : 'scaleX(-1)',
                        }}>
                        <svg
                            viewBox="0 0 60 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                width: '100%',
                                height: '100%',
                                animation: 'bc-fish-wiggle 0.6s ease-in-out infinite',
                            }}>
                            {/* Body */}
                            <ellipse cx="30" cy="18" rx="20" ry="10" fill="rgba(59,154,217,0.9)" />
                            {/* Tail */}
                            <polygon points="52,18 62,8 62,28" fill="rgba(59,154,217,0.7)" />
                            {/* Belly highlight */}
                            <ellipse cx="26" cy="20" rx="12" ry="5" fill="rgba(174,228,255,0.35)" />
                            {/* Eye */}
                            <circle cx="14" cy="15" r="2.5" fill="white" />
                            <circle cx="14" cy="15" r="1.2" fill="#001829" />
                            {/* Dorsal fin */}
                            <polygon points="22,8 30,2 38,8" fill="rgba(59,154,217,0.6)" />
                        </svg>
                    </div>
                </div>
            ))}

            {/* ── Whale silhouette ── */}
            <div
                style={{
                    position: 'absolute',
                    top: `${WHALE.y}%`,
                    left: 0,
                    width: `${WHALE.size}px`,
                    height: `${WHALE.size * 0.38}px`,
                    opacity: WHALE.opacity,
                    animation: `bc-fish-rtl ${WHALE.duration}s linear ${WHALE.delay}s infinite`,
                    pointerEvents: 'none',
                    zIndex: 1,
                    willChange: 'transform',
                }}>
                {/* No flip wrapper — whale faces right naturally */}
                <svg
                    viewBox="0 0 220 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: '100%' }}>
                    {/* Main body — long, tapered */}
                    <path
                        d="M20 42 Q30 18 80 22 Q130 26 170 34 Q195 38 205 42
                           Q195 46 170 50 Q130 58 80 62 Q30 66 20 42Z"
                        fill="rgba(8,25,55,1)"
                    />
                    {/* Head — bulbous, rounded rostrum */}
                    <ellipse cx="22" cy="42" rx="22" ry="18" fill="rgba(8,25,55,1)" />
                    {/* Long pectoral fin — sweeping down */}
                    <path
                        d="M95 50 Q88 72 68 80 Q72 65 80 56 Q85 52 95 50Z"
                        fill="rgba(6,20,45,1)"
                    />
                    {/* Small dorsal hump */}
                    <path d="M130 34 Q140 24 152 34Z" fill="rgba(8,25,55,1)" />
                    {/* Tail peduncle — narrow neck before flukes */}
                    <path
                        d="M196 38 Q210 40 218 42 Q210 44 196 46 Q200 42 196 38Z"
                        fill="rgba(8,25,55,1)"
                    />
                    {/* Tail flukes — horizontal, with centre notch (key whale feature) */}
                    <path
                        d="M212 42 Q222 28 220 16 Q214 22 208 36
                           Q212 42 208 48 Q214 62 220 68 Q222 56 212 42Z"
                        fill="rgba(7,22,50,1)"
                    />
                </svg>
            </div>

            {/* ── Shark ── */}
            <div
                style={{
                    position: 'absolute',
                    top: `${SHARK.y}%`,
                    left: 0,
                    width: `${SHARK.size}px`,
                    height: `${SHARK.size * 0.45}px`,
                    opacity: SHARK.opacity,
                    animation: `bc-fish-rtl ${SHARK.duration}s linear ${SHARK.delay}s infinite`,
                    pointerEvents: 'none',
                    zIndex: 2,
                    willChange: 'transform, opacity',
                }}>
                <div style={{ width: '100%', height: '100%' }}>
                    <svg
                        viewBox="0 0 100 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            width: '100%',
                            height: '100%',
                            animation: 'bc-fish-wiggle 0.5s ease-in-out infinite',
                        }}>
                        {/* Body */}
                        <ellipse cx="46" cy="26" rx="38" ry="14" fill="rgba(90,110,140,0.90)" />
                        {/* Belly */}
                        <ellipse cx="42" cy="32" rx="24" ry="7" fill="rgba(220,230,240,0.50)" />
                        {/* Tail */}
                        <path
                            d="M82 26 Q94 12 100 6 Q96 22 100 26 Q96 30 100 46 Q94 40 82 26Z"
                            fill="rgba(80,100,130,0.80)"
                        />
                        {/* Tall dorsal fin */}
                        <path d="M46 12 Q54 0 64 12Z" fill="rgba(70,90,120,0.85)" />
                        {/* Pectoral fin */}
                        <path d="M50 32 Q40 44 26 44 Q32 34 50 32Z" fill="rgba(80,100,130,0.70)" />
                        {/* Eye — small and dark */}
                        <circle cx="16" cy="24" r="3" fill="rgba(10,10,20,0.90)" />
                        <circle cx="15" cy="23" r="1" fill="rgba(255,255,255,0.5)" />
                        {/* Gill slits */}
                        <path d="M28 20 Q28 30" stroke="rgba(60,80,110,0.6)" strokeWidth="1" />
                        <path d="M32 19 Q32 31" stroke="rgba(60,80,110,0.6)" strokeWidth="1" />
                        <path d="M36 19 Q36 31" stroke="rgba(60,80,110,0.6)" strokeWidth="1" />
                    </svg>
                </div>
            </div>

            {/* ── Diver ── */}
            <div
                style={{
                    position: 'absolute',
                    top: `${DIVER.y}%`,
                    left: 0,
                    width: `${DIVER.size}px`,
                    height: `${DIVER.size * 1.4}px`,
                    opacity: DIVER.opacity,
                    animation: `bc-fish-rtl ${DIVER.duration}s linear ${DIVER.delay}s infinite`,
                    pointerEvents: 'none',
                    zIndex: 3,
                    willChange: 'transform',
                }}>
                <svg
                    viewBox="0 0 60 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: '100%' }}>
                    {/* Bubble trail from regulator */}
                    <circle
                        cx="12"
                        cy="22"
                        r="2.5"
                        style={{ animation: 'bc-diver-bubble 1.4s ease-out infinite 0s' }}
                        fill="rgba(174,228,255,0.80)"
                    />
                    <circle
                        cx="9"
                        cy="18"
                        r="1.8"
                        style={{ animation: 'bc-diver-bubble 1.4s ease-out infinite 0.5s' }}
                        fill="rgba(174,228,255,0.65)"
                    />
                    <circle
                        cx="13"
                        cy="13"
                        r="1.2"
                        style={{ animation: 'bc-diver-bubble 1.4s ease-out infinite 0.9s' }}
                        fill="rgba(174,228,255,0.50)"
                    />

                    {/* Tank */}
                    <rect
                        x="28"
                        y="18"
                        width="10"
                        height="22"
                        rx="5"
                        fill="rgba(180,200,220,0.90)"
                    />
                    <rect x="30" y="16" width="6" height="4" rx="2" fill="rgba(140,160,185,0.90)" />

                    {/* Wetsuit body (torso) */}
                    <rect x="18" y="22" width="22" height="26" rx="8" fill="rgba(20,80,140,0.92)" />

                    {/* Head + mask */}
                    <circle cx="29" cy="16" r="10" fill="rgba(20,80,140,0.92)" />
                    {/* Mask lens */}
                    <ellipse
                        cx="25"
                        cy="15"
                        rx="7"
                        ry="5"
                        fill="rgba(174,228,255,0.55)"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="1.2"
                    />
                    {/* Regulator hose */}
                    <path
                        d="M18 22 Q10 24 12 28"
                        stroke="rgba(50,50,70,0.80)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Left arm (outstretched forward) */}
                    <path
                        d="M18 28 Q6 26 4 30"
                        stroke="rgba(20,80,140,0.88)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Glove */}
                    <circle cx="4" cy="30" r="3" fill="rgba(10,60,110,0.90)" />

                    {/* Right arm (back) */}
                    <path
                        d="M40 30 Q48 28 50 32"
                        stroke="rgba(20,80,140,0.80)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Legs with kick animation */}
                    <g
                        style={{
                            transformOrigin: '29px 48px',
                            animation: 'bc-diver-kick 0.9s ease-in-out infinite',
                        }}>
                        {/* Left leg */}
                        <path
                            d="M24 48 Q22 62 20 72"
                            stroke="rgba(20,80,140,0.90)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Left fin */}
                        <path
                            d="M20 72 Q10 76 6 70"
                            stroke="rgba(0,140,120,0.90)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </g>
                    <g
                        style={{
                            transformOrigin: '29px 48px',
                            animation: 'bc-diver-kick 0.9s ease-in-out infinite reverse',
                        }}>
                        {/* Right leg */}
                        <path
                            d="M34 48 Q36 62 38 72"
                            stroke="rgba(15,65,120,0.88)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Right fin */}
                        <path
                            d="M38 72 Q48 76 52 70"
                            stroke="rgba(0,120,105,0.85)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </g>
                </svg>
            </div>

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
                    animation: 'bc-vid-zoom 8s ease-in-out infinite',
                    zIndex: 0,
                    willChange: 'transform, opacity',
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
                    willChange: 'opacity',
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
                    willChange: 'opacity, transform',
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
                        animationFillMode: 'backwards',
                        pointerEvents: 'none',
                        zIndex: 2,
                        willChange: 'transform, opacity',
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
                        willChange: 'transform, opacity',
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
                        borderRadius: '1000%',
                        animation: 'bc-float 6s ease-in-out infinite',
                        willChange: 'transform, opacity',
                    }}
                />
                {/* Shimmer scan line */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '60%',
                        height: '100%',
                        background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                        animation: 'bc-shimmer 10s ease-in-out infinite',
                        pointerEvents: 'none',
                        willChange: 'transform',
                    }}
                />
            </div>

            {/* ── "Blue CoLab" wordmark ── */}
            <p
                className="bc-wordmark-shine"
                style={{
                    margin: '4.0vmin 0 0',
                    fontWeight: 700,
                    userSelect: 'none',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 4,
                    fontSize: '4.0vmin',
                    letterSpacing: '0.05em',
                    willChange: 'transform, opacity',
                }}>
                Blue CoLab
            </p>

            {/* ── Tagline ── */}
            <p
                className="bc-tagline-shine"
                style={{
                    margin: '1.0vmin 0 0',
                    fontSize: '3.0vmin',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.92)',
                    letterSpacing: '0.00em',
                    userSelect: 'none',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 3,
                }}>
                What do you know about your water?
            </p>
            <p
                className="bc-tagline-shine"
                style={{
                    margin: '1.0vmin 0 0',
                    fontSize: '3.0vmin',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.92)',
                    letterSpacing: '0.00em',
                    animation: 'bc-tagline 6s ease-in-out infinite',
                    transform: 'translateY(8px)',
                    background: 'transparent',
                    border: 'none',
                    userSelect: 'none',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 3,
                }}>
                Press start to begin
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

            {/* ── Seabed — rocks & corals ── */}
            <svg
                viewBox="0 0 1440 160"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '18vmin',
                    zIndex: 3,
                    pointerEvents: 'none',
                }}>
                {/* ── Sand layer ── */}
                <path
                    d="M0 120 Q180 108 360 118 Q540 128 720 115 Q900 102 1080 118 Q1260 132 1440 118 L1440 160 L0 160Z"
                    fill="rgba(12,40,70,0.92)"
                />
                <path
                    d="M0 130 Q200 122 400 130 Q600 138 800 128 Q1000 118 1200 128 Q1320 134 1440 126 L1440 160 L0 160Z"
                    fill="rgba(8,28,52,0.80)"
                />
                {/* ── Rocks ── */}
                <ellipse cx="80" cy="128" rx="38" ry="18" fill="rgba(30,55,85,0.95)" />
                <ellipse cx="100" cy="132" rx="26" ry="13" fill="rgba(40,68,100,0.90)" />
                <ellipse cx="290" cy="124" rx="44" ry="20" fill="rgba(28,52,80,0.95)" />
                <ellipse cx="320" cy="130" rx="22" ry="11" fill="rgba(50,78,110,0.85)" />
                <ellipse cx="560" cy="126" rx="36" ry="16" fill="rgba(32,58,88,0.95)" />
                <ellipse cx="590" cy="133" rx="18" ry="9" fill="rgba(45,72,105,0.85)" />
                <ellipse cx="820" cy="122" rx="50" ry="22" fill="rgba(26,50,78,0.95)" />
                <ellipse cx="860" cy="131" rx="28" ry="12" fill="rgba(42,68,98,0.88)" />
                <ellipse cx="1060" cy="125" rx="40" ry="18" fill="rgba(30,56,84,0.95)" />
                <ellipse cx="1090" cy="132" rx="20" ry="10" fill="rgba(48,75,108,0.85)" />
                <ellipse cx="1320" cy="122" rx="46" ry="20" fill="rgba(28,52,80,0.95)" />
                <ellipse cx="1355" cy="130" rx="24" ry="11" fill="rgba(44,70,102,0.88)" />
                {/* ── Branch coral A (red-orange, left) ── */}
                <g
                    transform="translate(170, 118)"
                    style={{
                        transformOrigin: '0px 0px',
                        animation: 'bc-coral-sway 0s ease-in-out infinite 0s',
                    }}>
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-38"
                        stroke="rgba(220,80,60,0.85)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-20"
                        x2="-12"
                        y2="-40"
                        stroke="rgba(220,80,60,0.80)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-20"
                        x2="14"
                        y2="-42"
                        stroke="rgba(220,80,60,0.80)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-10"
                        x2="-16"
                        y2="-24"
                        stroke="rgba(230,100,70,0.70)"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <circle cx="0" cy="-38" r="4" fill="rgba(255,120,80,0.90)" />
                    <circle cx="-12" cy="-40" r="3" fill="rgba(255,120,80,0.85)" />
                    <circle cx="14" cy="-42" r="3" fill="rgba(255,120,80,0.85)" />
                    <circle cx="-16" cy="-24" r="2.5" fill="rgba(255,140,90,0.80)" />
                </g>
                {/* ── Branch coral B (pink, centre-left) ── */}
                <g
                    transform="translate(430, 120)"
                    style={{
                        transformOrigin: '0px 0px',
                        animation: 'bc-coral-sway-r 0s ease-in-out infinite 0s',
                    }}>
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-44"
                        stroke="rgba(210,100,160,0.85)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-22"
                        x2="-14"
                        y2="-46"
                        stroke="rgba(210,100,160,0.80)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-22"
                        x2="16"
                        y2="-48"
                        stroke="rgba(210,100,160,0.80)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-34"
                        x2="10"
                        y2="-52"
                        stroke="rgba(220,120,170,0.70)"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <circle cx="0" cy="-44" r="4" fill="rgba(255,160,200,0.90)" />
                    <circle cx="-14" cy="-46" r="3" fill="rgba(255,160,200,0.85)" />
                    <circle cx="16" cy="-48" r="3" fill="rgba(255,160,200,0.85)" />
                    <circle cx="10" cy="-52" r="2.5" fill="rgba(255,170,210,0.80)" />
                </g>
                {/* ── Fan coral (teal, centre) ── */}
                <g
                    transform="translate(720, 116)"
                    style={{
                        transformOrigin: '0px 0px',
                        animation: 'bc-coral-sway 0s ease-in-out infinite 0s',
                    }}>
                    <path
                        d="M0 0 Q-30 -30 -18 -56"
                        stroke="rgba(0,180,160,0.80)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M0 0 Q0  -38  0  -60"
                        stroke="rgba(0,180,160,0.85)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M0 0 Q30  -30 18  -56"
                        stroke="rgba(0,180,160,0.80)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M0 0 Q-14 -20 -8 -36"
                        stroke="rgba(0,200,175,0.60)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M0 0 Q14  -20  8 -36"
                        stroke="rgba(0,200,175,0.60)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <ellipse cx="0" cy="-60" rx="6" ry="4" fill="rgba(0,220,190,0.85)" />
                    <ellipse cx="-18" cy="-56" rx="5" ry="3.5" fill="rgba(0,210,180,0.80)" />
                    <ellipse cx="18" cy="-56" rx="5" ry="3.5" fill="rgba(0,210,180,0.80)" />
                </g>
                {/* ── Branch coral C (orange, right-centre) ── */}
                <g
                    transform="translate(960, 119)"
                    style={{
                        transformOrigin: '0px 0px',
                        animation: 'bc-coral-sway-r 0s ease-in-out infinite 0.0s',
                    }}>
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-36"
                        stroke="rgba(240,130,40,0.85)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-18"
                        x2="-12"
                        y2="-38"
                        stroke="rgba(240,130,40,0.80)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1="0"
                        y1="-18"
                        x2="14"
                        y2="-40"
                        stroke="rgba(240,130,40,0.80)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <circle cx="0" cy="-36" r="4" fill="rgba(255,170,60,0.90)" />
                    <circle cx="-12" cy="-38" r="3" fill="rgba(255,170,60,0.85)" />
                    <circle cx="14" cy="-40" r="3" fill="rgba(255,170,60,0.85)" />
                </g>
                /// ── Grass-like corals (green, right) ── *///
                {[200, 380, 640, 880, 1130, 1390].map((x, i) => (
                    <g
                        key={i}
                        transform={`translate(${x}, 122)`}
                        style={{
                            transformOrigin: '0px 0px',
                            animation: `bc-coral-sway${i % 2 ? '-r' : ''} ${i * 0.0}s`,
                        }}>
                        <path
                            d={`M0 0 Q${i % 2 ? 6 : -6} -20 0 -40`}
                            stroke="rgba(40,160,80,0.75)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path
                            d={`M4 0 Q${i % 2 ? -4 : 8} -15 4 -32`}
                            stroke="rgba(50,180,90,0.60)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}

export function AttractionLoopAnimation() {
    return (
        <AttractionLoopErrorBoundary>
            <AttractionLoopInner />
        </AttractionLoopErrorBoundary>
    );
}
