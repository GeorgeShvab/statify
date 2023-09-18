import { Metadata } from 'next'

export default async function Home() {
  return <main></main>
}

export const metadata: Metadata = {
  title: 'Statify',
  description: 'Precious economic data by countries',
  openGraph: {
    images: ['/favicon.png'],
    title: 'Statify',
    description: 'Precious economic data by countries',
    type: 'website',
    url: `/`,
  },
}
