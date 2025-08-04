"use client"

import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

// Define skill categories with their respective technologies
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: "Advanced", description: "Building complex UIs with modern React features" },
      { name: "Next.js", level: "Advanced", description: "Creating optimized web applications with server-side rendering" },
      { name: "TypeScript", level: "Intermediate", description: "Using types for safer and scalable code in frontend" },
      { name: "HTML/CSS", level: "Advanced", description: "Crafting responsive and accessible designs" },
      { name: "Tailwind CSS", level: "Advanced", description: "Building utility-first styled components" },
      { name: "JavaScript", level: "Advanced", description: "ES6+ features and best practices" }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: "Intermediate", description: "Writing backend logic and APIs" },
      { name: "MySQL", level: "Intermediate", description: "Database modeling and querying with SQL" },
      { name: "Nodemon", level: "Intermediate", description: "Auto-restarting Node.js server for development" }
    ]
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Git", level: "Advanced", description: "Version control and collaboration" },
      { name: "Vercel", level: "Advanced", description: "Deployment and hosting of web applications" },
      { name: "GitHub Actions", level: "Intermediate", description: "Automated workflows and deployments" }
    ]
  },
  {
    name: "Minecraft Java Plugin",
    skills: [
      { name: "Java", level: "Advanced", description: "Developing custom Minecraft plugins with Spigot/Bukkit API" },
      { name: "Spigot/Bukkit API", level: "Advanced", description: "Creating gameplay mechanics, events, and custom commands" },
      { name: "MMOItems Integration", level: "Intermediate", description: "Extending plugin functionality with external plugin support" },
      { name: "YAML Configuration", level: "Advanced", description: "Managing plugin settings and language files" },
      { name: "Plugin Messaging", level: "Intermediate", description: "Communicating between server and client or proxy" }
    ]
  }
]

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 md:py-24"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Skills & Technologies
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              My Technical Expertise
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are the technologies and tools I work with to build modern web applications.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-4">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <HoverCard key={skill.name}>
                    <HoverCardTrigger asChild>
                      <Badge
                        variant="outline"
                        className="px-3 py-1 text-sm cursor-help"
                      >
                        {skill.name}
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72">
                      <div className="space-y-2">
                        <h4 className="font-bold">{skill.name}</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">Level:</span>
                          <span
                            className={`text-xs font-medium ${
                              skill.level === "Advanced"
                                ? "text-green-500 dark:text-green-400"
                                : skill.level === "Intermediate"
                                ? "text-yellow-500 dark:text-yellow-400"
                                : "text-blue-500 dark:text-blue-400"
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
