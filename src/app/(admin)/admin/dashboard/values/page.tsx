import Button from "@/ui/button/Button"
import "@/app/(admin)/admin/dashboard/values/styles.scss"
import Input from "@/ui/input/Input"
import IconButton from "@/ui/icon-button/IconButton"

const AdminPage = () => {
  return (
    <main className="container">
      <div className="admin-dashboard">
        <div className="admin-dashboard__header">
          <div>
            <h1 className="admin-dashboard__header-title">
              Countries Dashboard
            </h1>
            <p className="admin-dashboard__header-subtitle">
              Manage country data here: view and edit country information.
            </p>
          </div>
          <nav className="admin-navbar">
            <Button color="dark" className="gap-3 pl-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Add New</span>
            </Button>
            <IconButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </IconButton>
          </nav>
        </div>
        <div className="dahboard-table-container">
          <Input
            className="w-96"
            placeholder="Search by ID, name, geocode or iso2code..."
          />
          <Button color="dark">Sort by name</Button>

          <Button color="dark">Filters</Button>

          {/*<Button color="white">Hidden</Button>
          <Button color="white">Country</Button>
          <Button color="white">Tags</Button>
          <Button color="white">Date of updation</Button>*/}
        </div>
      </div>
    </main>
  )
}

export default AdminPage
