import { useEffect, useState, useContext } from "react";
// eslint-disable-next-line
import { useHistory, useParams } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import {
	AddRounded as Add,
	RemoveRounded as Delete,
	KeyboardBackspaceRounded as Back,
	CheckRounded as Success,
	CloseRounded as Failed,
} from "@mui/icons-material";

// context
import { RekapContext } from "../context/RekapContext";

// utils
import { margin } from "../utils/calculate";
import { Create, Update } from "../utils/crud";
import { getRekapById } from "../utils/getters";

const Alert = ({ open, success, exit }) => (
	<Dialog open={open} onClose={exit}>
		<DialogContent sx={{ display: "flex", alignItems: "center" }}>
			{success ? (
				<>
					<Success color="success" />
					<Typography variant="subtitle" component="p">
						Berhasil, Tada...
					</Typography>
				</>
			) : (
				<>
					<Failed color="error" />
					<Typography variant="subtitle" component="p">
						Terjadi error, silahkan cek input...
					</Typography>
				</>
			)}
		</DialogContent>
	</Dialog>
);

const Forms = () => {
	// react-router-dom
	const history = useHistory();
	const { id } = useParams();

	// context
	const { rekaps, isLoading, setIsUpdate } = useContext(RekapContext);

	// states
	const [isSuccess, setIsSuccess] = useState(true);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [date, setDate] = useState("");
	const [batch, setBatch] = useState("");
	const [costs, setCosts] = useState("");
	const [gains, setGains] = useState("");
	const [products, setProducts] = useState([{ name: "", price: "" }]);
	const [packages, setPackages] = useState([{ name: "", amount: "" }]);
	const [additionals, setAdditionals] = useState([
		{ item: "", amount: "", price: "", total: "" },
	]);

	const addFormInput = (objName) => {
		switch (objName) {
			case "products":
				setProducts((values) => [...values, { name: "", price: "" }]);
				break;
			case "packages":
				setPackages((values) => [...values, { name: "", amount: "" }]);
				break;
			case "additionals":
				setAdditionals((values) => [
					...values,
					{ item: "", amount: "", price: "", total: "" },
				]);
				break;

			default:
				console.log(`An error occured, Can't find ${objName}`);
				break;
		}
	};

	const deleteForm = (id, objName) => {
		switch (objName) {
			case "products":
				setProducts((values) => {
					if (values.length < 2) {
						return values;
					}

					return [...values.slice(0, id), ...values.slice(id + 1)];
				});
				break;
			case "packages":
				setPackages((values) => {
					if (values.length < 2) {
						return values;
					}

					return [...values.slice(0, id), ...values.slice(id + 1)];
				});
				break;
			case "additionals":
				setAdditionals((values) => [
					...values.slice(0, id),
					...values.slice(id + 1),
				]);
				break;

			default:
				console.log(`An error occured, Can't find ${objName}`);
				break;
		}
	};

	const onDynamicFormChangeHandler = (id, target, objName) => {
		const { name, value } = target;

		switch (objName) {
			case "products":
				{
					let current = products.find((item) => item === products[id]); // 0:{name '', price: ''}
					current = {
						...current, // remain keys that didnt changed
						[name]: value, // get current key that changed
					};

					setProducts((value) => [
						...value.slice(0, id),
						current,
						...value.slice(id + 1),
					]);
				}
				break;

			case "packages":
				{
					let current = packages.find((item) => item === packages[id]); // 0:{name '', amount: ''}
					current = {
						...current,
						[name]: value,
					};

					setPackages((value) => [
						...value.slice(0, id),
						current,
						...value.slice(id + 1),
					]);
				}
				break;

			case "additionals":
				{
					let current = additionals.find((item) => item === additionals[id]); // 0:{item: '', amount: '', price: '', total: ''}
					current = {
						...current,
						[name]: value,
					};

					setAdditionals((value) => [
						...value.slice(0, id),
						current,
						...value.slice(id + 1),
					]);
				}
				break;

			default:
				console.log(`An error occured, Can't find ${name}`);
				break;
		}
	};

	const onChangeHandler = (target) => {
		const { name, value } = target;

		switch (name) {
			case "date":
				setDate(value);
				break;
			case "batch":
				setBatch(value);
				break;
			case "costs":
				setCosts(value);
				break;
			case "gains":
				setGains(value);
				break;

			default:
				console.log(`An error occured, Can't find ${name}`);
				break;
		}
	};

	// PUT method test
	async function handleSubmit(id) {
		let result;

		const data = {
			date,
			batch,
			products,
			packages,
			additionals,
			costs,
			gains,
			net: margin(gains, costs),
		};

		// setIsUpdate false is handled in context
		if (id !== undefined) {
			setIsUpdate(true);
			result = await Update("list", id, data);
		} else {
			setIsUpdate(true);
			result = await Create("list", data);
		}

		setIsAlertOpen(true);
		if (result.ok || result.status === 200) {
			setIsSuccess(true);
		} else {
			setIsSuccess(false);
		}

		return result;
	}

	function handleInitialCallOrReload(arr, id) {
		if (id === null || id === undefined) return;
		if (!Array.isArray(arr)) throw new Error(`Argument must an array`);

		const [{ date, batch, products, packages, additionals, costs, gains }] =
			arr.length > 0
				? getRekapById(id, arr)
				: [
						{
							date: "",
							batch: "",
							products: [{ name: "", price: "" }],
							packages: [{ name: "", amount: "" }],
							additionals: [{ item: "", amount: "", price: "", total: "" }],
							costs: "",
							gains: "",
						},
				  ];

		setDate(date);
		setBatch(batch);
		setCosts(costs);
		setGains(gains);
		setProducts(products);
		setPackages(packages);
		setAdditionals(additionals);
	}

	useEffect(() => {
		if (isLoading === false) {
			handleInitialCallOrReload(rekaps, id);
		}
	}, [id, rekaps, isLoading]);

	return (
		<Box style={{ padding: "1rem 0" }}>
			<Alert
				open={isAlertOpen}
				success={isSuccess}
				exit={() => setIsAlertOpen(false)}
			/>

			{/* Back */}
			<Button
				variant="contained"
				color="primary"
				startIcon={<Back />}
				onClick={() => history.push("/")}
			>
				Kembali ke Home
			</Button>
			{/* Header */}
			<Typography variant="h4" component="h1" align="center">
				Tambah Data
			</Typography>

			{/* Timestamps */}
			<Box
				sx={{
					py: 1,
				}}
			>
				<Typography variant="h5" component="h2" gutterBottom>
					Timestamps
				</Typography>
				<FormGroup row>
					<FormControl
						variant="outlined"
						margin="normal"
						sx={{
							mr: 1,
						}}
					>
						<InputLabel htmlFor="date" variant="outlined" required>
							Date
						</InputLabel>
						<OutlinedInput
							name="date"
							label="Date"
							placeholder="e.g 20 Januari 2021"
							value={date}
							onChange={(evt) => onChangeHandler(evt.target)}
							required
						/>
					</FormControl>
					<FormControl
						variant="outlined"
						margin="normal"
						sx={{
							mr: 1,
						}}
					>
						<InputLabel htmlFor="batch" variant="outlined" required>
							Batch
						</InputLabel>
						<OutlinedInput
							name="batch"
							label="Batch"
							placeholder="e.g 1"
							value={batch}
							onChange={(evt) => onChangeHandler(evt.target)}
							required
						/>
					</FormControl>
				</FormGroup>
			</Box>
			{/* Products */}
			<Box
				sx={{
					py: 1,
				}}
			>
				<Typography variant="h5" component="h2" gutterBottom>
					Products
				</Typography>
				{products.map(({ name, price }, index) => (
					<FormGroup
						key={index}
						row
						sx={{
							alignItems: "center",
						}}
					>
						<FormControl
							variant="outlined"
							sx={{
								mr: 1,
							}}
							margin="normal"
						>
							<InputLabel htmlFor="name" variant="outlined" required>
								Product
							</InputLabel>
							<OutlinedInput
								name="name"
								label="Product"
								value={name}
								placeholder="Rindu"
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "products")
								}
								required
							/>
						</FormControl>
						<FormControl
							variant="outlined"
							margin="normal"
							sx={{
								mr: 1,
							}}
						>
							<InputLabel htmlFor="price" variant="outlined" required>
								Price
							</InputLabel>
							<OutlinedInput
								name="price"
								label="Price"
								placeholder="49000 IDR"
								value={price}
								endAdornment={
									<InputAdornment position="end">IDR</InputAdornment>
								}
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "products")
								}
								required
							/>
						</FormControl>
						<Box
							sx={{
								display: "flex",
							}}
						>
							<IconButton
								color="secondary"
								name="products"
								onClick={() => deleteForm(index, "products")}
							>
								<Delete />
							</IconButton>
							<IconButton
								color="primary"
								name="products"
								onClick={() => addFormInput("products")}
							>
								<Add />
							</IconButton>
						</Box>
					</FormGroup>
				))}
			</Box>

			{/* Packages */}
			<Box
				sx={{
					py: 1,
				}}
			>
				<Typography variant="h5" component="h2" gutterBottom>
					Packages
				</Typography>
				{packages.map(({ name, amount }, index) => (
					<FormGroup
						key={index}
						row
						sx={{
							alignItems: "center",
						}}
					>
						<FormControl
							variant="outlined"
							margin="normal"
							sx={{
								mr: 1,
							}}
						>
							<InputLabel htmlFor="name" variant="outlined" required>
								Product
							</InputLabel>
							<OutlinedInput
								name="name"
								label="Product"
								placeholder="e.g Rindu"
								value={name}
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "packages")
								}
								required
							/>
						</FormControl>
						<FormControl
							variant="outlined"
							margin="normal"
							sx={{
								mr: 1,
							}}
						>
							<InputLabel htmlFor="amount" variant="outlined" required>
								Amount
							</InputLabel>
							<OutlinedInput
								name="amount"
								label="Amount"
								placeholder="49 pcs"
								value={amount}
								endAdornment={
									<InputAdornment position="end">pcs</InputAdornment>
								}
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "packages")
								}
								required
							/>
						</FormControl>

						<Box
							sx={{
								display: "flex",
							}}
						>
							<IconButton
								color="secondary"
								onClick={() => deleteForm(index, "packages")}
							>
								<Delete />
							</IconButton>
							<IconButton
								color="primary"
								onClick={() => addFormInput("packages")}
							>
								<Add />
							</IconButton>
						</Box>
					</FormGroup>
				))}
			</Box>

			{/* Additionals */}
			<Box
				sx={{
					py: 1,
				}}
			>
				<Typography variant="h5" component="h2" gutterBottom>
					Additionals
				</Typography>
				{additionals.map(({ item, amount, price, total }, index) => (
					<FormGroup
						key={index}
						row
						sx={{
							alignItems: "center",
						}}
					>
						<FormControl
							variant="outlined"
							margin="normal"
							sx={{
								mr: 1,
							}}
						>
							<InputLabel htmlFor="item" variant="outlined">
								Item
							</InputLabel>
							<OutlinedInput
								name="item"
								label="Item"
								placeholder="e.g Plastik 8x20"
								value={item}
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "additionals")
								}
							/>
						</FormControl>
						<FormControl
							variant="outlined"
							margin="normal"
							sx={{
								mr: 1,
							}}
						>
							<InputLabel htmlFor="amount" variant="outlined">
								Amount
							</InputLabel>
							<OutlinedInput
								name="amount"
								label="Amount"
								placeholder="2 pcs"
								value={amount}
								endAdornment={
									<InputAdornment position="end">pcs</InputAdornment>
								}
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "additionals")
								}
							/>
						</FormControl>
						<FormControl
							variant="outlined"
							margin="normal"
							sx={{
								mr: 1,
							}}
						>
							<InputLabel htmlFor="price" variant="outlined">
								Price
							</InputLabel>
							<OutlinedInput
								name="price"
								label="Price"
								placeholder="45000 IDR"
								value={price}
								endAdornment={
									<InputAdornment position="end">IDR</InputAdornment>
								}
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "additionals")
								}
							/>
						</FormControl>
						<FormControl
							variant="outlined"
							margin="normal"
							sx={{
								mr: 1,
							}}
						>
							<InputLabel htmlFor="total" variant="outlined">
								Total
							</InputLabel>
							<OutlinedInput
								name="total"
								label="Total"
								placeholder="9000 IDR"
								value={total}
								endAdornment={
									<InputAdornment position="end">IDR</InputAdornment>
								}
								onChange={(e) =>
									onDynamicFormChangeHandler(index, e.target, "additionals")
								}
							/>
						</FormControl>

						<Box
							sx={{
								display: "flex",
							}}
						>
							<IconButton
								color="secondary"
								onClick={() => deleteForm(index, "additionals")}
							>
								<Delete />
							</IconButton>
							<IconButton
								color="primary"
								onClick={() => addFormInput("additionals")}
							>
								<Add />
							</IconButton>
						</Box>
					</FormGroup>
				))}
				{additionals.length < 1 && (
					<IconButton
						color="primary"
						onClick={() => addFormInput("additionals")}
					>
						<Add />
					</IconButton>
				)}
			</Box>

			{/* Costs, Gains, Net */}
			<Box sx={{ py: 1 }}>
				<Typography variant="h5" component="h2">
					Calculation
				</Typography>
				<FormGroup row>
					<FormControl
						variant="outlined"
						margin="normal"
						sx={{
							mr: 1,
						}}
					>
						<InputLabel htmlFor="costs" variant="outlined" required>
							Costs
						</InputLabel>
						<OutlinedInput
							name="costs"
							label="Costs"
							placeholder="69000 IDR"
							value={costs}
							endAdornment={<InputAdornment position="end">IDR</InputAdornment>}
							onChange={(evt) => onChangeHandler(evt.target)}
							required
						/>
					</FormControl>
					<FormControl
						variant="outlined"
						margin="normal"
						sx={{
							mr: 1,
						}}
					>
						<InputLabel htmlFor="gains" variant="outlined" required>
							Gains
						</InputLabel>
						<OutlinedInput
							name="gains"
							label="Gains"
							placeholder="97000 IDR"
							value={gains}
							endAdornment={<InputAdornment position="end">IDR</InputAdornment>}
							onChange={(evt) => onChangeHandler(evt.target)}
							required
						/>
					</FormControl>
					<FormControl
						variant="outlined"
						margin="normal"
						sx={{
							mr: 1,
						}}
						disabled
					>
						<InputLabel htmlFor="net" variant="outlined" required>
							Net
						</InputLabel>
						<OutlinedInput
							name="net"
							label="Net"
							placeholder="e.g 20000 IDR"
							value={margin(gains, costs)}
							endAdornment={<InputAdornment position="end">IDR</InputAdornment>}
						/>
					</FormControl>
				</FormGroup>
			</Box>
			<Button
				type="submit"
				color="primary"
				variant="contained"
				onClick={() => handleSubmit(id)}
			>
				Submit
			</Button>
		</Box>
	);
};

export default Forms;
