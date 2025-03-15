import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const SettingIcon = () => {
  return (
    <div className=" mt-2">
      <Link to="/setting"> <IoIosSettings className="size-8" /></Link>
     
    </div>
  )
}
export default SettingIcon