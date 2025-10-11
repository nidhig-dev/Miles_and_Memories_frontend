import { Link } from "react-router-dom"

export default function Missing() {
  return (
    <div>
      <h1>404:Page not found</h1>
      <Link to="/">Go back to home page</Link>
    </div>
  )
}
