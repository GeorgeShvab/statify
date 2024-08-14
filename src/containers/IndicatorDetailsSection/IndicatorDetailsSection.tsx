import IndicatorOptionsButton from '@/components/IndicatorOptionsButton/IndicatorOptionsButton'
import { Country, Indicator } from '@prisma/client'
import Link from 'next/link'

interface IndicatorDetailsSectionProps {
  indicator: Indicator
  country?: Country
}

const IndicatorDetailsSection = ({
  indicator,
  country
}: IndicatorDetailsSectionProps) => {
  const title = country
    ? `${country.name} - ${indicator.label}`
    : indicator.label

  const descriptionElement = indicator.description && (
    <p
      className='text-neutral-600 mt-2'
      dangerouslySetInnerHTML={{ __html: indicator.description }}
    />
  )

  const backButton = country && (
    <p className='mt-4 text-blue text-sm'>
      <Link href={`/indicator/${indicator.id}`}>Back to all countries</Link>
    </p>
  )

  return (
    <section className='container mb-2 md:mb-3.5'>
      <div className='px-4 py-3.5 pt-4.5 md:px-7 md:py-6 rounded-lg bg-white border relative'>
        <IndicatorOptionsButton
          indicatorId={indicator.id}
          countryId={country?.id}
        />
        <h1 className='text-2xl font-bold mb-4 md:mb-5 pr-10'>{title}</h1>
        <p className='text-neutral-400 text-sm'>Source: {indicator.source}</p>
        <p className='text-neutral-400 text-sm'>Unit: {indicator.unit}</p>
        {descriptionElement}
        {backButton}
      </div>
    </section>
  )
}

export default IndicatorDetailsSection
