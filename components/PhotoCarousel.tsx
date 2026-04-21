// components/PhotoCarousel.tsx
// Swipeable image carousel with native <dialog> lightbox
// Zero dependencies — uses HTML dialog element + CSS scroll-snap
//
// Source: Estate2.0 Website Spec Section 4.3.1

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface PhotoCarouselProps {
  photos: string[];
  propertyTitle: string;
  location: string;
  type: string;
}

export default function PhotoCarousel({
  photos,
  propertyTitle,
  location,
  type,
}: PhotoCarouselProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalPhotos = photos.length;

  // Lightbox open
  const openLightbox = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setLightboxOpen(true);
    },
    []
  );

  // Lightbox close
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Show dialog when state changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightboxOpen) {
      dialog.showModal();
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      } else if (e.key === "ArrowRight" && currentIndex < totalPhotos - 1) {
        setCurrentIndex((i) => i + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex, totalPhotos, closeLightbox]);

  // Swipe detection
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < totalPhotos - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    }
  };

  const altText = (index: number) =>
    `${type} in ${location} — photo ${index + 1} of ${totalPhotos}`;

  return (
    <>
      {/* Carousel */}
      <div className="photo-carousel" ref={carouselRef}>
        <div className="photo-carousel__track">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="photo-carousel__slide"
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${altText(i)} in full view`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openLightbox(i);
              }}
            >
              <Image
                src={photo}
                alt={altText(i)}
                fill
                sizes="100vw"
                className="photo-carousel__image"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {totalPhotos > 1 && (
          <div className="photo-carousel__dots" role="tablist">
            {photos.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Photo ${i + 1} of ${totalPhotos}`}
                className={`photo-carousel__dot ${i === currentIndex ? "photo-carousel__dot--active" : ""}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — native <dialog> */}
      <dialog
        ref={dialogRef}
        className="photo-lightbox"
        aria-label="Property photo viewer"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeLightbox();
        }}
      >
        <div
          className="photo-lightbox__content"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="photo-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation arrows */}
          {totalPhotos > 1 && (
            <>
              <button
                className="photo-lightbox__nav photo-lightbox__nav--prev"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                aria-label="Previous photo"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="photo-lightbox__nav photo-lightbox__nav--next"
                onClick={() =>
                  setCurrentIndex((i) => Math.min(totalPhotos - 1, i + 1))
                }
                disabled={currentIndex === totalPhotos - 1}
                aria-label="Next photo"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Image */}
          <div className="photo-lightbox__image-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[currentIndex]}
              alt={altText(currentIndex)}
              className="photo-lightbox__image"
            />
          </div>

          {/* Counter */}
          <p className="photo-lightbox__counter">
            {currentIndex + 1} / {totalPhotos}
          </p>
        </div>
      </dialog>
    </>
  );
}
