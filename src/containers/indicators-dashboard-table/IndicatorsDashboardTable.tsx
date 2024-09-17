import IconButton from "@/ui/icon-button/IconButton"
import "@/containers/indicators-dashboard-table/styles.scss"

const IndicatorsDashboardTable = () => {
  return (
    <div className="table-wrapper light">
      <table className="table light">
        <thead className="table__head">
          <tr className="table__head-row">
            <th className="table__head-cell light selection-cell">
              <IconButton variant="text">
                <span
                  style={{
                    border: "1px solid #888888",
                    height: "16px",
                    width: "16px",
                    display: "block",
                    borderRadius: "4px",
                  }}
                ></span>
              </IconButton>
            </th>
            <th className="table__head-cell light id-cell">ID</th>
            <th className="table__head-cell light label-cell">Label</th>
            <th className="table__head-cell light description-cell">
              Description
            </th>
            <th className="table__head-cell light source-cell">Source</th>
            <th className="table__head-cell light unit-cell">Unit</th>
            <th className="table__head-cell light date-cell">Last update</th>
            <th className="table__head-cell light boolean-cell">Absolute</th>
            <th className="table__head-cell light boolean-cell">Hidden</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table__body-row light">
            <td className="table__body-cell light">
              <IconButton variant="text">
                <span
                  style={{
                    border: "1px solid #888888",
                    height: "16px",
                    width: "16px",
                    display: "block",
                    borderRadius: "4px",
                  }}
                ></span>
              </IconButton>
            </td>
            <td className="table__body-cell light w-10">GDP</td>
            <td className="table__body-cell light">Gross domestic product</td>
            <td className="table__body-cell light">
              Gross domestic product is a sum of all produced products during
              some time
            </td>
            <td className="table__body-cell light">World economy overlook</td>
            <td className="table__body-cell light unit-cell">%</td>
            <td className="table__body-cell light date-cell">9 16 2024</td>
            <td className="table__body-cell light boolean-cell">True</td>
            <td className="table__body-cell light boolean-cell">False</td>
          </tr>
          <tr className="table__body-row light">
            <td className="table__body-cell light">
              <IconButton variant="text">
                <span
                  style={{
                    border: "1px solid #888888",
                    height: "16px",
                    width: "16px",
                    display: "block",
                    borderRadius: "4px",
                  }}
                ></span>
              </IconButton>
            </td>
            <td className="table__body-cell light w-10">GDP</td>
            <td className="table__body-cell light">Gross domestic product</td>
            <td className="table__body-cell light">
              Gross domestic product is a sum of all produced products during
              some time
            </td>
            <td className="table__body-cell light">World economy overlook</td>
            <td className="table__body-cell light unit-cell">%</td>
            <td className="table__body-cell light date-cell">9 16 2024</td>
            <td className="table__body-cell light boolean-cell">True</td>
            <td className="table__body-cell light boolean-cell">False</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default IndicatorsDashboardTable
