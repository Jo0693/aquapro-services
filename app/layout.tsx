import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientProvider from '@/components/ClientProvider'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AquaPro Services - Plombier & Chauffagiste Paris',
  description: 'Votre expert en plomberie & chauffage — Service 24h/24 et 7j/7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter">
        <ClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  )
}
