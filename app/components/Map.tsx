"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

interface MapProps {
  className?: string;
}

declare global {
  interface Window {
    daum?: any;
  }
}

export default function Map({ className }: MapProps) {


  const executeScript = useCallback(() => {
    const scriptTag = document.createElement("script");
    const inlineScript = document.createTextNode(`new window.daum.roughmap.Lander({
        "timestamp" : "1765628711672",
        "key" : "e7u6ox4eobk",
        "mapWidth" : "100%",
        "mapHeight" : "35z0"
      }).render();`);
    scriptTag.appendChild(inlineScript);
    document.body.appendChild(scriptTag);

    setTimeout(() => {
      const contElements = document.querySelectorAll('.cont');
      contElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    }, 500);
  }, []);

  const installScript = useCallback(() => {
    if (window.daum?.roughmap?.cdn) {
      return;
    }

    const protocol = window.location.protocol;
    const cdnIdentifier = "16137cec";

    window.daum = window.daum || {};
    window.daum.roughmap = {
      cdn: cdnIdentifier,
      URL_KEY_DATA_LOAD_PRE: protocol + "//t1.daumcdn.net/roughmap/",
      url_protocal: protocol,
    };

    const scriptUrl = `${protocol}//t1.daumcdn.net/kakaomapweb/place/jscss/roughmap/${cdnIdentifier}/roughmapLander.js`;

    const scriptTag = document.createElement("script");
    scriptTag.src = scriptUrl;
    scriptTag.onload = executeScript;
    document.body.append(scriptTag);
  }, [executeScript]);

  useEffect(() => {
    installScript();

    // MutationObserver로 동적으로 추가되는 cont 요소 감지
    const observer = new MutationObserver(() => {
      const contElements = document.querySelectorAll('.cont');
      contElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [installScript]);

  return (
    <section className={className}>
      <div className="mb-5 flex justify-center">
        <div id="daumRoughmapContainer1765628711672" className="root_daum_roughmap root_daum_roughmap_landing"></div>
      </div>
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

