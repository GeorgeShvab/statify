import { FC } from "react"
import Button from "@/ui/button/Button"
import Label from "@/ui/label/Label"
import Tags from "@/ui/tag/components/tags/Tags"
import EditIndicatorModal from "@/containers/modals/edit-indicator-modal/EditIndicatorModal"
import { IndicatorModalProps } from "@/containers/modals/indicator-modal/types"
import DataList from "@/components/data-list/DataList"
import DataListDivider from "@/components/data-list/components/data-list-divider/DataListDivider"
import DataListItem from "@/components/data-list/components/data-list-item/DataListItem"
import ModalContainer from "@/components/modal-container/ModalContainer"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import cn from "@/utils/cn/cn"
import "@/containers/modals/indicator-modal/styles.scss"

const IndicatorModal: FC<IndicatorModalProps> = ({ indicator }) => {
  const { openModal } = useModal()

  const handleEditIndicator = () => {
    openModal(<EditIndicatorModal indicator={indicator} />)
  }

  const searchTags = indicator.searchTags.length ? (
    <Tags className="indicator-modal__tags" data={indicator.searchTags} />
  ) : (
    "null"
  )

  const createdAtDate = new Date(indicator.createdAt).toLocaleDateString()
  const updatedAtDate = new Date(indicator.updatedAt).toLocaleDateString()

  return (
    <ModalContainer title="Indicator Information" size="medium">
      <DataList>
        <Label label="Indicator name">
          <p
            className="indicator-modal__text"
            data-testid="indicator-modal-name"
          >
            {indicator.label}
          </p>
        </Label>
        <Label label="Indicator description">
          <p
            className="indicator-modal__text"
            data-testid="indicator-modal-description"
          >
            {indicator.description}
          </p>
        </Label>
        <DataListDivider />
        <DataListItem
          label="Indicator ID"
          data={indicator.id}
          data-testid="indicator-modal-id"
        />
        <DataListItem label="Indicator source" data={indicator.source} />
        <DataListItem label="Indicator dataset" data={indicator.dataset} />
        <DataListItem label="Indicator unit" data={indicator.unit} />
        <DataListItem
          label="Indicator unit symbol"
          data={indicator.unitSymbol}
        />
        <DataListItem label="Indicator precision" data={indicator.precision} />
        <DataListItem label="Indicator rank" data={indicator.ranking} />
        <DataListItem label="Date of update" data={updatedAtDate} />
        <DataListItem label="Date of creation" data={createdAtDate} />
        <DataListItem
          label="Search tags"
          data-testid="indicator-modal-tags"
          className={cn(
            indicator.searchTags.length && "indicator-modal__tags-section"
          )}
          data={searchTags}
        />
      </DataList>
      <Button
        className="full-width"
        onClick={handleEditIndicator}
        data-testid="indicator-modal-edit-button"
      >
        Edit
      </Button>
    </ModalContainer>
  )
}

export default IndicatorModal
