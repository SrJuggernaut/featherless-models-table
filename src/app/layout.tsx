import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import type { FC, ReactNode } from 'react'

const OpenSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
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
