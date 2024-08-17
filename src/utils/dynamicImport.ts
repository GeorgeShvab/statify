import dynamic, { DynamicOptions } from 'next/dynamic'

const dynamicImport = (
  src: string,
  options: DynamicOptions = { ssr: false }
) => {
  return dynamic(() => import(src), { ssr: false })
}

export default dynamicImport
