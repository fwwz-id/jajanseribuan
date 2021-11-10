import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
	// eslint-disable-next-line
	TrendingDownRounded,
	TrendingUpRounded,
} from "@mui/icons-material";

const CardRippleWrapper = ({ title, date, ...rest }) => {
	return (
		<Card {...rest}>
			<CardActionArea>
				<CardContent sx={{ textAlign: "center" }}>
					<Typography variant="h5" component="p">
						Batch {title}
					</Typography>
					<Typography variant="caption" component="p">
						{date}
					</Typography>
					<Box sx={{ pt: 2, pb: 0.5 }}>
						<TrendingUpRounded color="success" sx={{ fontSize: 40 }} />
						<Typography
							variant="caption"
							component="p"
							sx={{ color: "success.main" }}
						>
							50%
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CardRippleWrapper;
