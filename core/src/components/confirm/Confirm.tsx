import { FC, useState } from "react"
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
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)

    try {
      if (onConfirm) await onConfirm()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="confirm">
      <h4 className="confirm__title">{title}</h4>
      {subtitle && <p className="confirm__subtitle">{subtitle}</p>}
      <div className="confirm__actions">
        <Button
          onClick={onCancel}
          size="small"
          color="light"
          data-testid="cancel-action-button"
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          size="small"
          color={severity === "info" ? "dark" : "danger"}
          isLoading={isLoading}
          data-testid="confirm-action-button"
        >
          {confirmText}
        </Button>
      </div>
    </div>
  )
}

export default Confirm
