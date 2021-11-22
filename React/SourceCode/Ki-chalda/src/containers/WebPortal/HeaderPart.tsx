import React from "react";
import { NavLink } from "react-router-dom";
import profileImage from '../../assets/images/undraw_profile.svg';

interface headerDetails {
  username: string,
  sidebarClicked: () => void,
  UpdateCurrentMenuTitle: (MenuTitle: string) => void,
  path: any,
  onLogout:()=> void
};
//sbadmin
const  HeaderPart=(props:headerDetails)=> {
  //const History = useHistory();


  return (
    <React.Fragment>
         


      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
       
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3" onClick={props.sidebarClicked}
        >
          <i className="fa fa-bars"></i>
        </button>

      
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

       
        <ul className="navbar-nav ml-auto">
           

          <div className="topbar-divider d-none d-sm-block"></div>


         
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle"
             href="/"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                { props.username}
              </span>
              <img
                className="img-profile rounded-circle"
                src={profileImage} alt=""
              />
            </a>
          
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <NavLink to= {props.path.toString() + "/ChangePassword"}  className="dropdown-item" onClick={()=> {props.UpdateCurrentMenuTitle("Change Password")}}>
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Change Password
              </NavLink>
           
              
             
              {/* <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a> */}
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="/"
                data-toggle="modal"
                data-target="#logoutModal"
                onClick={props.onLogout}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>

           

            </div>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}


export default HeaderPart;


// <!-- Logout Modal-->
// <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
//     aria-hidden="true">
//     <div className="modal-dialog" role="document">
//         <div className="modal-content">
//             <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
//                 <button className="close" type="button" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">×</span>
//                 </button>
//             </div>
//             <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
//             <div className="modal-footer">
//                 <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
//                 <a className="btn btn-primary" href="login.html">Logout</a>
//             </div>
//         </div>
//     </div>
// </div>
