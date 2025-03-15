import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  return (
    <div className="mt-2">
        <Link to="/profile"><CgProfile  className="size-7" /></Link>
    </div>
  )
}
export default ProfileIcon