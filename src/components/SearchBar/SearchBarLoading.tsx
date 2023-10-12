import React from 'react'
import ContentLoader from 'react-content-loader'

const SearchBarLoading = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={40}
    viewBox="0 0 100% 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="40" />
  </ContentLoader>
)

export default SearchBarLoading
