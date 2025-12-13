"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef } from "react";

interface MapProps {
  className?: string;
}

export default function Map({ className }: MapProps) {
  const mapInitialized = useRef(false);

  useEffect(() => {
    const initMap = () => {
      if (mapInitialized.current) return;
      
      if (typeof window !== 'undefined' && (window as any).daum?.roughmap?.Lander) {
        try {
          new (window as any).daum.roughmap.Lander({
            timestamp: "1765628711672",
            key: "e7u6ox4eobk",
            mapWidth: "500",
            mapHeight: "500"
          }).render();
          mapInitialized.current = true;
        } catch (error) {
          console.error("Failed to initialize daum map:", error);
        }
      }
    };

    // 스크립트가 이미 로드되어 있는지 확인
    if (typeof window !== 'undefined' && (window as any).daum?.roughmap?.Lander) {
      initMap();
    } else {
      // 스크립트 로드를 기다림
      const checkInterval = setInterval(() => {
        if (typeof window !== 'undefined' && (window as any).daum?.roughmap?.Lander) {
          initMap();
          clearInterval(checkInterval);
        }
      }, 100);

      // 5초 후 타임아웃
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 5000);

      return () => clearInterval(checkInterval);
    }
  }, []);

  return (
    <section className={className}>
      <Script
        charSet="UTF-8"
        className="daum_roughmap_loader_script"
        src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"
        strategy="lazyOnload"
      />
      <div id="daumRoughmapContainer1765628711672" className="root_daum_roughmap root_daum_roughmap_landing"></div>
      <div className="flex justify-center gap-3">
        <Link href="https://naver.me/GPdo0cW4" target="_blank" rel="noopener noreferrer" className="text-sm bg-neutral-200 hover:bg-neutral-300 text-neutral-800 py-2 px-3 rounded-sm flex items-center justify-center">
          <Image src="/map/naver.png" alt="Naver Map" width={16} height={16} className="mr-2" />
          <span>네이버지도</span>
        </Link>
        <Link href="https://tmap.life/27ee44f3" target="_blank" rel="noopener noreferrer" className="text-sm bg-neutral-200 hover:bg-neutral-300 text-neutral-800 py-2 px-3 rounded-sm flex items-center justify-center">
          <Image src="/map/tmap.png" alt="Tmap" width={13} height={13} className="mr-2" />
          <span>티맵</span>
        </Link>
        <Link href="https://place.map.kakao.com/1071830086" target="_blank" rel="noopener noreferrer" className="text-sm bg-neutral-200 hover:bg-neutral-300 text-neutral-800 py-2 px-3 rounded-sm flex items-center justify-center">
          <Image src="/map/kakao.png" alt="Kakao Map" width={17} height={17} className="mr-2" />
          <span>카카오지도</span>
        </Link>
      </div>
    </section>
  );
}

