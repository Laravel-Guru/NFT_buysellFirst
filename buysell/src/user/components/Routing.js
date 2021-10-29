import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Buy from "./buy/Buy";
import Sell from "./sell/Sell";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome} = props;
  return (
    <Switch>
      <PropsRoute
        exact
        path="/buy"
        component={Buy}
      />
      <PropsRoute path="/sell" component={Sell} />
      <PropsRoute path="/" component={Buy} />
    </Switch>
  );
}

Routing.propTypes = {
};

export default memo(Routing);
