import Grid from "@mui/material/Grid";

import React from "react";

const CardGroup = ({ children }) => {
	return (
		<Grid container spacing={3} sx={{ py: 2 }}>
			{children}
		</Grid>
	);
};

export default CardGroup;
