"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button, 
    MenuItem, 
    Select, 
    InputLabel, 
    FormControl, 
    IconButton,
    FormHelperText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddEquipmentModal() {
    const [open, setOpen] = useState(false);
    const [select1Value, setSelect1Value] = useState('');
    const [select2Value, setSelect2Value] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [quantityValue, setQuantityValue] = useState(1);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        const newErrors = {
            name = '',
            select1 = '',
            select2 = '',
            quantity = '',
        };

        if (!nameValue) newErrors.name = "Name is required";
        if (!select1Value) newErrors.select1 = "Condition is required";
        if (!select2Value) newErrors.select2 = "Category is required";
        if (quantityValue <= 0) newErrors.quantity = "Quantity must be greater than 0";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setSubmitError('');

        try {
            const response = await axios.post('/api/equipment', {
                name: nameValue,
                condition: select1Value,
                quantity: quantityValue,
                category: select2Value
            });

            console.log('Submitted:', response.data);
            handleClose();
        } catch (error) {
            setSubmitError('Failed to submit the form. Please try again.');
            console.error('Submit error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-5">
            <Button variant="outlined" className="text-orange-600 border-orange-600" onClick={handleOpen}>
                <IconButton
                    className="text-orange-600 border-orange-600 p-0 text-base"
                >
                    <AddIcon className="size-5" />  Add
                </IconButton>
            </Button>
            <Dialog open={open} onClose={handleClose} className="w-full">
                <DialogContent className="bg-white text-black rounded-md w-1/2 m-0 w-full">
                    <DialogTitle className="text-xl font-bold text-gray-800 mb-6 pl-0">
                        Add Equipments
                    </DialogTitle>

                    {submitError && <FormHelperText error>{submitError}</FormHelperText>}

                    <FormControl fullWidth className="mb-4" error={!!errors.name}>
                        <InputLabel>Name</InputLabel>
                        <TextField
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                            className="w-full"
                            placeholder='Name'
                            variant="outlined"
                        />
                        {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth className="mb-4" error={!!errors.select1}>
                        <InputLabel>Condition</InputLabel>
                        <Select
                            value={select1Value}
                            onChange={(e) => setSelect1Value(e.target.value)}
                            className="w-full"
                            variant="outlined"
                        >
                            <MenuItem value="new">New</MenuItem>
                            <MenuItem value="used">Used</MenuItem>
                            <MenuItem value="refurbished">Refurbished</MenuItem>
                        </Select>
                        {errors.select1 && <FormHelperText>{errors.select1}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth className="mb-4" error={!!errors.quantity}>
                        <InputLabel shrink>Quantity</InputLabel>
                        <TextField
                            type="number"
                            value={quantityValue}
                            onChange={(e) => setQuantityValue(parseInt(e.target.value, 10) || 0)}
                            className="w-full"
                            InputProps={{ inputProps: { min: 1 } }}
                            variant="outlined"
                        />
                        {errors.quantity && <FormHelperText>{errors.quantity}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth className="mb-4" error={!!errors.select2}>
                        <InputLabel>Select Category</InputLabel>
                        <Select
                            value={select2Value}
                            onChange={(e) => setSelect2Value(e.target.value)}
                            className="w-full"
                            variant="outlined"
                        >
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="furniture">Furniture</MenuItem>
                            <MenuItem value="tools">Tools</MenuItem>
                        </Select>
                        {errors.select2 && <FormHelperText>{errors.select2}</FormHelperText>}
                    </FormControl>

                    <DialogActions className="mt-4 px-0 flex justify-between flex-row-reverse">
                        <Button 
                            variant="contained" 
                            className="bg-orange-600 w-full min-h-12" 
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};
