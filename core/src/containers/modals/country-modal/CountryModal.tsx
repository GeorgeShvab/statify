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
    <ModalContainer title="Country Information" size="small">
      <DataList>
        <DataListItem label="Country ID" data={country.id} />
        <DataListItem label="Iso2Code" data={country.iso2Code} />
        <DataListItem label="GeoCode" data={country.geoCode} />
        <DataListItem label="Country name" data={country.name} />
        <DataListItem label="Country type" data={country.type} />
        <DataListItem label="Date of update" data={updatedAtDate} />
        <DataListItem label="Date of creation" data={createdAtDate} />
        <DataListItem
          label="Search tags"
          className={cn(
            country.searchTags.length && "country-modal__tags-section"
          )}
          data={searchTags}
        />
      </DataList>
      <Button color="dark" className="full-width" onClick={handleEditCountry}>
        Edit
      </Button>
    </ModalContainer>
  )
}

export default CountryModal
