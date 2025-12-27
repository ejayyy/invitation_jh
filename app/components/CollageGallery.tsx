"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface CollageGalleryProps {
  className?: string;
}

const galleryImages = [
  { src: "/gallery/plae_0522.jpg", tall: false },
  { src: "/gallery/plae_1546.jpg", tall: false },
  { src: "/gallery/plae_1779.jpg", tall: false },
 // { src: "/gallery/plae_1788.jpg", tall: false },
 // { src: "/gallery/plae_2209.jpg", tall: false },
//  { src: "/gallery/plae_3240.jpg", tall: false },
  { src: "/gallery/plae_3290.jpg", tall: false },
  { src: "/gallery/plae_3423.jpg", tall: false },
  { src: "/gallery/plae_4258.jpg", tall: false },
  { src: "/gallery/plae_4320.jpg", tall: false },
  { src: "/gallery/plae_4467.jpg", tall: false },
  { src: "/gallery/plae_5265.jpg", tall: false },
  { src: "/gallery/IMG_6445.JPG", tall: false },
  { src: "/gallery/IMG_6549.JPG", tall: false },
  { src: "/gallery/IMG_6551.JPG", tall: false },
//  { src: "/gallery/IMG_6555.JPG", tall: false },
  { src: "/gallery/IMG_6556.JPG", tall: false },
//  { src: "/gallery/IMG_6557.JPG", tall: false },
  { src: "/gallery/IMG_6558.JPG", tall: false },
  { src: "/gallery/IMG_6559.JPG", tall: false },
//  { src: "/gallery/IMG_6560.JPG", tall: false },
  { src: "/gallery/IMG_6562.JPG", tall: false },
  { src: "/gallery/IMG_6563.JPG", tall: false },
  { src: "/gallery/IMG_6564.JPG", tall: false },
  { src: "/gallery/IMG_6565.JPG", tall: false },
  { src: "/gallery/IMG_7827.jpg", tall: false },
  { src: "/gallery/IMG_7829.jpg", tall: false },
  { src: "/gallery/IMG_7837.jpg", tall: false },
  { src: "/gallery/IMG_7838.jpg", tall: false },
  { src: "/gallery/IMG_7844.jpg", tall: false },
  { src: "/gallery/IMG_7849.jpg", tall: false },
  { src: "/gallery/IMG_7852.jpg", tall: false },
  { src: "/gallery/1000066824.jpg", tall: false },
  { src: "/gallery/1000066831.jpg", tall: false },
  { src: "/gallery/3472591320610941264_20241130224147408.jpg", tall: false },
  { src: "/gallery/3472591320609122384_20241130224147473.jpg", tall: false },
];

export default function CollageGallery({ className }: CollageGalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    // Only show modal after mount to prevent hydration mismatch
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

  const getCurrentImageIndex = useCallback(() => {
    if (!selectedImage) return 0;
    return galleryImages.findIndex(img => img.src === selectedImage);
  }, [selectedImage]);

  const goToPreviousImage = useCallback(() => {
    const currentIndex = getCurrentImageIndex();
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setSelectedImage(galleryImages[prevIndex].src);
      setCurrentImageIndex(prevIndex);
    }
  }, [getCurrentImageIndex]);

  const goToNextImage = useCallback(() => {
    const currentIndex = getCurrentImageIndex();
    if (currentIndex < galleryImages.length - 1) {
      const nextIndex = currentIndex + 1;
      setSelectedImage(galleryImages[nextIndex].src);
      setCurrentImageIndex(nextIndex);
    }
  }, [getCurrentImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, goToPreviousImage, goToNextImage]);

  const columns = useMemo(() => {
    const numColumns = 6;
    const columnHeights = new Array(numColumns).fill(0);
    const gap = 12; // gap-3 = 12px
    const itemWidth = 150; // 이미지 너비

    return galleryImages.map((image) => {
      const height = image.tall ? 300 : 150; // tall 이미지는 300px, 일반은 150px

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
    const gap = 12;

    galleryImages.forEach((image) => {
      const height = image.tall ? 300 : 150;

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
      <div className="text-center mb-4">
        <small className="tracking-[0.2em]">GALLERY</small>
        <p className="mt-2">웨딩 갤러리</p>
      </div>
      <div
        className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm z-50 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: mounted && showModal ? opacity : (mounted ? 0 : 1),
          display: mounted && showModal ? 'block' : (mounted ? 'none' : 'block')
        }}
        suppressHydrationWarning
      >
        ← 밀어서 갤러리 사진보기
      </div>
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
                width: '150px',
                height: `${image.height}px`,
              }}
              onClick={() => {
                const index = galleryImages.findIndex(img => img.src === image.src);
                setSelectedImage(image.src);
                setCurrentImageIndex(index);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  unoptimized
                  sizes="150px"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image.src}`, e);
                    const target = e.target as HTMLImageElement;
                    if (target) {
                      target.style.display = 'none';
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchMove={(e) => {
            touchEndX.current = e.touches[0].clientX;
          }}
          onTouchEnd={() => {
            if (!touchStartX.current || !touchEndX.current) return;
            
            const distance = touchStartX.current - touchEndX.current;
            const minSwipeDistance = 50;

            if (Math.abs(distance) > minSwipeDistance) {
              if (distance > 0) {
                // Swipe left - next image
                goToNextImage();
              } else {
                // Swipe right - previous image
                goToPreviousImage();
              }
            }

            touchStartX.current = 0;
            touchEndX.current = 0;
          }}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous button */}
            {getCurrentImageIndex() > 0 && (
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/5 hover:bg-white/10 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-200 z-10 hover:scale-110 active:scale-95 border border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-7 md:h-7"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}

            <Image
              src={selectedImage}
              alt={`Gallery image ${getCurrentImageIndex() + 1} of ${galleryImages.length}`}
              width={2000}
              height={2000}
              className="object-contain max-w-full max-h-full"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
              unoptimized
            />

            {/* Next button */}
            {getCurrentImageIndex() < galleryImages.length - 1 && (
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/5 hover:bg-white/10 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-200 z-10 hover:scale-110 active:scale-95 border border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-7 md:h-7"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}

            <button
              className="absolute top-4 md:top-6 right-4 md:right-6 text-white bg-white/5 hover:bg-white/10 rounded-full w-11 h-11 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 z-10 hover:scale-110 active:scale-95 border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-sm md:text-base font-medium z-10 shadow-lg border border-white/20">
              <span className="opacity-90">{getCurrentImageIndex() + 1}</span>
              <span className="mx-2 opacity-50">/</span>
              <span className="opacity-60">{galleryImages.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

