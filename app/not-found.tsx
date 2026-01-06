import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { Leaf } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-cream text-forest p-4 text-center">
      <div className="bg-leaf/20 p-6 rounded-full mb-6 animate-pulse">
        <Leaf size={64} className="text-forest" />
      </div>
      <h2 className="font-heading text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-stone-dark mb-8 max-w-md">
        Looks like you've wandered off the path. Let's get you back to the green zone.
      </p>
      <Button asChild size="lg">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}