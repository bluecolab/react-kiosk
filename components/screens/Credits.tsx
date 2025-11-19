import React, { useEffect, useRef } from 'react';

// This component uses some plain HTML elements (video, div) so it renders as expected
// on web builds. It will show a looping background water video, a side logo, and a
// vertically-scrolling credits roll (CSS animation).
export default function Credits({ durationSeconds = 15 }: { durationSeconds?: number } = {}) {
    const logoSrc = require('@/assets/images/icons/Blue-CoLab-500-blue.png');
    const rollRef = useRef<HTMLDivElement | null>(null);

    const goToWelcome = () => {
        try {
            window.dispatchEvent(
                new CustomEvent('kiosk-navigate', { detail: { title: 'Welcome' } })
            );
        } catch {
            // fallback: set global flag and reload main UI
            (window as any).__startScreen = 'Welcome';
        }
    };

    // Restart animation when component mounts so the roll starts from bottom.
    useEffect(() => {
        const el = rollRef.current;
        if (!el) return;
        // trigger reflow to restart animation
        el.style.animation = 'none';
        // next frame restore animation
        requestAnimationFrame(() => {
            el.style.animation = '';
        });
    }, []);

    const credits = [
        { heading: 'Leadership', items: ['John Cronin', 'Leanne Keeley'] },
        { heading: 'Advisors', items: ['Sasha Cronin'] },
        {
            heading: 'React Kiosk',
            items: [
                'Robert Bunjaj',
                'Isaac Lasso Younes',
                'Lloyd Boadi-Amoah',
                'Victor Lima',
                'Kenji Okura',
            ],
        },
        {
            heading: 'Dashboards',
            items: [
                'Kyle Hanson',
                'Kainaat Babar',
                "Nicole D'Annunzio",
                'Sean Scully',
                'Sasha Breygina',
                'Alexandra Tejeda',
                'George Moses',
                'Victor Lima',
                'Kenji Okura',
            ],
        },
        {
            heading: 'Games',
            items: [
                'Keathson Lam',
                'Daniel White',
                'Jack Sullivan',
                'Isabella Coraci',
                'Ian Shimba',
                'Michael Rourke',
                'Sebastian Roman',
                'Kenji Okura',
            ],
        },
        { heading: 'Sonification', items: ['Blue CoLab Team', 'Lulu Moquete', 'Kenji Okura'] },
        {
            heading: 'Kiosk Development Teams',
            items: [
                'AJ Kopec',
                'Meryl Mizell',
                'Sohaib Babar',
                'Robert Bunjaj',
                'Nailah Brown',
                'Josh Connaught',
                'Stephanie Sicilian',
                'Jordan Butler',
                'Keathson Lam',
                'Sasha Breygina',
                'Kevin Mendez',
                'Max Yankowitz',
                'Anthony Jarama',
                'Katherine Welsh',
                'Edmund Diggle',
                'Isaac Lasso Younes',
                'Marcus Manning',
                'Zachary Goldberg',
                'Michael Rourke',
                'Erin Sorbella',
                'Josh Bloom',
                'Isabella Coraci',
            ],
        },
    ];

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}>
            {/* Keep a translucent overlay so the running background remains visible underneath */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.6))',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />

            <div
                onClick={goToWelcome}
                onTouchStart={goToWelcome}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                }}>
                <div style={{ width: '80%', maxWidth: 900, minWidth: 320 }}>
                    <div
                        ref={rollRef}
                        className="credits-roll"
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: 'sans-serif',
                            fontSize: 25,
                            lineHeight: '1.5rem',
                            // set CSS variable so animation duration can be customized
                            ['--credits-duration' as any]: `${durationSeconds}s`,
                        }}>
                        <div style={{ marginBottom: 20 }}>
                            <h1 style={{ margin: 8, fontSize: 45 }}>Kiosk Contributors</h1>
                        </div>

                        {credits.map((section, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div style={{ fontWeight: 700, fontSize: 30, marginBottom: 15 }}>
                                    {section.heading}
                                </div>
                                {section.items.map((it: string, k: number) => (
                                    <div key={k} style={{ opacity: it.startsWith('  ') ? 0.9 : 1 }}>
                                        {it}
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div style={{ marginTop: 40, fontStyle: 'italic' }}>
                            This is a non-exhaustive list — many other contributors, interns, and
                            students have helped shape the kiosk over the years. Thank you to
                            everyone who contributed.
                        </div>
                    </div>
                </div>

                <div style={{ position: 'absolute', right: 32, top: '10%', zIndex: 3 }}>
                    <img
                        src={logoSrc}
                        alt="Blue CoLab"
                        style={{
                            width: 120,
                            height: 120,
                            objectFit: 'contain',
                            pointerEvents: 'auto',
                        }}
                    />
                </div>
            </div>

            <style>{`
                .credits-roll {
                    display: block;
                    /* start below the bottom and move upward */
                    animation: rollUp 30s linear infinite;
                }

                @keyframes rollUp {
                    0% { transform: translateY(100%); }
                    100% { transform: translateY(-120%); }
                }

                /* reduce text selection and improve readability on touch */
                .credits-roll, .credits-roll * { user-select: none; }
            `}</style>
        </div>
    );
}
