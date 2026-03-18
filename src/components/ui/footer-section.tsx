"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300 border-zinc-800">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Auspexi</h2>
            <p className="mb-6 text-muted-foreground">
              Master Brand Visibility in the Era of AI Search.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm bg-zinc-900 border-zinc-800"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white text-black transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-zinc-600/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Platform</h3>
            <nav className="space-y-2 text-sm">
              <a href="/#features" className="block transition-colors hover:text-white text-zinc-400">
                Features
              </a>
              <a href="/#pricing" className="block transition-colors hover:text-white text-zinc-400">
                Pricing
              </a>
              <a href="/#roadmap" className="block transition-colors hover:text-white text-zinc-400">
                GEO Roadmap
              </a>
              <a href="/#testimonials" className="block transition-colors hover:text-white text-zinc-400">
                Case Studies
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <nav className="space-y-2 text-sm">
              <a href="/blog" className="block transition-colors hover:text-white text-zinc-400">
                Blog
              </a>
              <a href="/faq" className="block transition-colors hover:text-white text-zinc-400">
                FAQ
              </a>
              <a href="#" className="block transition-colors hover:text-white text-zinc-400">
                API Reference
              </a>
              <a href="#" className="block transition-colors hover:text-white text-zinc-400">
                Community
              </a>
            </nav>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Auspexi. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-white text-zinc-400">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white text-zinc-400">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
