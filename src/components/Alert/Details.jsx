import { useContext } from "react";
import { useHistory } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
	EditRounded as Edit,
	DeleteRounded as Remove,
} from "@mui/icons-material";

import { RekapContext } from "../../context/RekapContext";

import { Delete } from "../../utils/crud";
import { getRekapById } from "../../utils/getters";

const Details = ({ isOpen, onClose, currentId, toggleAlert }) => {
	const history = useHistory();
	const { rekaps, setIsUpdate } = useContext(RekapContext);
	const current = getRekapById(currentId, rekaps);

	const handleRemove = () => {
		toggleAlert(false);
		setIsUpdate(true);
		Delete("list", currentId);
	};

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth="lg">
			<DialogContent
				sx={{
					display: "flex",
					overflowX: "hidden",
				}}
			>
				{current.length > 0 &&
					current.map(
						({
							date,
							batch,
							products,
							packages,
							additionals,
							costs,
							gains,
							net,
							_id: id,
						}) => (
							<Stack
								key={id}
								direction={{ xs: "column", md: "row" }}
								spacing={{ xs: 3, md: 6 }}
							>
								<Box>
									<Typography variant="h5" component="p" gutterBottom>
										Timestamp
									</Typography>
									<Box>
										<Typography variant="subtitle2" component="p" gutterBottom>
											Date:
											<br />
											<Typography
												variant="caption"
												component="span"
												gutterBottom
											>
												{date}
											</Typography>
										</Typography>
										<Typography variant="subtitle2" component="p" gutterBottom>
											Batch:
											<br />
											<Typography
												variant="caption"
												component="span"
												gutterBottom
											>
												{batch}
											</Typography>
										</Typography>
									</Box>
								</Box>
								<Box>
									<Typography variant="h5" component="p">
										Products
									</Typography>
									{products.map(({ name, price, _id: id }) => (
										<Stack key={id} direction="row" spacing={3}>
											<Typography
												variant="subtitle2"
												component="p"
												gutterBottom
											>
												Name:
												<br />
												<Typography
													variant="caption"
													component="span"
													gutterBottom
												>
													{name}
												</Typography>
											</Typography>
											<Typography
												variant="subtitle2"
												component="p"
												gutterBottom
											>
												Price:
												<br />
												<Typography
													variant="caption"
													component="span"
													gutterBottom
												>
													{price} IDR
												</Typography>
											</Typography>
										</Stack>
									))}
								</Box>
								<Box>
									<Typography variant="h5" component="p">
										Packages
									</Typography>
									{packages.map(({ name, amount, _id: id }) => (
										<Stack key={id} direction="row" spacing={3}>
											<Typography
												variant="subtitle2"
												component="p"
												gutterBottom
											>
												Name:
												<br />
												<Typography
													variant="caption"
													component="span"
													gutterBottom
												>
													{name ? name : "-"}
												</Typography>
											</Typography>
											<Typography
												variant="subtitle2"
												component="p"
												gutterBottom
											>
												Amount:
												<br />
												<Typography
													variant="caption"
													component="span"
													gutterBottom
												>
													{amount ? amount : "-"} PCS
												</Typography>
											</Typography>
										</Stack>
									))}
								</Box>
								<Box>
									<Typography variant="h5" component="p">
										Additionals
									</Typography>
									{additionals.map(
										({ item, amount, price, total, _id: id }) => (
											<Stack key={id} direction="row" spacing={3}>
												<Typography
													variant="subtitle2"
													component="p"
													gutterBottom
												>
													Item:
													<br />
													<Typography
														variant="caption"
														component="span"
														gutterBottom
													>
														{item ? item : "-"}
													</Typography>
												</Typography>
												<Typography
													variant="subtitle2"
													component="p"
													gutterBottom
												>
													Amount:
													<br />
													<Typography
														variant="caption"
														component="span"
														gutterBottom
													>
														{amount ? amount : "-"} PCS
													</Typography>
												</Typography>
												<Typography
													variant="subtitle2"
													component="p"
													gutterBottom
												>
													Price:
													<br />
													<Typography
														variant="caption"
														component="span"
														gutterBottom
													>
														{price ? price : "0"} IDR
													</Typography>
												</Typography>
												<Typography
													variant="subtitle2"
													component="p"
													gutterBottom
												>
													Total:
													<br />
													<Typography
														variant="caption"
														component="span"
														gutterBottom
													>
														{total ? total : "0"} IDR
													</Typography>
												</Typography>
											</Stack>
										)
									)}
								</Box>
								<Box>
									<Typography variant="h5" component="p">
										Calculation
									</Typography>
									<Box>
										<Typography variant="subtitle2" component="p">
											Costs:
											<Typography
												variant="caption"
												component="span"
												sx={{ ml: 1 }}
											>
												{costs} IDR
											</Typography>
										</Typography>
										<Typography variant="subtitle2" component="p">
											Gains:
											<Typography
												variant="caption"
												component="span"
												sx={{ ml: 1 }}
											>
												{gains ? gains : "0"} IDR
											</Typography>
										</Typography>
										<Typography variant="subtitle2" component="p">
											Net:
											<Typography
												variant="caption"
												component="span"
												sx={{ ml: 1 }}
											>
												{net} IDR
											</Typography>
										</Typography>
									</Box>
								</Box>
							</Stack>
						)
					)}
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					startIcon={<Edit />}
					onClick={() => history.push(`/form/update/${currentId}`)}
				>
					Edit
				</Button>
				<Button
					variant="outlined"
					color="error"
					startIcon={<Remove />}
					// eslint-disable-next-line
					onClick={() => handleRemove()}
				>
					Remove
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Details;
