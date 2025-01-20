import { FC, Suspense } from "react"
import SearchBar from "@/components/searchbar/SearchBar"
import SearchBarLoader from "@/components/searchbar/SearchBarLoader"
import translate from "@/modules/i18n"
import "@/app/(public)/styles.scss"

export { default as metadata } from "@/app/(public)/metadata"

const Home: FC = () => {
  return (
    <main className="landing">
      <div className="container">
        <div className="landing__container">
          <div>
            <h1 className="landing__title" data-testid="landing-page-heading">
              {translate("pages.landing.title")}
            </h1>
            <div className="landing__searchbar-container">
              <div className="landing__searchbar-wrapper">
                <Suspense
                  fallback={
                    <SearchBarLoader
                      placeholder={translate(
                        "pages.landing.search_placeholder"
                      )}
                    />
                  }
                >
                  <SearchBar
                    placeholder={translate("pages.landing.search_placeholder")}
                  />
                </Suspense>
              </div>
            </div>
            <div className="landing__subtitle-container">
              <p
                className="landing__subtitle"
                data-testid="landing-page-description"
              >
                {translate("pages.landing.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
