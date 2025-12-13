"use client";

import Image from "next/image";
import Link from "next/link";

interface KakaoMapProps {
  className?: string;
}

export default function KakaoMap({ className }: KakaoMapProps) {

  return (
    <section className={className}>
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

