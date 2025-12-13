"use client";

import React, { useEffect, useState } from "react";

declare global {
    interface Window {
        Kakao: any;
    }
}

interface ShareProps {
    className?: string;
}

export default function Share({ className }: ShareProps) {
    const [mounted, setMounted] = useState(false);
    const [kakaoReady, setKakaoReady] = useState(false);

    useEffect(() => {
        // 클라이언트에서만 실행되도록 보장
        setMounted(true);

        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;

        script.onload = () => {
            if (window.Kakao && !window.Kakao.isInitialized()) {
                try {
                    window.Kakao.init("f4869301e40d26668570435f63ec4e38");
                    console.log("Kakao SDK initialized");
                    setKakaoReady(true);
                } catch (error) {
                    console.error("Failed to initialize Kakao:", error);
                }
            } else if (window.Kakao && window.Kakao.isInitialized()) {
                setKakaoReady(true);
            }
        };

        script.onerror = () => {
            console.error("Failed to load Kakao SDK");
        };

        const existingScript = document.querySelector('script[src*="kakao.js"]');
        if (!existingScript) {
            document.head.appendChild(script);
        } else {
            if (window.Kakao && !window.Kakao.isInitialized()) {
                try {
                    window.Kakao.init("f4869301e40d26668570435f63ec4e38");
                    setKakaoReady(true);
                } catch (error) {
                    console.error("Failed to initialize Kakao:", error);
                }
            } else if (window.Kakao && window.Kakao.isInitialized()) {
                setKakaoReady(true);
            }
        }

        return () => {
        };
    }, []);

    const shareToClipboard = async () => {
        const currentUrl = typeof window !== "undefined" ? window.location.href : "";
        try {
            await navigator.clipboard.writeText(currentUrl);
            alert("링크가 복사되었습니다");
        } catch (error) {
            console.error("Clipboard error:", error);
            alert("복사에 실패했습니다");
        }
    };

    const shareToKakaoTalk = () => {
        if (typeof window === "undefined" || !window.Kakao) {
            alert("카카오 SDK가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        if (!window.Kakao.isInitialized()) {
            try {
                window.Kakao.init("f4869301e40d26668570435f63ec4e38");
            } catch (error) {
                console.error("Failed to initialize Kakao:", error);
                alert("카카오톡 초기화에 실패했습니다.");
                return;
            }
        }

        const currentUrl = window.location.href;
        const imageUrl = `${currentUrl}/finale/main.jpg`;

        try {
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '🎉 하정수 & 정보민 결혼식 🎉',
                    description: '2026.03.08 오후 3시 40분\n라마다서울신도림호텔 14층 하늘정원',
                    imageUrl: imageUrl,
                    link: {
                        mobileWebUrl: currentUrl,
                        webUrl: currentUrl,
                    },
                },
                buttons: [
                    {
                        title: '초대장 보기',
                        link: {
                            mobileWebUrl: currentUrl,
                            webUrl: currentUrl,
                        },
                    },
                ],
            });
        } catch (error) {
            console.error("Kakao share error:", error);
            alert("카카오톡 공유에 실패했습니다: " + (error as Error).message);
        }
    };

    return (
        <section className={`text-center ${className || ''}`}>
            <div className="flex justify-center gap-2 p-2 text-sm">
                <button
                    className={`py-2 px-3 rounded-sm flex items-center justify-center bg-[#FAE100] hover:bg-[#E6CD00] text-neutral-800 font-(family-name:--font-ibm-plex-sans-kr) ${!mounted || !kakaoReady ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    onClick={shareToKakaoTalk}
                    disabled={!mounted || !kakaoReady}
                >
                    <span>카카오톡</span>
                </button>
                <button
                    className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 py-2 px-3 rounded-sm flex items-center justify-center font-(family-name:--font-ibm-plex-sans-kr)"
                    onClick={shareToClipboard}
                    disabled={!mounted}
                >
                    <span>링크</span>
                </button>
            </div>
        </section>
    );
}