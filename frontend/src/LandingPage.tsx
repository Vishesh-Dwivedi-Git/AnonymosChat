import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FeaturesSectionDemo } from './components/FeaturesDemo'
import { TimelineDemo } from './components/how'
import { Demo } from './components/Demo'
import { Footer } from './components/Footer'


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <Header />
      <Hero />
      <FeaturesSectionDemo />
      <TimelineDemo />
      <Demo />
      <Footer />
    </div>
  )
}

