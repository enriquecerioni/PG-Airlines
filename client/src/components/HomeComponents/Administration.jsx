import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFirebase,
  crearAerolinea,
  deleteAirline,
  currentUser,
} from "../../redux/actions";

import { disableUserAuth, makeAdmin } from "../scripts/auth";

export default function Administration() {
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.allUsersFirebase);
  const currentUser=useSelector(state=>state.currentUser)
  const user = allUser.filter(
    (user) => !user.hasOwnProperty("empresa") && !user.admin && user.email!==currentUser[0].email
  );


  const [refreshAccounts, setRefreshAccounts] = useState(0);

  // business.map((u)=>console.log("empresas" ,u
  //     ))
  // console.log(user);
  // console.log(business);
  // console.log(toBeBusiness);
  // async function acceptRequest(email) {
  //   //console.log(e.target.email.value);
  //   await makeAdmin(email);
  //   dispatch(crearAerolinea({ email }));
  //   // window.location.reload()
  //   setRefreshAccounts(refreshAccounts + 1);
  // }

  async function disableUser(UID, email) {
    await disableUserAuth(UID,email);
    //  aca va un loader porque las funciones se ejecutan tarde y se rompe con el window.location.reload()
    setRefreshAccounts(refreshAccounts + 1);
  }

  useEffect(() => {
    dispatch(getAllUsersFirebase());
    return () => {
      console.log("Will Unmount");
    };
  }, [dispatch, refreshAccounts]);
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>USERS</h2>

      {user.length ? (
        user.map((u) => {
          return (
            <div key={u.uid}>
              <br />
              <br />
              <div key={u.uid}>
                email: {u.email},Name: {u.name ? u.name : null}, uid: {u.uid}
              </div>
              {
              !u.disable ? (<button
                onClick={() => {
                  disableUser(u.uid, u.email);
                }}
              >
                Disable User
              </button>):
                <h6>User Disable</h6>
              }
            </div>
          );
        })
      ) : (
        <h1>No users?</h1>
      )}
    </div>
  );
}
