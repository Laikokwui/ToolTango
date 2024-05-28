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
    IconButton 
} from '@mui/material';
import { TablePagination } from '@mui/material';

interface Categories {
    id: number,
    name: string
}

interface CategoriesTableProps {
    categories: Categories[];
}

const CategoriesTable: React.FC<{ data: CategoriesTableProps }> = ({data}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className="p-4">
            <TableContainer component={Paper} className="shadow-md">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-semibold">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                            <TableRow key={index}>
                                <TableCell>{category.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={data.categories.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
};

export default CategoriesTable;
