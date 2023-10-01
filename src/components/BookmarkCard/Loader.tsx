import ContentLoader from 'react-content-loader'

const Loader = () => (
  <ContentLoader
    speed={5}
    width={'100%'}
    height={'200px'}
    viewBox="0 0 100% 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="200" />
  </ContentLoader>
)

export default Loader
