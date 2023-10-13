import ContentLoader from 'react-content-loader'

const Loader = () => (
  <ContentLoader
    speed={5}
    width="100%"
    height="200px"
    viewBox="0 0 100 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
)

export default Loader
