import IndicatorCard from '@/components/IndicatorCard/IndicatorCard'
import IndicatorService from '@/services/IndicatorService'
import { Metadata } from 'next'
import { FC } from 'react'

const Home: FC = async () => {
  const data = await IndicatorService.getMany({
    ids: ['LP', 'GDP', 'PPPGDP', 'SITC1_total', 'CG_DEBT_GDP', 'NGDP_RPCH', 'PPPPC'],
  })

  return (
    <main className="mb-3 md:mb-5">
      <div className="flex flex-col min-h-[calc(100vh-var(--header-height))]">
        <div className="flex-1">
          <div className="container">
            <h2 className="mb-1.5 md:mb-3 px-2 font-semibold">Popular Datasets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {data.map((item) => (
                <IndicatorCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
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

export default Home
