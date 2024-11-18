import ContentLoader from "react-content-loader"
import "@/components/indicator-card/styles.scss"

const Loader = () => (
  <div className="indicator-card-loader">
    <ContentLoader
      speed={5}
      width="100%"
      height="200px"
      viewBox="0 0 100 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" rx="3" ry="3" width="100%" height="200px" />
    </ContentLoader>
  </div>
)

export default Loader
