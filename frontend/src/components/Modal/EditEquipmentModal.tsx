import React, { useState, useEffect } from 'react';
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
    FormHelperText,
    SelectChangeEvent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface EquipmentProps {
    id: number;
    name: string;
    condition: string;
    quantity: number;
    categoryId: number;
}

interface Categories {
    id: number,
    name: string
}

const EditEquipmentModal: React.FC<{ equipment: EquipmentProps, categories: Categories[] }> = ({ equipment ,categories }) => {
    const [open, setOpen] = useState(false);

    const [nameValue, setNameValue] = useState<string>(equipment.name);
    const [conditionValue, setConditionValue] = useState<string>(equipment.condition);
    const [quantityValue, setQuantityValue] = useState<number>(equipment.quantity);
    const [categoryIdValue, setCategoryIdValue] = useState<number>(equipment.categoryId);

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

    const handleConditionChange = (event: SelectChangeEvent<string>) => {
        setConditionValue(event.target.value as string);
    };

    const editEquipment = async () => {
        try {
            const response = await axios.put(`https://tooltangoapi.azurewebsites.net/api/equipment/${equipment.id}`, {
                id: equipment.id,
                name: nameValue,
                condition: conditionValue,
                quantity: quantityValue,
                categoryId: categoryIdValue
            });

            console.log('Updated:', response.data);
            handleClose();
            return true;
        } catch (error) {
            setSubmitError('Failed to update the form. Please try again.');
            console.error('Update error:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const newErrors = {
            name: nameValue ? '' : 'Name is required',
            condition: conditionValue ? '' : 'Condition is required',
            quantity: quantityValue > 0 ? '' : 'Quantity must be greater than 0',
            categoryId: categoryIdValue ? '' : 'CategoryId is required',
        };

        if (Object.values(newErrors).some(error => error)) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setSubmitError('');

        const result = await editEquipment();

        if (result) {
            handleClose();
            window.location.reload();
        } else {
            setSubmitError('Failed to submit the form. Please try again.');
            console.error('Submit error:', errors);
            setLoading(false);
        }
    };

    

    useEffect(() => {
        setNameValue(equipment.name);
        setConditionValue(equipment.condition);
        setQuantityValue(equipment.quantity);
        setCategoryIdValue(equipment.categoryId);
    }, [equipment]);

    return (
        <div className="mb-5">
            <IconButton
                className="text-orange-600 border-orange-600 p-0 text-base"
                onClick={handleOpen}
            >
                <EditIcon className="size-5" />
            </IconButton>
            <Dialog open={open} onClose={handleClose} className="w-full">
                <DialogContent className="bg-white text-black rounded-md w-1/2 m-0 w-full">
                    <DialogTitle className="text-xl font-bold text-gray-800 mb-6 pl-0">
                        Edit Equipment
                    </DialogTitle>

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
                            onChange={handleConditionChange}
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
                    
                    {submitError && <FormHelperText error>{submitError}</FormHelperText>}
                    <br/>

                    <DialogActions className="mt-4 px-0 flex justify-between flex-row-reverse">
                        <Button 
                            variant="contained" 
                            className="bg-orange-600 w-full min-h-12" 
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditEquipmentModal;
