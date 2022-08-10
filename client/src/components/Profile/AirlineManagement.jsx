import React, { useState, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers,
  getAllUsersFirebase,
  crearAerolinea,
  deleteAirline, } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import s from "../styles/UserProfile.module.css";
import { Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material'
import { Delete } from "../scripts/auth";
import Swal from 'sweetalert2'

export default function AirlineManagement() {
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.allUsersFirebase);
  const user = allUser.filter(
    (user) => !user.hasOwnProperty("empresa") && !user.admin
  );
  const business = allUser.filter(
    (user) => user.hasOwnProperty("empresa") && user.empresa
  );

  const [refreshAccounts, setRefreshAccounts] = useState(0);

  // getAllUsers()
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  // console.log(users);
  // console.log(currentUser);

  async function handleDeleteAirline(UID, email) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Delete(email, UID);
        business.filter((b) => b.email === email).length
          ? dispatch(deleteAirline(email))
          : console.log("no esta");
        //  aca va un loader porque las funciones se ejecutan tarde y se rompe con el window.location.reload()
        setRefreshAccounts(refreshAccounts + 1);        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
            <h1 className={s.title}>Airline Management</h1>
            <div className={s.table_container}>
              <Table>
                <caption>All airlines using the website</caption>
                <TableHead>
                    <TableRow>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>UID</strong></TableCell>
                      <TableCell><strong>Delete Airline</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                  {business.length ? (
                      business.map((u) => {
                        return (
                          <TableRow key={u.uid}>
                              <TableCell>{u.email}</TableCell>
                              <TableCell>{u.name ? u.name : '(empty)'}</TableCell>
                              <TableCell>{u.uid}</TableCell>
                              <TableCell>
                              <Button color='error' variant="contained" onClick={() => { handleDeleteAirline(u.uid, u.email)}}>
                                Delete
                              </Button>
                              </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <h1>No airlines?</h1>
                    )}                  
                </TableBody>
              </Table>
              </div>
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