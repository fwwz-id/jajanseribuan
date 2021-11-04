import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
	// eslint-disable-next-line
	TrendingDownRounded,
	TrendingUpRounded,
} from "@mui/icons-material";

// utils
import { profitPercent } from "../utils/calculate";

const Gain = () => <TrendingUpRounded color="success" sx={{ fontSize: 45 }} />;
const Loss = () => <TrendingDownRounded color="error" sx={{ fontSize: 45 }} />;

const CardRight = ({ costs, gains }) => {
	return (
		<Box>
			{gains < costs ? <Loss /> : <Gain />}
			<Typography
				variant="subtitle"
				component="p"
				align="center"
				sx={{ color: "success.dark" }}
			>
				{profitPercent(gains, costs)}%
			</Typography>
		</Box>
	);
};

export default CardRight;
