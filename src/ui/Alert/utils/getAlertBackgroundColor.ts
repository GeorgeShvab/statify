const getAlertBackgorundColor = (severity: string) => {
  switch (severity) {
    case 'success':
      return 'bg-green-400'
    case 'danger':
      return 'bg-red-500'
    default:
      return 'bg-sky-500'
  }
}

export default getAlertBackgorundColor
