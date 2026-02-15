"use client"

import { useState } from "react"
import { Play, X, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { Button } from "./ui/button"

interface VideoMarketingProps {
  title?: string
  description?: string
  videoUrl: string
  thumbnail?: string
  autoPlay?: boolean
  className?: string
}

export function VideoMarketing({
  title,
  description,
  videoUrl,
  thumbnail,
  autoPlay = false,
  className = ""
}: VideoMarketingProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleOverlayClick = () => {
    setIsPlaying(true)
    setShowOverlay(false)
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''} ${className}`}>
      <div className={`relative ${isFullscreen ? 'h-full w-full' : 'rounded-xl overflow-hidden'}`}>
        {/* Video Container */}
        <div className="relative">
          {!isPlaying && thumbnail && (
            <div className="relative cursor-pointer group" onClick={handleOverlayClick}>
              <img
                src={thumbnail}
                alt={title || "Vídeo"}
                className="w-full h-auto object-cover transition-transform group-hover:scale-105"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
              </div>
              {title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-lg font-semibold">{title}</h3>
                  {description && (
                    <p className="text-white/80 text-sm line-clamp-2">{description}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Video Element */}
          <div className={isPlaying ? '' : 'hidden'}>
            <video
              src={videoUrl}
              className="w-full h-auto"
              autoPlay={autoPlay || isPlaying}
              muted={isMuted}
              controls={!showOverlay}
              loop
              playsInline
            />
          </div>
        </div>

        {/* Custom Controls */}
        {isPlaying && !showOverlay && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="text-white hover:text-white/80"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleMute}
                className="text-white hover:text-white/80"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </Button>

              <div className="flex-1" />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="text-white hover:text-white/80"
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
              </Button>

              {isFullscreen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsPlaying(false)
                    setIsFullscreen(false)
                    setShowOverlay(true)
                  }}
                  className="text-white hover:text-white/80"
                >
                  <X className="w-6 h-6" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Video Card Component for Grid Layout
interface VideoCardProps {
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  duration?: string
  views?: string
  date?: string
}

export function VideoCard({
  title,
  description,
  videoUrl,
  thumbnail,
  duration = "0:00",
  views = "0",
  date
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <VideoMarketing
        videoUrl={videoUrl}
        thumbnail={thumbnail}
        title={title}
        description={description}
        autoPlay={isPlaying}
        className="aspect-video"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
              {duration}
            </span>
            <span>{views} visualizações</span>
          </div>
          {date && <span>{date}</span>}
        </div>
      </div>
    </div>
  )
}

// Video Gallery Component
interface VideoGalleryProps {
  title?: string
  description?: string
  videos: VideoCardProps[]
}

export function VideoGallery({ title, description, videos }: VideoGalleryProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            {description && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </div>
    </section>
  )
}