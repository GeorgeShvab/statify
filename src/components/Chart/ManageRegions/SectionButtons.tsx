import { FC } from 'react'
import { Section } from './ManageRegions'
import Button from '@/ui/Button/Button'

interface Props {
  setSection: (section: 'all' | 'selected') => void
  section: Section
}

const SectionButtons: FC<Props> = ({ section, setSection }) => {
  return (
    <div className="flex top-full py-3 px-3 gap-2 w-full">
      <Button
        className={`text-sm flex-1 ${section === 'all' ? '!bg-neutral-50' : 'text-neutral-400'}`}
        onClick={() => setSection('all')}
        color="white"
      >
        All regions
      </Button>
      <Button
        className={`text-sm flex-1 ${section === 'selected' ? '!bg-neutral-50' : 'text-neutral-400'}`}
        onClick={() => setSection('selected')}
        color="white"
      >
        Selecteds regions
      </Button>
    </div>
  )
}

export default SectionButtons
