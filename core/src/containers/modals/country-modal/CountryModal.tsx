import { FC } from "react"
import Button from "@/ui/button/Button"
import Tags from "@/ui/tag/components/tags/Tags"
import { CountryModalProps } from "@/containers/modals/country-modal/types"
import EditCountryModal from "@/containers/modals/edit-country-modal/EditCountryModal"
import DataList from "@/components/data-list/DataList"
import DataListItem from "@/components/data-list/components/data-list-item/DataListItem"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import cn from "@/utils/cn/cn"
import translate from "@/modules/i18n"
import "@/containers/modals/country-modal/styles.scss"

const CountryModal: FC<CountryModalProps> = ({ country }) => {
  const { openModal } = useModal()

  const handleEditCountry = () => {
    openModal(<EditCountryModal country={country} />)
  }

  const searchTags = country.searchTags.length ? (
    <Tags className="country-modal__tags" data={country.searchTags} />
  ) : (
    "null"
  )

  const createdAtDate = new Date(country.createdAt).toLocaleDateString()
  const updatedAtDate = new Date(country.updatedAt).toLocaleDateString()

  return (
    <ModalContainer
      title={translate("pages.countries_dashboard.country_information")}
      size="small"
    >
      <DataList>
        <DataListItem
          label={translate("common.id")}
          data={country.id}
          data-testid="country-modal-id"
        />
        <DataListItem
          label={translate("common.iso2code")}
          data={country.iso2Code}
          data-testid="country-modal-iso2code"
        />
        <DataListItem
          label={translate("common.geocode")}
          data={country.geoCode}
          data-testid="country-modal-geocode"
        />
        <DataListItem
          label={translate("common.name")}
          data={country.name}
          data-testid="country-modal-name"
        />
        <DataListItem
          label={translate("common.type")}
          data={country.type}
          data-testid="country-modal-type"
        />
        <DataListItem
          label={translate("common.date_of_update")}
          data={updatedAtDate}
          data-testid="country-modal-updatedAt"
        />
        <DataListItem
          label={translate("common.date_of_creation")}
          data={createdAtDate}
          data-testid="country-modal-createdAt"
        />
        <DataListItem
          label={translate("common.search_tags")}
          data-testid="country-modal-tags"
          className={cn(
            country.searchTags.length && "country-modal__tags-section"
          )}
          data={searchTags}
        />
      </DataList>
      <Button
        color="dark"
        className="full-width"
        data-testid="country-modal-edit-button"
        onClick={handleEditCountry}
      >
        {translate("common.edit")}
      </Button>
    </ModalContainer>
  )
}

export default CountryModal
