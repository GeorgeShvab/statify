import ContentLoader from "react-content-loader"

const ChartLoader = () => {
  return (
    <div className="container">
      <ContentLoader
        speed={5}
        width="100%"
        height="613px"
        viewBox="0 0 1000 613"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" rx="8" ry="8" width="100%" height="613" />
      </ContentLoader>
    </div>
  )
}

export default ChartLoader
