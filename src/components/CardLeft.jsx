import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardLeft = ({ date, batch, name, price }) => {
	return (
		<Box>
			<Box sx={{ py: "0.3rem" }}>
				<Typography variant="subtitle" component="p" gutterBottom>
					{date}
				</Typography>
				<Typography
					variant="subtitle"
					component="p"
					sx={{ fontSize: "0.75rem" }}
				>
					Batch {batch}
				</Typography>
			</Box>
			<Box sx={{ py: "0.3rem" }}>
				<Typography variant="h6" component="p">
					{name}
				</Typography>
				<Typography
					variant="subtitle"
					component="p"
					gutterBottom
					sx={{ color: "warning.main" }}
				>
					{price}
					<Typography
						variant="subtitle"
						component="span"
						sx={{ color: "warning.dark", ml: 0.5 }}
					>
						IDR
					</Typography>
				</Typography>
			</Box>
		</Box>
	);
};

export default CardLeft;
