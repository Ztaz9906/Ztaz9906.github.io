"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

export function ScreenshotsGallery({ images, alts }: { images: string[]; alts?: string[] }) { // SEO FIX
  const t = useTranslations("common")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const selectedImageIndex = selectedImage ? images.indexOf(selectedImage) : -1 // SEO FIX
  const selectedImageAlt = selectedImageIndex >= 0 ? alts?.[selectedImageIndex] ?? t("screenshotsImageAlt", { index: selectedImageIndex + 1 }) : t("screenshotsEnlargedAlt") // SEO FIX

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedImage])

  if (images.length === 0) return null

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedImage(src)}
            className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:scale-[1.02] hover:border-blue/50 hover:shadow-lg hover:shadow-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <Image
              src={src}
              alt={alts?.[i] ?? t("screenshotsImageAlt", { index: i + 1 }) /* // SEO FIX */}
              fill
              className="object-cover transition-opacity group-hover:opacity-90"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 z-50 rounded-full bg-card p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <X className="size-6" />
            <span className="sr-only">{t("close")}</span>
          </button>

          <div
            className="relative h-full max-h-[85vh] w-full max-w-7xl overflow-hidden rounded-xl border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={selectedImageAlt /* // SEO FIX */}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  )
}
