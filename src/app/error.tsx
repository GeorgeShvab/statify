'use client'

import { FC } from 'react'

const Error: FC = () => {
  return (
    <main className="bg-white">
      <div className="container">
        <div className="flex flex-col h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height)-var(--footer-height))] justify-center items-center">
          <div>
            <div className="px-2 md:px-0">
              <div className="flex justify-center mb-16">
                <svg width="223" height="101" viewBox="0 0 223 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.7875 1.79758C9.13531 3.14541 8.9614 3.97149 7.48314 14.4932C6.39618 22.1889 6.35271 22.928 7.00488 23.8845C8.22227 25.7976 11.3962 25.7541 12.4397 23.7976C12.744 23.2324 15.0918 8.62367 15.0918 7.3628C15.0918 7.27584 25.0918 7.18888 37.2657 7.18888H59.4396V11.5367V15.8845H41.8744C25.7005 15.8845 24.2223 15.928 23.3527 16.6671C22.5266 17.3193 22.2223 18.7541 20.7005 28.8845C18.831 41.4497 18.8744 42.1889 21.2657 43.015C22.5701 43.4932 23.3527 43.1454 27.7005 40.4063C30.9179 38.3628 33.7005 37.6237 38.0483 37.6237C42.5266 37.6237 46.0918 38.4932 50.0483 40.5802C56.0049 43.7106 60.3092 48.7976 62.657 55.4497C63.8309 58.7976 63.9614 59.6671 63.9614 64.7976C63.9614 69.4932 63.8309 70.9715 62.9614 73.7106C61.3527 78.928 59.6135 81.841 55.5266 85.8845C51.4396 89.9715 48.0918 91.928 42.744 93.3628C38.744 94.4062 27.3962 94.4932 23.5701 93.4932C15.7875 91.4497 9.13531 84.841 7.13531 77.1019L6.48314 74.5802H12.4397H18.3962L19.3962 76.928C20.7875 80.3628 23.3092 82.9715 26.744 84.6671C29.4397 86.0149 29.9614 86.1019 34.0049 86.1019C38.0049 86.1019 38.6136 85.9715 41.2657 84.7106C44.8309 83.0149 47.5701 80.3628 49.2657 76.928C50.5266 74.3628 50.5266 74.3628 50.5266 66.1019C50.5266 58.0584 50.4831 57.7541 49.3527 55.3628C47.744 51.928 45.0918 49.1889 41.657 47.4932C38.9614 46.1889 38.5701 46.1019 33.7875 46.1019C27.8744 46.1019 25.9179 46.7976 22.7005 49.9715L20.7005 51.9715H14.6136H8.48314L8.74401 50.7541C9.26575 48.2323 10.3092 40.5802 10.3092 39.2323C10.3092 36.4063 7.00488 34.841 5.09184 36.7541C4.09184 37.7541 4.09184 37.6237 2.70053 47.2758C1.65706 54.4063 1.61358 55.0584 2.26575 56.2758C2.61358 57.0149 3.30923 57.7976 3.74401 58.0584C4.26575 58.3193 8.30923 58.4932 13.7875 58.4932C24.0483 58.4932 24.744 58.3193 26.3962 55.6671C27.9179 53.1889 30.1788 52.2758 34.4396 52.4932C37.4396 52.5802 38.2657 52.7976 39.7875 53.841C40.7875 54.4932 42.1353 55.841 42.7875 56.841C43.9614 58.5802 44.0049 58.8845 44.1353 65.3628C44.2657 71.841 44.2657 72.1454 43.1353 74.3628C41.2223 78.3193 37.0918 80.3193 32.1788 79.6236C28.3962 79.1019 25.5701 76.4062 24.7005 72.4062C24.4397 71.1454 23.7875 70.0149 22.9179 69.2323L21.6136 68.0584H12.657C2.65705 68.0584 1.78749 68.2758 0.483143 71.0149C-0.4299 72.928 -0.0385963 76.3193 1.5701 81.0149C4.52662 89.5367 11.1788 96.0584 20.0918 99.2323C23.4831 100.406 23.7875 100.45 32.7005 100.45C43.1353 100.45 45.0918 100.102 51.0483 97.1888C60.0483 92.7541 66.8744 84.4497 69.5266 74.6671C70.2222 72.0584 70.4396 69.9715 70.4396 65.2323C70.4831 57.8845 69.8309 54.7976 67.0048 48.9715C65.3092 45.4932 64.3962 44.2758 61.0049 40.928C56.5701 36.4932 53.0918 34.2758 47.9179 32.5367C44.7875 31.4497 43.8309 31.3628 38.1353 31.3628C32.744 31.3628 31.4831 31.4932 29.2657 32.3193L26.7005 33.2758L27.0049 31.1889C27.1353 30.0584 27.4831 27.6237 27.744 25.7541L28.2223 22.4063H44.9614C63.0918 22.4063 63.1353 22.4063 65.0483 19.9715C65.8744 18.8845 65.9614 18.2324 65.9614 11.6671C65.9614 6.14541 65.8309 4.23236 65.3092 3.27584C63.9179 0.62367 64.5266 0.667148 37.0918 0.667148H12.1353L10.7875 1.79758Z"
                    fill="#121212"
                  />
                  <path
                    d="M105.309 1.36269C98.7441 2.9279 93.918 5.66703 88.918 10.667C85.7006 13.9279 84.8745 15.1018 82.9615 18.9714C81.6571 21.7105 80.5267 24.7975 80.0919 26.8844C78.9615 32.5801 78.3963 49.1888 78.9615 60.9714C79.4832 71.58 79.9615 75.1453 81.5702 79.3627C83.4832 84.3627 85.2658 85.8844 87.6571 84.5366C89.5267 83.4931 89.7441 81.9713 88.4397 79.0583C86.5702 74.8409 86.005 71.4496 85.4832 60.754C84.918 49.2322 85.4832 32.4931 86.6571 27.667C88.005 21.8409 91.7876 16.0583 96.5267 12.5801C100.135 9.9279 101.918 9.01486 105.831 8.01486C120.831 4.18877 135.657 13.4931 138.875 28.7975C139.961 33.8409 139.961 67.4931 138.875 72.5366C137.701 78.1018 135.527 82.0583 131.396 86.2322C125.875 91.7105 120.092 94.1453 112.353 94.1453C108.135 94.1453 103.353 92.9713 100.005 91.0583C97.4397 89.667 96.1789 89.4931 94.7876 90.4496C93.5267 91.3192 93.1789 93.0148 93.9615 94.4931C94.4397 95.4061 95.6571 96.2322 98.4397 97.4931C103.309 99.7539 107.44 100.667 112.57 100.667C121.744 100.624 129.309 97.58 135.744 91.3192C139.614 87.5366 141.831 84.1453 143.614 79.3627C145.918 73.1887 146.179 70.6235 146.179 50.667C146.179 31.2757 145.918 28.2757 143.918 22.6235C140.222 12.1888 131.483 4.27573 120.57 1.5366C116.44 0.49312 109.266 0.406164 105.309 1.36269Z"
                    fill="#121212"
                  />
                  <path
                    d="M181.353 1.27583C171.44 3.5367 162.744 10.5367 158.527 19.5802C156.179 24.7106 155.57 27.7106 155.005 37.5367C154.44 47.3193 154.614 48.1019 156.918 48.8845C158.527 49.4497 160.657 48.4932 160.918 47.0584C161.048 46.5367 161.309 42.3628 161.57 37.841C161.831 33.2758 162.353 28.4063 162.701 27.015C164.527 20.1454 170.179 13.1019 176.396 10.1019C180.744 7.97148 184.048 7.18888 188.57 7.18888C195.918 7.18888 202.048 9.75409 207.266 14.9715C210.918 18.6237 213.266 22.6237 214.396 27.0584C216.44 34.8845 216.396 66.4932 214.396 74.3628C212.048 83.3628 204.135 91.1454 194.875 93.4932C191.179 94.4497 185.527 94.3193 181.614 93.2323C176.744 91.8845 173.527 90.0149 169.875 86.3193C164.527 81.0149 162.266 75.7975 161.831 67.6671C161.309 59.2758 160.831 58.0584 158.005 58.0584C155.483 58.0584 154.875 59.1889 155.005 63.841C155.309 75.0149 157.396 81.7106 162.483 88.1019C166.527 93.2323 171.614 96.7975 178.005 99.1019C181.657 100.363 182.135 100.45 188.57 100.45C195.005 100.45 195.483 100.363 199.135 99.1019C210.005 95.1888 218.005 86.5801 220.744 75.7541C223.048 66.6236 223.005 34.6671 220.744 25.5802C217.961 14.5367 209.875 5.92801 198.788 2.1454C195.875 1.1454 194.396 0.971487 189.657 0.841052C185.875 0.710617 183.135 0.88453 181.353 1.27583Z"
                    fill="#121212"
                  />
                  <path
                    d="M107.831 15.4495C104.179 16.6669 100.483 20.0582 98.8311 23.6669C97.3093 27.1451 96.8311 33.0582 96.8311 50.6669C96.8311 68.2756 97.3093 74.1886 98.8311 77.6669C101.44 83.4495 107.831 87.2321 113.961 86.5799C119.222 86.0582 124.135 82.5799 126.353 77.7973C128.005 74.3625 128.309 69.8408 128.309 50.4495C128.309 31.1451 128.005 27.0147 126.353 23.493C123.092 16.5799 115.048 13.1017 107.831 15.4495ZM117.44 22.7104C120.396 24.7538 121.135 26.8408 121.614 34.6234C122.135 43.1886 122.135 58.1451 121.614 66.7103C121.266 72.1016 121.005 73.7538 120.266 75.319C118.483 79.0147 114.092 80.9712 110.179 79.7973C107.744 79.1016 104.918 76.1886 104.179 73.7103C103.353 70.9277 103.309 30.4495 104.135 27.7104C105.875 21.9278 112.657 19.3625 117.44 22.7104Z"
                    fill="#121212"
                  />
                  <path
                    d="M184.962 15.0149C180.701 16.1019 176.657 19.4932 174.788 23.5367C173.179 27.0149 172.788 32.5801 172.788 50.6671C172.788 74.0584 173.353 77.6671 177.918 82.1888C180.962 85.2758 184.048 86.5366 188.57 86.5366C191.788 86.5366 192.614 86.3627 194.831 85.2758C198.092 83.6671 200.701 81.1018 202.222 77.9714C203.918 74.4931 204.309 69.2323 204.309 50.6671C204.309 32.1019 203.918 26.841 202.222 23.3627C199.744 18.2758 195.048 15.1019 189.57 14.7975C187.962 14.7106 185.875 14.7975 184.962 15.0149ZM193.048 22.5367C194.527 23.4062 195.309 24.2758 196.135 25.9714C197.222 28.1453 197.266 28.841 197.744 39.4932C198.092 47.841 198.092 53.6236 197.744 61.8845C197.266 72.4497 197.179 73.1888 196.135 75.3627C193.048 81.6671 184.092 81.6671 181.005 75.3627C179.918 73.1888 179.875 72.4931 179.396 61.841C178.831 49.6671 179.396 30.0149 180.396 27.1453C181.179 24.7975 182.483 23.3627 184.831 22.1453C187.614 20.754 190.222 20.8845 193.048 22.5367Z"
                    fill="#121212"
                  />
                </svg>
              </div>
              <h1 className="text-center text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 leading-normal">
                Server Error
              </h1>
              <div className="text-neutral-400 hover:text-neutral-800 transition-colors text-center">
                <a href="/">To home page</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Error
