import type { PropsWithChildren } from 'react'
import { DisclaimerBox } from '../common/DisclaimerBox'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl px-4 pt-4">
        <DisclaimerBox />
      </div>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      <Footer />
    </div>
  )
}
