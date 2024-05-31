'use client';

import React, { useState, useEffect } from 'react';
import axios from "axios";
import SideMenu from "@/components/sidemenu";
import EquipmentTable from "@/components/Table/equipmentTable";
import AddEquipmentModal from "@/components/Modal/AddEquipmentModal";

interface Categories {
    id: number,
    name: string
}

export default function Equipments() {
	const [categoriesList, setCategoriesList] = useState<Categories[]>([]);

	// get categories
    const getCategories = async () => {
        try {
            const response = await axios.get('https://tooltangoapi.azurewebsites.net/api/categories');
            setCategoriesList(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    }

	useEffect(() => {
		getCategories();
    }, []);

	return (
		<div className="flex h-screen">
			<SideMenu />
			<div className="flex-1 overflow-y-auto px-10 py-10">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl">Equipments</h2>
					<AddEquipmentModal />
				</div>
				<EquipmentTable categories={categoriesList} />
			</div>
		</div>
	);
}