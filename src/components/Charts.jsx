import React from "react";
import { Line } from "react-chartjs-2";

// eslint-disable-next-line
import { blue, red, green } from "@mui/material/colors";

const Charts = () => {
	return (
		<Line
			height={200}
			data={{
				labels: [
					"Januari",
					"Februari",
					"Maret",
					"April",
					"Mei",
					"Juni",
					"Juli",
					"Agustus",
					"September",
					"Oktober",
					"November",
					"Desember",
				],
				datasets: [
					{
						label: "2021",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 97000, 105000, 110000, 0],
						borderColor: green[500],
						tension: 0.3,
					},
					{
						label: "2022",
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						borderColor: red[500],
						tension: 0.3,
					},
				],
			}}
			options={{ maintainAspectRatio: true }}
		/>
	);
};

export default Charts;
