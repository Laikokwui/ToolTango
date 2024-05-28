'use client';

import React, { useState, useEffect } from 'react';
import SideMenu from "@/components/sidemenu";
import EquipmentTable from "@/components/Table/equipmentTable";
import AddEquipmentModal from "@/components/Modal/AddEquipmentModal";


export default function Equipments() {
	return (
		<div className="flex h-screen">
			<SideMenu />
			<div className="flex-1 overflow-y-auto px-10 py-10">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl">Equipments</h2>
					<AddEquipmentModal />
				</div>
				<EquipmentTable />
			</div>
		</div>
	);
}