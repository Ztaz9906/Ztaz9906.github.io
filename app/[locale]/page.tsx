import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { ArchitectureSection } from "@/components/diagrams/ArchitectureSection"
import { Skills } from "@/components/sections/skills"
import { Stats } from "@/components/sections/stats"
import { HomeTerminalFallback } from "@/components/terminal/HomeTerminalFallback"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects locale={locale} />
        <ArchitectureSection />
        <Skills />
        <Stats />
        <HomeTerminalFallback />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
