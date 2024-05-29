'use client';

import React, { useState, useEffect } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Skeleton 
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
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        // Ensure loading state is true after the initial render
        setLoading(true);
        const timer = setTimeout(() => {
            setCategories(data.categories);
            setLoading(false);
        }, 2000); // simulate a delay

        return () => clearTimeout(timer);
    }, [data]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className="p-4">
            {loading ? (
                <TableContainer component={Paper} className="shadow-md">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    Name
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <TableContainer component={Paper} className="shadow-md">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-semibold">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                                <TableRow key={index}>
                                    <TableCell>{category.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={categories.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}
        </Paper>
    );
};

export default CategoriesTable;
