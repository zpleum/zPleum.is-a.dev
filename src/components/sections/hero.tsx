"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ParticleBackground } from "@/components/particle-background"
import { AnimatedSection } from "@/components/animated-section"

export function HeroSection() {
  const handleScrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen py-20 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,hsl(var(--primary)/0.1)_0%,hsl(var(--background))_100%)]" />
      <ParticleBackground />

      <div className="container px-4 md:px-6 space-y-8 text-center">
        <AnimatedSection direction="down" className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Hi, I'm <span className="text-primary">Wiraphat</span>, AKA <span className="text-primary">zPleum</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Full Stack Developer
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300} className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground">
          I build beautiful, responsive, and user-friendly web applications with modern technologies.
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="transition-all duration-300 hover:scale-105">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="transition-all duration-300 hover:scale-105">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-12 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 transition-transform duration-300 hover:scale-110"
          onClick={handleScrollToNext}
        >
          <ArrowDown className="h-5 w-5" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </section>
  )
}
