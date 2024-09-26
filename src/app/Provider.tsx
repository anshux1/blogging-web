"use client";
import { EdgeStoreProvider } from '@/lib/edgestore'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export function Providers({ children }: { children : ReactNode } ) {
  return (
    <SessionProvider>
      <EdgeStoreProvider>
        {children}
      </EdgeStoreProvider>
    </SessionProvider>
  )
}

