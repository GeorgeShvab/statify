import { FC } from "react"
import Button from "@/ui/button/Button"
import { ConfirmProps } from "@/components/confirm/types"
import "@/components/confirm/styles.scss"

const Confirm: FC<ConfirmProps> = ({
  onCancel,
  onConfirm,
  title,
  subtitle,
  cancelText = "Cancel",
  confirmText = "Confirm",
  severity = "info",
}) => {
  return (
    <div className="confirm">
      <h4 className="confirm__title">{title}</h4>
      {subtitle && <p className="confirm__subtitle">{subtitle}</p>}
      <div className="confirm__actions">
        <Button onClick={onCancel} size="small" color="light">
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          size="small"
          color={severity === "info" ? "dark" : "danger"}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  )
}

export default Confirm
