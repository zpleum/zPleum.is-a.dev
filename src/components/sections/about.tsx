"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-24 bg-muted/50"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                About Me
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get to know me better
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I'm zPleum — a student and developer who loves building real, useful stuff. I’m all about practical coding, dark mode, and keeping things minimal and clean.
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Background</h3>
                <p className="text-muted-foreground">
                  I’ve been coding since I was young, starting with Minecraft plugins and slowly leveling up to web development, APIs, and tools for creators. Most of what I’ve learned is self-taught, project-based, and driven by curiosity.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">My Approach</h3>
                <p className="text-muted-foreground">
                  I build fast, learn fast, and focus on what works. I care more about clarity and simplicity than perfection. Every line of code I write should solve a real problem or make someone’s experience better.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">What I'm Into</h3>
                <p className="text-muted-foreground">
                  I enjoy working on my own projects — from Minecraft servers to full-stack apps. I like experimenting, learning new frameworks, and sometimes just breaking things to understand them better.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
              </Button>
            </div>
          </div>
          <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
            <div className="h-full w-full relative">
              <Image
                alt="Profile Image"
                className="object-cover rounded-xl border border-border bg-muted"
                fill
                src="/placeholder-profile.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
