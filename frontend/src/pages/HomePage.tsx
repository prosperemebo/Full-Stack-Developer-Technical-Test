import { Button } from "primereact/button"
import UserTable from "../components/UserTable"
import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link to='new'>
          <Button label="Add New" />
        </Link>
      </header>
      <UserTable />
    </div>
  )
}

export default HomePage