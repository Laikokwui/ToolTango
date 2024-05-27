import SideMenu from "@/components/sidemenu";
import { Box, Paper, Typography } from "@mui/material";

export default function Home() {
	// Dummy statistics data
    const statistics = [
        { label: 'Total Equipments', value: 100 },
        { label: 'New', value: 40 },
        { label: 'Used', value: 50 },
        { label: 'Damaged', value: 10 },
    ];

	const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	return (
		<div className="flex h-screen">
			<SideMenu />
			<div className="flex-1 p-10">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-3xl">Dashboard {apiUrl}</h2>
				</div>

				<Paper className="p-4 mb-4">
					<Typography variant="h5" gutterBottom>
						Summary
					</Typography>
					{statistics.map((stat, index) => (
						<Box key={index} className="flex justify-between mb-2">
							<Typography variant="body1">{stat.label}</Typography>
							<Typography variant="body1">{stat.value}</Typography>
						</Box>
					))}
				</Paper>

				{/* Placeholder content */}
				<Paper className="p-4">
					<Typography variant="h5" gutterBottom>
						Welcome to Admin Dashboard
					</Typography>
					<Typography variant="body1">
						This is a placeholder for the dashboard content. You can display more detailed statistics, charts, or any other relevant information here.
					</Typography>
				</Paper>
		</div>
		</div>
	);
}
