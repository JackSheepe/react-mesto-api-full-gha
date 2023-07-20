import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  //Спасибо большое Gennadiy Barsegyan за подсказку, решение из тренажера не работает совсем, я столько нервов на это убил
  return props.loggedIn ? props.children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
