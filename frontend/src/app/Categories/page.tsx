'use client';

import React, { useState, useEffect } from 'react';
import SideMenu from "@/components/sidemenu";
import CategoriesTable from "@/components/Table/categoriesTable";
import axios from "axios";

const getCategories = async ()=> {
	try {
		const response = await axios.get('/api/categories');
	} catch (error) {
		throw new Error("error fetch equipmnts")
	}
}

export default function Categories() {
	const [categoriesList, setCategoriesList] = useState([]);

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async ()=> {
		try {
			const response = await axios.get('https://tooltangoapi.azurewebsites.net/api/categories');
			setCategoriesList(response.data)
		} catch (error) {
			throw new Error("error fetch categories")
		}
	}

	return (
		<div className="flex h-screen">
			<SideMenu />
			<div className="flex-1 overflow-y-auto px-10 py-10">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-3xl">Categories</h2>
				</div>
				<CategoriesTable data={{categories: categoriesList}}/>
			</div>
		</div>
	);
}