import React, {useContext} from 'react'
import { AppContext } from "../App";
const Logout = () => {
  const { dispatch } = useContext(AppContext);
  const handleClick = () => {
    dispatch({
      type: "LOGOUT",
  })
  }
  return (
    <div className='logout'>
      <button onClick={handleClick}>
        Logout
      </button>
    </div>
  )
}

export default Logout
