"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Facebook } from "lucide-react"
import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-6 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="#home" className="font-semibold text-xl flex items-center gap-2">
              <span className="text-primary">Portfolio</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A minimalist portfolio showcasing my work and skills.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#home" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="#skills" className="text-sm text-muted-foreground hover:text-primary">
                Skills
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary">
                Projects
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Contact</h3>
            <p className="text-sm text-muted-foreground">
              <Mail className="h-4 w-4 inline-block mr-2" />
              wiraphat.makwong@gmail.com
            </p>
            <p className="text-sm text-muted-foreground">
              Tak, Thailand
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Social</h3>
            <div className="flex gap-4">
                <Button asChild variant="ghost" size="icon">
                  <a href="https://github.zpleum.dev" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <a href="https://facebook.zpleum.dev" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <a href="https://linkedin.zpleum.dev" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <a href="https://discord.zpleum.dev" target="_blank" rel="noopener noreferrer">
                    <FaDiscord className="h-5 w-5 fill-current text-primary" />
                    <span className="sr-only">Discord</span>
                  </a>
                </Button>
            </div>
            <div className="flex pt-2">
              <a href="//www.dmca.com/Protection/Status.aspx?ID=d73b13a4-305d-458a-b987-b78d0f19ce56" title="DMCA.com Protection Status" className="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca-badge-w150-5x1-02.png?ID=d73b13a4-305d-458a-b987-b78d0f19ce56"  alt="DMCA.com Protection Status" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} zPleum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
