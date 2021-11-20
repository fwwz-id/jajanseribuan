import { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import Home from "./pages/Home";
import Forms from "./pages/Forms";

import { RekapContext } from "./context/RekapContext";

import "./App.css";

const routes = [
	{
		path: "/",
		exact: true,
		Component: Home,
	},
	{
		path: "/form/create",
		exact: true,
		Component: Forms,
	},
	{
		path: "/form/update/:id",
		exact: true,
		Component: Forms,
	},
];

function App() {
	const { data, error } = useContext(RekapContext);

	return (
		<Paper square elevation={0} sx={{ minHeight: "100vh" }}>
			<Backdrop
				open={!data && !error}
				sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Container maxWidth="md">
				<Switch>
					{routes.map(({ path, exact, Component }, id) => (
						<Route key={id} path={path} exact={exact}>
							<Component />
						</Route>
					))}
				</Switch>
			</Container>
		</Paper>
	);
}

export default App;
