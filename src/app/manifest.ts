import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Statify',
    short_name: 'Statify',
    description:
      'Statify is an application for viewing socio-economic statistics. Our database features 100+ indicators for hundreds of regions worldwide. Using Statify you can create customizable charts, view trends, and access hundreds of thousands of data points.',
    start_url: 'https://statify.world',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
