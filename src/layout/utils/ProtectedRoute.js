import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import Profile from "../../Screens/Profile";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, verified, user } = useSelector((state) => state.user);
  const navigate = useNavigate()
  return (
    <Fragment>
      {loading === false && (
        <Route exact path="/profile" element={<Profile />} />

      )}
    </Fragment>
  );
};

export default ProtectedRoute;
