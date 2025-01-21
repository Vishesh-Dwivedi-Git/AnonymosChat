import { Share2, Dice1Icon as Dice, MessageSquareX } from 'lucide-react'

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-lg text-center shadow-lg hover:shadow-blue-500/50 transition-all border border-gray-800 hover:border-blue-500">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2 text-blue-400">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

export function Features() {
  return (
    <section className="relative py-20 bg-black font-grotesk text-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-500 drop-shadow-lg">Features</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Share2 className="w-14 h-14 text-blue-500 drop-shadow-lg" />}
            title="Share Your Secrets"
            description="A safe space to share your deepest thoughts anonymously."
          />
          <FeatureCard
            icon={<Dice className="w-14 h-14 text-blue-500 drop-shadow-lg" />}
            title="Dare to Play"
            description="Engage in thrilling anonymous games and challenges."
          />
          <FeatureCard
            icon={<MessageSquareX className="w-14 h-14 text-blue-500 drop-shadow-lg" />}
            title="Discuss the Undiscussable"
            description="Talk about topics you can't elsewhere, judgment-free."
          />
        </div>
      </div>
    </section>
  )
}
