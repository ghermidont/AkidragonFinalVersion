import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuthContext();
	const CurrentUserFromLS = JSON.parse(localStorage.getItem("LSCurrentUser"));
	return (
		<Route
			{...rest} render={props => {return currentUser||CurrentUserFromLS ? <Component {...props} /> : <Redirect to="/MainLoginPage" />;}}
		/>
	);
}
