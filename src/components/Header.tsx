import { NavLink } from "react-router-dom"
import useUserStore from "../store/store"
import { Button } from "./ui/button"

const Header = () => {
  const { username, clearUser } = useUserStore()
  return (
    <div className="flex justify-between px-2">
      <NavLink to={'/'}>
        Header
      </NavLink>
      <div>
        {username}
        {username ? 
          <Button onClick={clearUser}>Logout</Button>: 
          <NavLink to="login" className="text-blue-500">
            Login
          </NavLink>
        }
      </div>
    </div>
  )
}

export default Header
