"use client"

import { Toaster } from "sonner"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export function ToastProvider() {
  const { theme } = useTheme()

  return (
    <Toaster 
      position="top-right"
      expand={false}
      richColors={false}
      closeButton
      theme={theme as "light" | "dark" | undefined}
      className="toast-container"
      toastOptions={{
        duration: 4000,
        className: cn(
          "toast-notification group border-2 py-3 px-4 shadow-lg rounded-lg",
          "data-[type=success]:bg-background/95 data-[type=success]:backdrop-blur-sm data-[type=success]:text-foreground data-[type=success]:border-primary",
          "data-[type=error]:bg-background/95 data-[type=error]:backdrop-blur-sm data-[type=error]:text-foreground data-[type=error]:border-destructive",
          "sm:max-w-md"
        ),
        descriptionClassName: "text-muted-foreground text-sm mt-1",
        style: {
          background: 'var(--background)',
          color: 'var(--foreground)',
          border: '2px solid var(--primary)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(8px)',
        },
      }}
    />
  )
} 