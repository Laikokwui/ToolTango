"use client";

import React, { useState,useEffect } from 'react';
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

interface EquipmentProps {
    name: string;
    condition: string;
    quantity: number;
    categoryId: number;
}

interface Categories {
    id: number,
    name: string
}

const AddEquipmentModal: React.FC<{ categories: Categories[] }> = ({ categories }) => {
    const [open, setOpen] = useState(false);

    const [nameValue, setNameValue] = useState<string>('');
    const [conditionValue, setConditionValue] = useState<string>('');
    const [quantityValue, setQuantityValue] = useState<number>(1);
    const [categoryIdValue, setCategoryIdValue] = useState<number>(-1);

    const [categoriesList, setCategoriesList] = useState<Categories[]>(categories);

    const [errors, setErrors] = useState({
        name: '',
        condition: '',
        quantity: '',
        categoryId: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addEquipment = async (newEquipment:EquipmentProps) => {
        try {
          const response = await axios.post('https://tooltangoapi.azurewebsites.net/api/equipment', newEquipment);
          return response.data; // Assuming the response contains the added equipment
        } catch (error) {
          console.error('Error adding equipment:', error);
          throw error;
        }
    };


    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const newErrors = {
            name: nameValue ? '' : 'Name is required',
            condition: conditionValue ? '' : 'Condition is required',
            quantity: quantityValue > 0 ? '' : 'Quantity must be greater than 0',
            categoryId: categoryIdValue ? '' : 'Category is required',
        };
        
        const hasErrors = Object.values(newErrors).some(error => error);
        
        if (hasErrors) {
            setErrors(newErrors);
            return;
        }
        console.log("Add Item")

        setLoading(true);
        setSubmitError('');

        let result = await addEquipment({
            name: nameValue,
            condition: conditionValue,
            quantity: quantityValue,
            categoryId: categoryIdValue
        })

        if (result) {
            handleClose();
            setLoading(false);
            window.location.reload();
        } else {
            setSubmitError('Failed to submit the form. Please try again.');
            console.error('Submit error:', errors);
            setLoading(false);
        }
    };

    return (
        <div className="mb-5">
            <Button variant="outlined" className="text-orange-600 border-orange-600 text-base" onClick={handleOpen}>
                <AddIcon className="size-5" />  Add
            </Button>
            <Dialog open={open} onClose={handleClose} className="w-full">
                <DialogContent className="bg-white text-black rounded-md w-1/2 m-0 w-full">
                    <DialogTitle className="text-xl font-bold text-gray-800 mb-6 pl-0">
                        Add Equipments
                    </DialogTitle>

                    {submitError && <FormHelperText error>{submitError}</FormHelperText>}

                    <FormControl fullWidth className="mb-4" error={!!errors.name}>
                        <TextField
                            label="Name"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                            className="w-full"
                            placeholder='Name'
                            variant="outlined"
                        />
                        {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth className="mb-4" error={!!errors.condition}>
                        <InputLabel>Condition</InputLabel>
                        <Select
                            label="Condition"
                            value={conditionValue}
                            onChange={(e) => setConditionValue(e.target.value)}
                            className="w-full"
                            variant="outlined"
                        >
                            <MenuItem value="new">New</MenuItem>
                            <MenuItem value="used">Used</MenuItem>
                            <MenuItem value="damaged">Damaged</MenuItem>
                        </Select>
                        {errors.condition && <FormHelperText>{errors.condition}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth className="mb-4" error={!!errors.quantity}>
                        <InputLabel shrink>Quantity</InputLabel>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantityValue}
                            onChange={(e) => setQuantityValue(parseInt(e.target.value, 10) || 0)}
                            className="w-full"
                            InputProps={{ inputProps: { min: 1 } }}
                            variant="outlined"
                        />
                        {errors.quantity && <FormHelperText>{errors.quantity}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth className="mb-4" error={!!errors.categoryId}>
                        <InputLabel>Select Category</InputLabel>
                        <Select
                            label="Select Category"
                            value={categoryIdValue}
                            onChange={(e) => setCategoryIdValue(Number(e.target.value))}
                            className="w-full"
                            variant="outlined"
                        >
                            {categoriesList.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                            ))}
                        </Select>
                        {errors.categoryId && <FormHelperText>{errors.categoryId}</FormHelperText>}
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

export default AddEquipmentModal;
