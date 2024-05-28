'use client';

import React, { useState, useEffect } from 'react';
import SideMenu from "@/components/sidemenu";
import EquipmentTable from "@/components/Table/equipmentTable";
import AddEquipmentModal from "@/components/Modal/AddEquipmentModal";
import axios from "axios";


export default function Equipments() {
	const [equipmentList, setEquipmentList] = useState([]);
	const [categoriesList, setCategoriesList] = useState([]);

	const getEquipments = async ()=> {
		try {
			const response = await axios.get('https://tooltangoapi.azurewebsites.net/api/equipments');
			setEquipmentList(response.data)
		} catch (error) {
			throw new Error("error fetch equipmnts")
		}
	}

	const getCategories = async ()=> {
		try {
			const response = await axios.get('https://tooltangoapi.azurewebsites.net/api/categories');
			setCategoriesList(response.data)
		} catch (error) {
			throw new Error("error fetch categories")
		}
	}

	
	useEffect(() => {
		getEquipments();
	}, []);

	return (
		<div className="flex h-screen">
			<SideMenu />
			<div className="flex-1 overflow-y-auto px-10 py-10">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl">Equipments</h2>
					<AddEquipmentModal />
				</div>
				<EquipmentTable data={{
					equipments: equipmentList,
					categories: categoriesList
				}} />
			</div>
		</div>
	);
}