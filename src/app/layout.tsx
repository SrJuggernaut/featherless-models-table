import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import type { FC, ReactNode } from 'react'
import './global.css'

const OpenSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Featherless Models Table',
  description: 'A dynamic table of Featherless Models that can be filtered, sorted, and paginated. Updated every hour.'
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${OpenSans.className}`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
