import Image from "next/image";
import SideMenu from "@/components/sidemenu";
import EquipmentTable from "@/components/Table/equipmentTable";
import AddEquipmentModal from "@/components/Modal/AddEquipmentModal";
import axios from "axios";

const getEquipments = async ()=> {
	try {
		const response = await axios.get('/api/equipments');
	} catch (error) {
		throw new Error("error fetch equipmnts")
	}
}

export default function Equipments() {


	return (
		<div className="flex h-screen">
			<SideMenu />
			<div className="flex-1 overflow-y-auto px-10 py-10">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl">Equipments</h2>
					<AddEquipmentModal/>
				</div>
				<EquipmentTable />
			</div>
		</div>
	);
}