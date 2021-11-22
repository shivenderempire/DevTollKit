import React, { useState, useEffect } from "react";
import asyncComponents from "../../hoc/asyncComponent/asyncComponent";
import { Route, Switch } from "react-router-dom";
import DashBoardPart from './DashBoardPart';
import ChangePassword from '../../components/HomePage/ChangePassword';

interface InputPros {
  ComponentList: any[];
  path: any;
}

const SideBarRouterPart = React.memo((props: InputPros) => {
  
  const [FinalRouteList, setFinalRouteList] = useState<any[]>([]);

  useEffect(() => {
    if (props.ComponentList.length > 0) {
      let RouteCompList = null;
      RouteCompList = props.ComponentList.map((cmpList) => {
        return (
          <Route
            key={cmpList.menuId}
            path={props.path + cmpList.navigationURL}
            exact
            component={asyncComponents(() => {
              return import("../../" + cmpList.componentPath);
            })}
          />
        );
      });
      setFinalRouteList(RouteCompList);
    }
  }, [props]);

  return (
    <Switch>
      {FinalRouteList.length > 0 ? FinalRouteList : null}

      <Route
        path={props.path + "/Webportal"}
        exact
        render={() => <DashBoardPart />}
      />

      <Route
        path={props.path + "/ChangePassword"}
        exact
        render={() => <ChangePassword />}
      />
      <Route
        path={props.path + "/"}
        exact
        render={() => <DashBoardPart />}
      />
      <Route
        render={() => (
          <div>
            <h1>Path not found</h1>
          </div>
        )}
      />
    </Switch>
  );
});

export default SideBarRouterPart;
