import React, { useState, useEffect, useRef, useCallback } from "react";
// import "../../assets/css/style.css";

import FooterPart from "./FooterPart";
import SideBarPart from "./SideBarPart";
import SideBarRouterPart from "./SideBarRouterPart";
import HeaderPart from "./HeaderPart";
import { useHistory } from "react-router-dom";
import requireAuthentication from "../../hoc/Authentication/requireAuthentication";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";

import * as CustomClass from "../../lib/Helper";
declare var $: any;

$(window).resize(function () {
  if ($(window).width() < 768) {
    $(".sidebar .collapse").collapse("hide");
  }

  // Toggle the side navigation when window is resized below 480px
  if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
    $("body").addClass("sidebar-toggled");
    $(".sidebar").addClass("toggled");
    $(".sidebar .collapse").collapse("hide");
  }
});

const WebPortal = (props: any) => {
  const [MenuList, setMenuList] = useState<any[]>([]);
  const [FinalMenuList, setFinalMenuList] = useState<any[]>([]);
  const [ComponentList, setComponentList] = useState<any[]>([]);
  const [CurrentMenuTitle, setCurrentMenuTitle] = useState<string>("Home");
  const [userName, setUserName] = useState<string>("");

  const History = useHistory();
  const app_PathRef = useRef();
  app_PathRef.current = props.match.path;

  useEffect(() => {
    //getMenuList();
    setUserName(CustomClass.userName() + "(" + CustomClass.userId() + ")");
    getMenuList();
  }, []);

  const getMenuList = () => {
    let mainData = [];

    let data = [];
    data.push({
      menuId: 1,
      name: "Create News",
      parentId: 0,
      navigationURL: "/CreateNews",
      componentPath: "components/News/CreateNews",
      type: "OS",
      iconURL: "",
    });
    data.push({
      menuId: 1,
      name: "Edit News",
      parentId: 0,
      navigationURL: "/EditNews",
      componentPath: "components/News/EditNews/EditNews",
      type: "OS",
      iconURL: "",
    });
    data.push({
      menuId: 1,
      name: "Create Author",
      parentId: 0,
      navigationURL: "/CreateAuthor",
      componentPath: "components/Author/CreateAuthor",
      type: "OS",
      iconURL: "",
    });
    data.push({
      menuId: 1,
      name: "Create Category",
      parentId: 0,
      navigationURL: "/CreateCategory",
      componentPath: "components/Category/CreateCategory",
      type: "OS",
      iconURL: "",
    });
    data.push({
      menuId: 1,
      name: "Create Sub Category",
      parentId: 0,
      navigationURL: "/CreateSubCategory",
      componentPath: "components/SubCategory/CreateSubCategory",
      type: "OS",
      iconURL: "",
    });
    mainData.push({ parentName: "Manage", menuDetails: data });

    mainData.push({
      parentName: "Video",
      menuDetails: [
        {
          menuId: 1,
          name: "Update Live Link",
          parentId: 0,
          navigationURL: "/CreateLiveVideoLink",
          componentPath: "components/LiveVideo/CreateLiveVideo",
          type: "OS",
          iconURL: "",
        },
      ],
    });
    if (data.length > 0) {
      setFinalMenuList(mainData);
    }
  };
  useEffect(() => {
    let data: any = [];
    for (var item of FinalMenuList) {
      for (var item1 of item.menuDetails) {
        data.push(item1);
      }
    }
    const updatedArray = data.filter(
      (result: any) => result.componentPath !== "",
    );
    setComponentList(updatedArray);
    setMenuList(data);
  }, [FinalMenuList]);

  useEffect(() => {
    setPageNameAfterPostback(MenuList);
  }, [MenuList]);

  const setPageNameAfterPostback = (MenuList: any[]) => {
    if (
      window.location.pathname.toString().toLowerCase() ===
      (app_PathRef.current + "/changepass").toLowerCase()
    ) {
      setCurrentMenuTitle("Change Password");
    } else if (
      window.location.pathname.toString().toLowerCase() ===
      (app_PathRef.current as unknown as string).toString().toLowerCase()
    ) {
      setCurrentMenuTitle("Home Page");
    } else {
      let pageName = MenuList.filter(
        (search) =>
          (app_PathRef.current + search.navigationURL)
            .toString()
            .toLowerCase() ===
          window.location.pathname.toString().toLowerCase(),
      );

      if (pageName.length > 0) {
        setCurrentMenuTitle(pageName[0].name);
      }
    }
  };

  const UpdateCurrentMenuTitle = (MenuTitle: string) => {
    setCurrentMenuTitle(MenuTitle);
  };

  const toggleButtonHandler = useCallback(() => {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      ($(".sidebar .collapse") as any).collapse("hide");
    }
  }, []);

  return (
    <React.Fragment>
      <div id="wrapper">
        <SideBarPart
          MenuList={MenuList}
          FinalMenuList={FinalMenuList}
          path={app_PathRef.current}
          UpdateCurrentMenuTitle={UpdateCurrentMenuTitle}
          sidebarclick={toggleButtonHandler}></SideBarPart>

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            <HeaderPart
              username={userName}
              sidebarClicked={toggleButtonHandler}
              UpdateCurrentMenuTitle={UpdateCurrentMenuTitle}
              path={app_PathRef.current}
              onLogout={() => {
                props.onLogoutHandler();
                History.replace("/login");
              }}
            />

            <div className="container-fluid">
              <div className="page-title-box">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <h4 className="page-title" id="PageHeader">
                      {CurrentMenuTitle}
                    </h4>
                  </div>
                  <div className="col-sm-6">
                    <div className="float-right d-none d-md-block">
                      <div className="dropdown"></div>
                    </div>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  height: "1px",
                  border: "0",
                  backgroundColor: "#ececf1",
                }}
              />

              {/* <h1 className="h3 mb-0 text-gray-800">{CurrentMenuTitle}</h1> */}
              {/* <!-- Content Row --> */}
              {/* <div className="row">this is content now
              </div> */}
              <SideBarRouterPart
                ComponentList={ComponentList}
                path={app_PathRef.current}></SideBarRouterPart>
            </div>
          </div>

          <FooterPart />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogoutHandler: () => {
      dispatch(actionTypes.portal_logout());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(requireAuthentication(WebPortal));
