"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, Bot, User, Check, ChevronRight, ArrowRight } from "lucide-react"

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey, I’m your AI builder. What shall we create?" },
    { role: "user", content: "A sleek landing page for ‘weby’." },
    { role: "assistant", content: "Great. I’ll use Inter, black background, white text and a hover lighting effect. Pricing too?" },
    { role: "user", content: "Yes — $49 Product and $99 Pro+." },
    { role: "assistant", content: "Done. Anything else to customize before preview?" },
  ])
  const [input, setInput] = useState("")

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      document.documentElement.style.setProperty("--mx", `${x}px`)
      document.documentElement.style.setProperty("--my", `${y}px`)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages((prev) => [...prev, { role: "user", content: input.trim() }])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Mock: generating interface preview, components, and deployment steps. (This is a static demo.)",
        },
      ])
    }, 500)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="hover-lighting" />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-900/80 bg-black/70 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-white/90" />
            <span className="text-xl font-extrabold tracking-tight">
              <span className="gradient-text">weby</span>
              <span className="text-white/60"> ai</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#chat" className="hover:text-white">Builder</a>
            <span className="mx-2 h-4 w-px bg-white/10" />
            <button className="text-white/70 hover:text-white">Sign in</button>
            <Button className="bg-white text-black hover:bg-white/90">Start building</Button>
          </nav>
          <div className="md:hidden">
            <Button className="bg-white text-black hover:bg-white/90">Start</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-16 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> Chat-first site & app builder
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Build websites, apps, and Telegram bots by chatting with <span className="gradient-text">weby</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              Describe what you want. Watch a minimal, professional interface take shape instantly.
              Inter font, black background, white text — sleek by default.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#chat">
                <Button className="bg-white text-black hover:bg-white/90">
                  Start building <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#pricing">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  See pricing
                </Button>
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-white/60">
              <Check className="h-4 w-4 text-white/70" /> No-code, chat-only flow
              <span className="h-3 w-px bg-white/10" />
              <Check className="h-4 w-4 text-white/70" /> Clean, minimal UI
              <span className="h-3 w-px bg-white/10" />
              <Check className="h-4 w-4 text-white/70" /> Deploy-ready mock
            </div>
          </div>

          {/* Chat UI Mock */}
          <div id="chat">
            <Card className="bg-white/5 border-white/10 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white/90">AI Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 overflow-y-auto space-y-3">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                      <div className={`chat-bubble max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        m.role === "assistant" ? "bg-white/5 border-white/15" : "bg-white text-black border-white/80"
                      }`}>
                        <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
                          {m.role === "assistant" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                          <span>{m.role === "assistant" ? "weby" : "you"}</span>
                        </div>
                        <p className="leading-relaxed">{m.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSend} className="mt-4 flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe what to build…"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Button type="submit" className="bg-white text-black hover:bg-white/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="mt-2 text-xs text-white/50">Tip: Try “Generate a Telegram bot that replies with my store hours.”</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Chat-first builder", desc: "Describe, iterate, and preview instantly." },
              { title: "Sleek UI kit", desc: "Minimal components with professional defaults." },
              { title: "Telegram-ready", desc: "Plan flows for bots with prompts." },
              { title: "Deployment steps", desc: "Get mock deploy instructions." },
              { title: "Version-friendly", desc: "Iterate with messages; nothing is final." },
              { title: "Dark by default", desc: "Inter font, black bg, white text." },
            ].map((f) => (
              <Card key={f.title} className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white/90 text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-white/70 text-sm leading-relaxed">{f.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-16 lg:py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Simple pricing</h2>
              <p className="text-white/70 mt-2">Start with Product, scale with Pro+.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white/90">Product</CardTitle>
                  <span className="text-3xl font-extrabold">$49</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/75 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Chat builder UI mock</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> 1 project</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Community support</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Mock deploy steps</li>
                </ul>
                <Button className="mt-6 w-full bg-white text-black hover:bg-white/90">Subscribe</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/80 mb-2">
                      <Sparkles className="h-3.5 w-3.5" /> Recommended
                    </div>
                    <CardTitle className="text-white">Pro+</CardTitle>
                  </div>
                  <span className="text-3xl font-extrabold">$99</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/85 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Everything in Product</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited projects</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Private export</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Priority support</li>
                </ul>
                <Button className="mt-6 w-full bg-white text-black hover:bg-white/90">Subscribe</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="font-semibold"><span className="gradient-text">weby</span> <span className="text-white/60">ai</span></span>
            <span className="mx-2 h-3 w-px bg-white/10" />
            <span>Minimal, advanced, professional.</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#pricing">Pricing</a>
            <a className="hover:text-white" href="#chat">Builder</a>
          </div>
        </div>
      </footer>
    </main>
  )
}