
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  { src: "https://iili.io/3Ul2s0G.md.jpg", alt: "Gallery Image 1", hint: "portrait night" },
  { src: "https://iili.io/3Ul2ifs.md.jpg", alt: "Gallery Image 2", hint: "profile picture" },
  { src: "https://iili.io/3Ul28Rp.md.jpg", alt: "Gallery Image 3", hint: "group photo" },
  { src: "https://iili.io/3Ul2eUv.md.jpg", alt: "Gallery Image 4", hint: "event presentation" },
  { src: "https://iili.io/3Ul26sn.md.jpg", alt: "Gallery Image 5", hint: "casual outdoor" },
  { src: "https://iili.io/3Ul24WX.md.jpg", alt: "Gallery Image 6", hint: "formal event" },
];

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Gallery</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of moments, achievements, and things I find interesting.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-primary/10 transition-shadow duration-300 group">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={image.hint}
                  priority={index < 3} // Prioritize loading for the first few images
                  // Removed unoptimized={true} to revert to Next.js default optimization
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
