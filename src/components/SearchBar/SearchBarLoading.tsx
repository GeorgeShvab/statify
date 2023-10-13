import React from 'react'
import ContentLoader from 'react-content-loader'

const SearchBarLoading = () => (
  <ContentLoader
    speed={5}
    width="100%"
    height="40px"
    viewBox="0 0 1000 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="6" ry="6" width="100%" height="100%" />
  </ContentLoader>
)

export default SearchBarLoading
