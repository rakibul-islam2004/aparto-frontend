import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QueryClientProviderWrapper } from '@/components/providers/query-client-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Aparto - Apartment Accessories Bangladesh',
    template: '%s | Aparto',
  },
  description: 'Premium apartment accessories, home decor, and space-saving solutions for modern living in Bangladesh. Curated collections for bedroom, bathroom, kitchen, and living room.',
  keywords: ['apartment accessories', 'home decor', 'bangladesh', 'space saving', 'bedroom decor', 'bathroom accessories', 'kitchen accessories', 'living room'],
  authors: [{ name: 'Aparto BD' }],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: 'https://aparto.com.bd',
    siteName: 'Aparto BD',
    title: 'Aparto - Apartment Accessories Bangladesh',
    description: 'Premium apartment accessories for modern living in Bangladesh',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aparto - Apartment Accessories Bangladesh',
    description: 'Premium apartment accessories for modern living in Bangladesh',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          {children}
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
