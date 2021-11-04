import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// mui-icons
import {
	AddRounded as Add,
	EditRounded as Edit,
	DeleteRounded,
} from "@mui/icons-material";

// custom components
import CardLeft from "../components/CardLeft";
import CardRight from "../components/CardRight";
import Charts from "../components/Charts";

// context
import { RekapContext } from "../context/RekapContext";

// utils
import { Delete } from "../utils/crud";

const Home = () => {
	const { rekap, setIsUpdate } = useContext(RekapContext);
	const history = useHistory();

	const [isEditMode, setIsEditMode] = useState(false);

	const handleDeleteButton = (id) => {
		setIsUpdate(true);
		Delete("list", id);
	};

	return (
		<Box sx={{ py: 1 }}>
			<Typography variant="h4" component="h1" align="center" gutterBottom>
				Rekap
			</Typography>
			<Box>
				<Charts />
			</Box>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
					p: 2,
				}}
			>
				<FormGroup>
					<FormControlLabel
						control={<Switch />}
						label="Edit Mode"
						onClick={() => setIsEditMode(!isEditMode)}
					/>
				</FormGroup>
				<Button
					variant="contained"
					startIcon={<Add />}
					onClick={() => history.push("/form/create")}
				>
					Tambah Data
				</Button>
			</Box>
			<Box
				sx={{
					py: 2,
					display: "flex",
					flexWrap: "wrap",
					flexDirection: { xs: "column", sm: "row" },
					justifyContent: { sm: "space-around" },
				}}
			>
				{rekap.map(({ _id: id, date, batch, products, gains }) =>
					products.map(({ _id: key, name, price }) => (
						<Card key={key} sx={{ width: { sm: "250px", md: "350px" }, my: 1 }}>
							<CardContent
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-around",
								}}
							>
								<CardLeft date={date} batch={batch} name={name} price={price} />
								<CardRight costs={price} gains={gains} />
							</CardContent>
							{isEditMode && (
								<Box sx={{ textAlign: "right" }}>
									<Fab
										size="small"
										color="primary"
										onClick={() => history.push(`/form/update/${id}`)}
										sx={{ mr: 1 }}
									>
										<Edit />
									</Fab>
									<Fab size="small" onClick={() => handleDeleteButton(id)}>
										<DeleteRounded />
									</Fab>
								</Box>
							)}
						</Card>
					))
				)}
			</Box>
		</Box>
	);
};

export default Home;
