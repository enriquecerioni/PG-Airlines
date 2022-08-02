import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import s from "../styles/ProfileNav.module.css";
import defaultProfile from "../styles/defaultProfile.png";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";



export default function ProfileNav() {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllUsers());
    }, [dispatch]);
  
    function isImage(anImage) {
      return /.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(anImage);
    }
  
    // getAllUsers()
    const users = useSelector((state) => state.allUsers);
    const currentUser = useSelector((state) => state.currentUser)[0];
  
    var currentlyUsingPic =
      currentUser.image === null ? defaultProfile : isImage(currentUser.image) ? currentUser.image : defaultProfile 
  
    var AccInfo = (
      <li className={s.navLink}>
          <Link className={s.links} to="/profile">
              <i className='bx bx-home-alt icon' ></i>
              <span className={s.text}>Account Information</span> 
          </Link>
      </li>
    );
  
    var TicketsBought = (
      <li className={s.navLink}>
          <Link className={s.links} to="/orders">
              <i className='bx bx-bar-chart-alt-2 icon' ></i>
              <span className={s.text}>My Orders </span>
          </Link>
      </li>
  
    );
  
    var MyAirline = (
      <li className={s.navLink}>
      <Link className={s.links} to="/airlineProfile">
          <i className='bx bx-bell icon'></i>
          <span className={s.text}>Manage Airline</span>
      </Link>
  </li>
    );
  
    var OwnFlights = (
    <li className={s.navLink}>
      <Link className={s.links} to="/catalog">
          <i className='bx bx-pie-chart-alt icon' ></i>
          <span className={s.text}>Manage Airline Flights</span>
      </Link>
    </li>
    );
  
    console.log(users);
    console.log(currentUser.image);
    return (
        <>
        {currentUser !== undefined ? (
          <aside className={s.sidebar}>
          <header>
              <div className={s.imageText}>
                  <span className={s.image}>
                      {/* <img src="logo.png" alt=""> */}
                  </span>
    
                  <div className={s.text}>
                      <figure id="img-profile">
                      <figcaption className={s.fig1}>Welcome</figcaption>
                <figcaption className={s.fig2}>{currentUser.name}</figcaption>
                <img
                  className={s.imgProfile}
                  // "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                  src={currentlyUsingPic}
                  alt="profile"
                />
                        </figure> 
                  </div>
              </div>
              <div className={s.arrow}>
                  <i className={s.toggle}></i>
              </div>
          </header>
          <div className={s.menuBar}>
              <div className={s.menu}>
                  <ul className={s.menuLinks}>
                      {AccInfo}
                      {TicketsBought}
                      {MyAirline}
                      {OwnFlights}
                  </ul>
              </div>
              <div className={s.bottomContent}>
                  <li className={s.navLink}>
                      <Link className={s.links} to="/logout">
                          <i className='bx bx-log-out icon' ></i>
                          <span className={s.text}>Logout</span>
                      </Link>
                  </li>
              </div>
          </div>
      </aside>
        ) : (
          <aside className={s.sidebar}></aside>
        )}
        </>
      );
    
    }
//   return (
//     <aside className={s.sidebar}>
//         <header>
//             <div className={s.imageText}>
//                 <span className={s.image}>
//                     {/* <img src="logo.png" alt=""> */}
//                 </span>

//                 <div className={s.text}>
//                     <figure id="img-profile">
//                         <figcaption className={s.fig1}>Welcome</figcaption>
//                         <figcaption className={s.fig2}>JuanPepito52</figcaption>
//                         <img className={s.imgProfile} src={defaultProfile} alt="profile"/>
//                       </figure> 
//                 </div>
//             </div>
//             <div className={s.arrow}>
//                 <i className={s.toggle}></i>
//             </div>
//         </header>

//         <div className={s.menuBar}>
//             <div className={s.menu}>

//                 <ul className={s.menuLinks}>
//                     <li className={s.navLink}>
//                         <Link className={s.links} to="/profile">
//                             <i className='bx bx-home-alt icon' ></i>
//                             <span className={s.text}>Account Information</span> 
//                         </Link>
//                     </li>

//                     <li className={s.navLink}>
//                         <Link className={s.links} to="/orders">
//                             <i className='bx bx-bar-chart-alt-2 icon' ></i>
//                             <span className={s.text}>My Orders </span>
//                         </Link>
//                     </li>

//                     <li className={s.navLink}>
//                         <Link className={s.links} to="/airlineProfile">
//                             <i className='bx bx-bell icon'></i>
//                             <span className={s.text}>Manage Airline</span>
//                         </Link>
//                     </li>

//                     <li className={s.navLink}>
//                         <Link className={s.links} to="/catalog">
//                             <i className='bx bx-pie-chart-alt icon' ></i>
//                             <span className={s.text}>Manage Airline Flights</span>
//                         </Link>
//                     </li>

//                 </ul>
//             </div>

//             <div className={s.bottomContent}>
//                 <li className={s.navLink}>
//                     <Link className={s.links} to="/logout">
//                         <i className='bx bx-log-out icon' ></i>
//                         <span className={s.text}>Logout</span>
//                     </Link>
//                 </li>

                
//             </div>
//         </div>

//     </aside>
//   );
  

