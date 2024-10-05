import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../store/store";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { username, clearUser } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-2">
      <NavLink to={"/"}>Header</NavLink>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center px-2">
          {username ? username : "Guest"}
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{username ? username : "Guest"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant={"outline"}
              onClick={() => navigate("/signup")}
            >
              Create new account
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <Button onClick={() => navigate("/login")}>Sign In</Button>
            <Button onClick={clearUser}>Logout</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
