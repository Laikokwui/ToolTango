'use client';

import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    TextField, 
    MenuItem, 
    Select, 
    Skeleton
} from '@mui/material';
import { TablePagination, SelectChangeEvent } from '@mui/material';
import EditEquipmentModal from '../Modal/EditEquipmentModal';
import DeleteEquipmentModal from '../Modal/deleteEquipmentModal';

interface Equipment {
    id: number,
    name: string,
    condition: string,
    quantity: number,
    categoryId: number,
}

interface Categories {
    id: number,
    name: string
}

const EquipmentTable = () => {
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
    const [categoriesList, setCategoriesList] = useState<Categories[]>([]);
    const [loading, setLoading] = useState(true);

    // pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // search query
    const [searchQuery, setSearchQuery] = useState<string>("");

    // filter table
    const [filterType, setFilterType] = useState<string>("");
    const [filterTypeId, setFilterTypeId] = useState<number | string>("-1");

    // pagination set page
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // pagination change number of rows
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // change search query
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // get category name by id
    const getCategoryNameById = (categoryId: number): string => {
        const category = categoriesList.find(category => category.id === categoryId);
        return category ? category.name : " ";
    };

    // set filter
    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        if (selectedValue !== "-1") {
            const categoryId = parseInt(selectedValue);
            setFilterTypeId(categoryId);
            const filter = getCategoryNameById(categoryId);
            if (filter !== " ") {
                setFilterType(filter);
            }
        } else {
            setFilterType("");
            setFilterTypeId("-1");
        }
    };

    // filter list of data
    const filteredRows = equipmentList.filter(row =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterType === "" || row.categoryId === filterTypeId)
    );

    // get equipments
    const getEquipments = async () => {
        try {
            const response = await axios.get('https://tooltangoapi.azurewebsites.net/api/equipment');
            setEquipmentList(response.data);
        } catch (error) {
            console.error("Error fetching equipments", error);
        }
    }

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
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([getEquipments(), getCategories()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Paper className="p-4">
            <div className="mb-4 flex items-center justify-between">
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className="flex items-center space-x-4">
                    <Select
                        value={filterTypeId.toString()}
                        onChange={handleFilterChange}
                        displayEmpty
                        variant="outlined"
                        className="min-w-[150px]"
                    >
                        <MenuItem value="-1">All Types</MenuItem>
                        {categoriesList.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <TableContainer component={Paper} className="shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-semibold">Name</TableCell>
                            <TableCell className="font-semibold">Condition</TableCell>
                            <TableCell className="font-semibold">Quantity</TableCell>
                            <TableCell className="font-semibold">Type</TableCell>
                            <TableCell className="font-semibold">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.condition}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{getCategoryNameById(row.categoryId)}</TableCell>
                                    <TableCell>
                                        <div className="flex">
                                            <EditEquipmentModal 
                                                equipment={{ 
                                                    id: row.id, 
                                                    name: row.name,
                                                    condition: row.condition,
                                                    quantity: row.quantity,
                                                    categoryId: row.categoryId
                                                }} 
                                            />
                                            <div className="ml-2">
                                                <DeleteEquipmentModal 
                                                    equipment={{ 
                                                        id: row.id, 
                                                        name: row.name 
                                                    }} 
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {!loading && (
                    <TablePagination
                        component="div"
                        count={filteredRows.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </TableContainer>
        </Paper>
    );
};

export default EquipmentTable;
