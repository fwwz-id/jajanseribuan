import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
import { SWRConfig } from "swr";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import RekapProvider from "./context/RekapContext";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		h5: {
			fontWeight: 500,
		},
		caption: {
			fontWeight: "lighter",
		},
	},
});

const fetcher = async (...args) => await (await fetch(...args)).json();

ReactDOM.render(
	<React.StrictMode>
		<SWRConfig value={{ fetcher }}>
			<RekapProvider>
				<ThemeProvider theme={theme}>
					<Router>
						<App />
					</Router>
				</ThemeProvider>
			</RekapProvider>
		</SWRConfig>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
