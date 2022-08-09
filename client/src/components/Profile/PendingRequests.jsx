import React, { useState, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers,  getAllUsersFirebase,
  crearAerolinea,
 } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import { makeAdmin } from "../scripts/auth";
import s from "../styles/UserProfile.module.css";

export default function AirlinePendingRequests() {
  const dispatch = useDispatch();
  // getAllUsers()
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  console.log(users);
  console.log(currentUser);

  const allUser = useSelector((state) => state.allUsersFirebase);

  const toBeBusiness = allUser.filter(
    (user) => user.hasOwnProperty("empresa") && !user.empresa
  );

  const [refreshAccounts, setRefreshAccounts] = useState(0);

  async function acceptRequest(email) {
    //console.log(e.target.email.value);
    await makeAdmin(email);
    dispatch(crearAerolinea({ email }));
    // window.location.reload()
    setRefreshAccounts(refreshAccounts + 1);
  }

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllUsersFirebase());
    setInterval(() => {}, 1000);
    return () => {
      console.log("Will Unmount");
    };
  }, [dispatch, refreshAccounts]);

  return (
    <>
      {currentUser !== undefined ? (
        <div className={s.container}>
          <ProfileNav />
          <div className={s.infoContainer}>
            <h1 className={s.title}>Airline Pending Requests</h1>
            {toBeBusiness.length ? (
                toBeBusiness.map((u) => {
                  return (
                    <div>
                      <br />
                      <br />
                      <div key={u.uid}>
                        email: {u.email},Name: {u.name ? u.name : null}, uid: {u.uid}
                      </div>
                      <button
                        onClick={() => {
                          acceptRequest(u.email);
                        }}
                      >
                        Make Admin 
                      </button>
                    </div>
                  );
                })
              ) : (
                <h1>No airlines?</h1>
              )} 

            {/* <h2>If there's any airlines wanting to parter up with us, those will wait here for an approval</h2> */}
          </div>
        </div>
      ) : (
        <div>
          <h1>{<Loader />}</h1>
        </div>
      )}
    </>
  );
}