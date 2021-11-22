import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom"; //useHistory
import { DashboardCompanyLogo } from "../../lib/ImageConstants";
declare var $: any;

interface InputPros {
  MenuList: string[];
  path: any;
  FinalMenuList: any;
  UpdateCurrentMenuTitle: (MenuTitle: string) => void;
  sidebarclick: () => void;
}
const SideBarPart = (props: InputPros) => {
  //const History = useHistory();
  const [FinalMenuList, setFinalMenuList] = useState<any[]>([]);

  const toggleHandler = useCallback(() => {
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      props.sidebarclick();
    } else {
      if ($(".sidebar").hasClass("toggled")) {
        ($(".sidebar .collapse") as any).collapse("hide");
      }
    }
  }, [props]);

  useEffect(() => {
    if (props.MenuList && props.MenuList.length > 0) {
      let //  RouteMenuList,
        RouteMainMenuList = null;

      RouteMainMenuList = props.FinalMenuList.map(
        (mlist: any, index: number) => {
          const parentname = mlist.parentName;
          const menuList = props.FinalMenuList.filter(
            (search: any) => search.parentName === parentname,
          )[0].menuDetails;

          let finalmenuData = null;
          finalmenuData = menuList
            .filter((search: any) => search.componentPath !== "")
            .map((mList: any, index: number) => {
              return (
                <NavLink
                  key={index}
                  to={props.path.toString() + mList.navigationURL}
                  className="collapse-item"
                  onClick={() => {
                    props.UpdateCurrentMenuTitle(mList.name);
                    toggleHandler();
                  }}>
                  {mList.name}
                </NavLink>
              );
            });
          return (
            <li className="nav-item" key={index}>
              <a
                className="nav-link collapsed"
                href="/"
                data-toggle="collapse"
                data-target={`#${mlist.parentName}`}
                aria-expanded="true"
                aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>{mlist.parentName}</span>
              </a>
              <div
                id={mlist.parentName}
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  {finalmenuData}
                </div>
              </div>
            </li>
          );
        },
      );

      // RouteMenuList = props.MenuList.filter(
      //   (search: any) => search.componentPath !== "",
      // ).map((mList: any, index: number) => {
      //   return (
      //     <NavLink
      //       key={index}
      //       to={props.path.toString() + mList.navigationURL}
      //       className="collapse-item"
      //       onClick={() => {
      //         props.UpdateCurrentMenuTitle(mList.name);
      //         toggleHandler();
      //       }}>
      //       {mList.name}
      //     </NavLink>
      //   );
      // });
      setFinalMenuList(RouteMainMenuList);
    }
  }, [props, toggleHandler]);

  return (
    <React.Fragment>
      {/* 
new sbadmin */}

      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar">
        {/* <!-- Sidebar - Brand --> */}

        <NavLink
          to={props.path.toString() + "/"}
          className="sidebar-brand d-flex align-items-center justify-content-center"
          onClick={() => {
            props.UpdateCurrentMenuTitle("Home Page");
            toggleHandler();
          }}>
          {/* <div className="sidebar-brand-icon rotate-n-15"> */}
          <div className="sidebar-brand-icon">
            <img
              src={DashboardCompanyLogo}
              style={{ height: 50, width: 50 }}
              alt=""></img>
            {/* <i className="fas fa-laugh-wink"></i> */}
          </div>
          <div className="sidebar-brand-text mx-3">Ki-Chalda</div>
        </NavLink>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        {/* <li className="nav-item active">
          <a className="nav-link" href="#" onClick={() => {
            props.UpdateCurrentMenuTitle("Home");
               History.replace("/Webportal");
              //History.goBack();
            }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Home</span>
          </a>
        </li> */}

        {/* <!-- Divider --> */}
        {/* <hr className="sidebar-divider"/> */}

        {/* <!-- Heading --> */}
        {/* <div className="sidebar-heading">
                Interface
            </div> */}

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        {/* <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="/"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Manage</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              {FinalMenuList}
            </div>
          </div>
        </li> */}
        {FinalMenuList}

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0 sidebartoggle"
            id="sidebarToggle"
            onClick={props.sidebarclick}></button>
        </div>
      </ul>
    </React.Fragment>
  );
};
export default SideBarPart;
