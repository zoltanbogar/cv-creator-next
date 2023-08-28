import React from 'react'

import Header from '../component/Header/Header';

export default function MyLayout({
                                   children,
                                 }: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}