import { FC } from "react"
import Label from "@/ui/label/Label"
import Tag from "@/ui/tag/Tag"
import ModalContainer from "@/components/modal-container/ModalContainer"
import "./styles.scss"
import { IndicatorModalProps } from "./types"

const IndicatorModal: FC<IndicatorModalProps> = ({ indicator }) => {
  const searchTags = indicator.searchTags.length ? (
    indicator.tags.map((item, index) => <Tag key={item + index}>{item}</Tag>)
  ) : (
    <p className="indicator-modal__text">Unset</p>
  )

  return (
    <ModalContainer>
      <div className="indicator-modal">
        <h3 className="indicator-modal__title">Indicator</h3>
        <p className="indicator-modal__subtitle">{indicator.id ?? "Unset"}</p>
        <div>
          <Label
            className="indicator-modal__label-container"
            label="Indicator name"
          >
            <p className="indicator-modal__text">
              {indicator.label ?? "Unset"}
            </p>
          </Label>
          <Label
            className="indicator-modal__label-container"
            label="Indicator description"
          >
            <p className="indicator-modal__text">
              {indicator.description ?? "Unset"}
            </p>
          </Label>
          <Label
            className="indicator-modal__label-container"
            label="Search tags"
          >
            <div style={{ display: "flex", gap: "10px" }}>{searchTags}</div>
          </Label>
          <div className="indicator-modal__label-group indicator-modal__label-container">
            <Label label="Source" className="indicator-form__label">
              <p className="indicator-modal__text">
                {indicator.source ?? "Unset"}
              </p>
            </Label>
            <Label label="Dataset" className="indicator-form__label">
              <p className="indicator-modal__text">
                {indicator.dataset ?? "Unset"}
              </p>
            </Label>
          </div>
          <div className="indicator-modal__label-group indicator-modal__label-container">
            <Label label="Unit" className="indicator-form__label">
              <p className="indicator-modal__text">
                {indicator.unit ?? "Unset"}
              </p>
            </Label>
            <Label label="Unit symbol" className="indicator-form__label">
              <p className="indicator-modal__text">
                {indicator.unitSymbol ?? "Unset"}
              </p>
            </Label>
          </div>
          <div className="indicator-modal__label-group indicator-modal__label-container">
            <Label label="Precision" className="indicator-form__label">
              <p className="indicator-modal__text">
                {indicator.precision ?? "Unset"}
              </p>
            </Label>
            <Label label="Rank" className="indicator-form__label">
              <p className="indicator-modal__text">
                {indicator.ranking ?? "Unset"}
              </p>
            </Label>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default IndicatorModal
