import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// mui-icons
import { AddRounded as Add } from "@mui/icons-material";

// custom components
import Details from "../components/Alert/Details";
import CardGroup from "../components/Cards/CardGroup/CardGroup";
import CardRippleWrapper from "../components/Cards/CardRippleContainer/CardRippleWrapper";
import Charts from "../components/Charts";

// context
import { RekapContext } from "../context/RekapContext";

// utils
// import { Delete } from "../utils/crud";
// import { getNestedObject } from "../utils/loops";

const Home = () => {
	// context
	const { data, error } = useContext(RekapContext);
	// react-router-dom
	const history = useHistory();

	// state
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [currentId, setCurrentId] = useState("");

	return (
		<Box sx={{ py: 1 }}>
			<Details
				isOpen={isAlertOpen}
				// eslint-disable-next-line
				onClose={() => (setCurrentId(""), setIsAlertOpen(false))}
				currentId={currentId}
				toggleAlert={setIsAlertOpen}
			/>

			<Typography variant="h4" component="h1" align="center" gutterBottom>
				Rekap
			</Typography>
			<Box>
				<Charts />
			</Box>
			<Button
				variant="contained"
				startIcon={<Add />}
				onClick={() => history.push("/form/create")}
				sx={{ my: "3rem" }}
			>
				Tambah Data
			</Button>
			<CardGroup>
				{data && !error ? (
					data.data.map(({ _id, date, batch }) => (
						<Grid item key={_id} xs={12} sm={6} md={4}>
							<CardRippleWrapper
								title={batch}
								date={date}
								//eslint-disable-next-line
								onClick={() => (setCurrentId(_id), setIsAlertOpen(true))}
							/>
						</Grid>
					))
				) : error ? (
					<Typography variant="h2" component="p">
						Error fetching data ...
					</Typography>
				) : null}
			</CardGroup>
		</Box>
	);
};

export default Home;
