import { FC } from "react"
import Link from "next/link"
import { CountryIndicator } from "@/types/indicator.types"
import "@/components/searchbar/components/searchbar-autocomplete-item/styles.scss"

const SearchbarAutocompleteItem: FC<CountryIndicator> = ({
  id,
  countryId,
  countryName,
  label,
}) => {
  return (
    <li className="searchbar__autocomplete-item">
      <Link
        href={`/indicator/${id}${countryId ? "/" + countryId : ""}`}
        className="searchbar__autocomplete-link"
      >
        {countryId ? countryName + " - " : ""}
        {label}
      </Link>
    </li>
  )
}

export default SearchbarAutocompleteItem
