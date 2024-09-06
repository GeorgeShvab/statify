import { Metadata } from 'next'
import { FC } from 'react'

const Page: FC = () => {
  return (
    <div>
      <div className='min-h-main-dynamic md:min-h-main'>
        <section className='container mb-2 md:mb-3.5'>
          <div className='px-4 pt-3.5 pb-4 md:px-7 md:py-6 rounded-lg bg-white border relative'>
            <h1 className='text-2xl font-bold mb-4 md:mb-5 pr-10 mb-8'>
              Terms of Use
            </h1>
            <p className='text-neutral-600 mb-3 md:mb-4'>
              Last Updated: 01.02.2024
            </p>
            <p className='text-neutral-600 mb-3 md:mb-4'>
              Welcome to Statify! By using our website, you agree to comply with
              and be bound by the following terms of use. Please read these
              terms carefully before using Statify.
            </p>
            <h4 className='text-lg font-bold mt-6 md:mt-8 mb-2.5 md:mb-3'>
              Disclaimer of Liability
            </h4>
            <p className='text-neutral-600 mb-3 md:mb-4'>
              We do not guarantee the accuracy, completeness, or reliability of
              the data. All data is provided by IMF and The World Bank.
            </p>
            <h4 className='text-lg font-bold mt-6 md:mt-8 mb-2.5 md:mb-3'>
              Use of Information
            </h4>
            <p className='text-neutral-600 mb-3 md:mb-4'>
              Users are allowed to use statistical data from Statify for
              personal, educational, or commercial purposes. The data should not
              be used for illegal or harmful activities.
            </p>
            <h4 className='text-lg font-bold mt-6 md:mt-8 mb-2.5 md:mb-3'>
              Privacy Policy
            </h4>
            <p className='text-neutral-600 mb-3 md:mb-4'>
              Statify does not collect any users&apos; information. So there is
              no data to store or share.
            </p>
            <h4 className='text-lg font-bold mt-6 md:mt-8 mb-2.5 md:mb-3'>
              Ownership
            </h4>
            <p className='text-neutral-600 mb-3 md:mb-4'>
              All design elements, code, scripts, and programming elements used
              on Statify are the intellectual property of Heorhii Shvab.
              Unauthorized reproduction, modification, or distribution of the
              code is strictly prohibited.
            </p>
            <h4 className='text-lg font-bold mt-6 md:mt-8 mb-2.5 md:mb-3'>
              Contact Information
            </h4>
            <p className='text-neutral-600'>
              For questions, concerns, or requests related to the terms of use,
              please contact us at&nbsp;
              <a
                href='mailto:georgiy.shva@gmail.com'
                className='text-blue-500 underline'
              >
                georgiy.shvab@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use of Statify. By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.',
  themeColor: '#ffffff',
  openGraph: {
    images: ['/og.png'],
    title: 'Terms of Use',
    description:
      'Terms of Use of Statify. By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.',
    type: 'website',
    url: '/terms'
  },
  twitter: {
    images: ['/og.png'],
    title: 'Terms of Use',
    description:
      'Terms of Use of Statify. By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.',
    card: 'summary_large_image',
    site: '@Zhorrrro'
  },
  alternates: {
    canonical: `${process.env.SERVER_ADDRESS}/terms`
  }
}

export default Page
