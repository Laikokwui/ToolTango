'use client';

import React, { useState } from 'react';
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
    Select
} from '@mui/material';
import { TablePagination, SelectChangeEvent } from '@mui/material';
import EditEquipmentModal from '../Modal/EditEquipmentModal';
import DeleteEquipmentModal from '../Modal/deleteEquipmentModal';

interface Equipment {
    id: number,
    name: string,
    condition: string,
    quantity: number
    type: string,
}

const createData = (
    id: number,
    name: string,
    condition: string,
    quantity: number,
    type: string
) => ({
    id,
    name,
    condition,
    quantity,
    type,
});

const rows = [
    createData(1,'Item A', 'New', 100, 'Hardware'),
    createData(2,'Item B', 'Used', 30, 'Software'),
    createData(3,'Item C', 'New', 50, 'Hardware'),
    createData(4,'Item D', 'Used', 2, 'Software'),
    createData(5,'Item E', 'Damaged', 20, 'Software'),
    createData(6,'Item F', 'Used', 12, 'Software'),
    createData(7,'Item G', 'New', 13, 'Hardware'),
    createData(8,'Item H', 'Used', 10, 'Software'),
    createData(9,'Item I', 'Used', 20, 'Hardware'),
    createData(10,'Item J', 'New', 5, 'Hardware'),
    createData(11,'Item K', 'Used', 2, 'Hardware'),
    createData(12,'Item L', 'Used', 4, 'Software'),
];

export default function EquipmentTable () {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("");

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilterType(event.target.value);
    };

    const filteredRows = rows.filter(row =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterType === "" || row.type === filterType)
    );

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
                        value={filterType}
                        onChange={handleFilterChange}
                        displayEmpty
                        variant="outlined"
                        className="min-w-[150px]"
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Hardware">Hardware</MenuItem>
                        <MenuItem value="Software">Software</MenuItem>
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
                        {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.condition}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <EditEquipmentModal equipment={row}/>
                                        <div className="ml-2">
                                            <DeleteEquipmentModal id={row.id}/>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredRows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
};
