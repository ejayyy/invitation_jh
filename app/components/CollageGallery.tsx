"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";

interface CollageGalleryProps {
  className?: string;
}

const galleryImages = [
  { src: "/gallery/plae_0522.jpg", tall: false },
  { src: "/gallery/plae_1546.jpg", tall: false },
  { src: "/gallery/plae_1779.jpg", tall: true },
  { src: "/gallery/plae_1788.jpg", tall: false },
  { src: "/gallery/plae_2209.jpg", tall: false },
  { src: "/gallery/plae_3240.jpg", tall: false },
  { src: "/gallery/plae_3290.jpg", tall: true },
  { src: "/gallery/plae_3423.jpg", tall: false },
  { src: "/gallery/plae_4258.jpg", tall: false },
  { src: "/gallery/plae_4320.jpg", tall: false },
  { src: "/gallery/plae_4467.jpg", tall: true },
  { src: "/gallery/plae_5265.jpg", tall: false },
  { src: "/gallery/IMG_6445.JPG", tall: false },
  { src: "/gallery/IMG_6549.JPG", tall: false },
  { src: "/gallery/IMG_6551.JPG", tall: false },
  { src: "/gallery/IMG_6555.JPG", tall: false },
  { src: "/gallery/IMG_6556.JPG", tall: false },
  { src: "/gallery/IMG_6557.JPG", tall: false },
  { src: "/gallery/IMG_6558.JPG", tall: false },
  { src: "/gallery/IMG_6559.JPG", tall: false },
  { src: "/gallery/IMG_6560.JPG", tall: false },
  { src: "/gallery/IMG_6562.JPG", tall: false },
  { src: "/gallery/IMG_6563.JPG", tall: false },
  { src: "/gallery/IMG_6564.JPG", tall: false },
  { src: "/gallery/IMG_6565.JPG", tall: false },
];

export default function CollageGallery({ className }: CollageGalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setShowModal(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setOpacity(0);
      setTimeout(() => setShowModal(false), 300);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [mounted]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const columns = useMemo(() => {
    const numColumns = 6;
    const columnHeights = new Array(numColumns).fill(0);
    const gap = 16; // gap-4 = 16px
    const itemWidth = 200; // 이미지 너비

    return galleryImages.map((image) => {
      const height = image.tall ? 400 : 200; // tall 이미지는 400px, 일반은 200px

      // 가장 낮은 열 찾기 (모든 열에서 자유롭게 선택)
      let minHeight = columnHeights[0];
      let minColumn = 0;
      for (let i = 1; i < numColumns; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i];
          minColumn = i;
        }
      }

      // 이미지 위치 계산
      const left = minColumn * (itemWidth + gap);
      const top = columnHeights[minColumn];

      // 해당 열의 높이 업데이트
      columnHeights[minColumn] += height + gap;

      return {
        ...image,
        left,
        top,
        height,
      };
    });
  }, []);

  const totalHeight = useMemo(() => {
    const numColumns = 6;
    const columnHeights = new Array(numColumns).fill(0);
    const gap = 16;

    galleryImages.forEach((image) => {
      const height = image.tall ? 400 : 200;
      
      // 가장 낮은 열 찾기
      let minHeight = columnHeights[0];
      let minColumn = 0;
      for (let i = 1; i < numColumns; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i];
          minColumn = i;
        }
      }
      
      columnHeights[minColumn] += height + gap;
    });

    return Math.max(...columnHeights);
  }, []);

  return (
    <section className={`relative ${className || ''}`}>
      <div className="text-center">
        <small className="tracking-[0.2em]">GALLERY</small>
        <p className="mt-2">웨딩 갤러리</p>
      </div>
      {showModal && (
        <div
          className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm z-50 pointer-events-none transition-opacity duration-300"
          style={{ opacity }}
        >
          ← 밀어서 갤러리 사진보기
        </div>
      )}
      <div ref={scrollContainerRef} className="overflow-x-auto">
        <div
          className="relative w-max"
          style={{ height: `${totalHeight}px` }}
        >
          {columns.map((image, index) => (
            <div
              key={image.src}
              className="absolute overflow-hidden rounded-lg cursor-pointer"
              style={{
                left: `${image.left}px`,
                top: `${image.top}px`,
                width: '200px',
                height: `${image.height}px`,
              }}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Selected gallery image"
              width={2000}
              height={2000}
              className="object-contain max-w-full max-h-full"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
              unoptimized
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

