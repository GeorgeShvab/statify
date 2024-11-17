import { FC, Suspense } from "react"
import SearchBar from "@/components/searchbar/SearchBar"
import SearchBarLoader from "@/components/searchbar/SearchBarLoader"
import "@/app/(public)/styles.scss"

export { default as metadata } from "@/app/(public)/metadata"

const Home: FC = () => {
  return (
    <main className="landing">
      <div className="container">
        <div className="landing__container">
          <div>
            <h1 className="landing__title" data-testid="landing-page-heading">
              Discover the World through Data
            </h1>
            <div className="flex justify-center">
              <div className="landing__searchbar-container">
                <Suspense
                  fallback={
                    <SearchBarLoader placeholder="Example: Birth rate" />
                  }
                >
                  <SearchBar placeholder="Example: Birth rate" />
                </Suspense>
              </div>
            </div>
            <div className="landing__subtitle-container">
              <p
                className="landing__subtitle"
                data-testid="landing-page-description"
              >
                Explore our database featuring 100+ indicators for hundreds of
                regions worldwide. Create customizable charts, view trends, and
                access hundreds of thousands of data points.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
