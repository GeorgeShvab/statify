'use client'

import IconButton from '@/ui/IconButton/IconButton'
import { FC, useRef, useState } from 'react'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import dynamic from 'next/dynamic'
import DropdownItem from '@/ui/Dropdown/DropdownItem'

const Dropdown = dynamic(() => import('@/ui/Dropdown/Dropdown'), { ssr: false })

interface Props {
  countryId?: string
  indicatorId: string
}

const IndicatorOptionsButton: FC<Props> = (props) => {
  const anchor = useRef<HTMLButtonElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const handleCloseOptions = () => setIsDropdownOpen(false)

  const handleToggleOptions = () => setIsDropdownOpen((prev) => !prev)

  return (
    <>
      <IconButton
        className="absolute right-2 top-2.5 md:right-5 md:top-4 !bg-transparent !text-black transition-all"
        onClick={handleToggleOptions}
        ref={anchor}
        aria-label="Open options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </IconButton>
      <Dropdown anchor={anchor} isOpen={isDropdownOpen} onClose={handleCloseOptions} className="" renderHidden>
        <BookmarkButton {...props} />
        <DropdownItem
          containerEl="a"
          containerProps={{
            href: `/api/download/${props.indicatorId}${props.countryId ? `/${props.countryId}` : ''}?format=csv`,
            download: true,
          }}
          icon={
            <svg fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 transition-all">
              <path
                fillRule="evenodd"
                d="M14 4.5V14a2 2 0 01-2 2h-1v-1h1a1 1 0 001-1V4.5h-2A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v9H2V2a2 2 0 012-2h5.5L14 4.5zM3.517 14.841a1.13 1.13 0 00.401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 00-.375-.357 2.027 2.027 0 00-.566-.21l-.621-.144a.97.97 0 01-.404-.176.37.37 0 01-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 01.246.181.56.56 0 01.12.258h.75a1.092 1.092 0 00-.2-.566 1.21 1.21 0 00-.5-.41 1.813 1.813 0 00-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 01.152.326.505.505 0 01-.085.29.559.559 0 01-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 01-.248-.115.578.578 0 01-.255-.384h-.765zM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 01.302-.399.814.814 0 01.475-.137c.15 0 .283.032.398.097a.7.7 0 01.272.26.85.85 0 01.12.381h.765v-.072a1.33 1.33 0 00-.466-.964 1.441 1.441 0 00-.489-.272 1.838 1.838 0 00-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 00.226-.674v-.076h-.764a.799.799 0 01-.118.363.7.7 0 01-.272.25.874.874 0 01-.401.087.845.845 0 01-.478-.132.833.833 0 01-.299-.392 1.699 1.699 0 01-.102-.627v-.495zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4z"
              />
            </svg>
          }
        >
          Download as CSV
        </DropdownItem>
        <DropdownItem
          containerEl="a"
          containerProps={{
            href: `/api/download/${props.indicatorId}${props.countryId ? `/${props.countryId}` : ''}?format=xlsx`,
            download: true,
          }}
          icon={
            <svg fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 transition-all">
              <path
                fillRule="evenodd"
                d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v9H2V2a2 2 0 012-2h5.5L14 4.5zM7.86 14.841a1.13 1.13 0 00.401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 00.187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 00-.375-.357 2.028 2.028 0 00-.565-.21l-.621-.144a.97.97 0 01-.405-.176.37.37 0 01-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 01.245.181.56.56 0 01.12.258h.75a1.093 1.093 0 00-.199-.566 1.21 1.21 0 00-.5-.41 1.813 1.813 0 00-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 01.153.326.512.512 0 01-.085.29.558.558 0 01-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 01-.249-.115.578.578 0 01-.255-.384h-.764zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438z"
              />
            </svg>
          }
        >
          Download as XLSX
        </DropdownItem>
      </Dropdown>
    </>
  )
}

export default IndicatorOptionsButton
