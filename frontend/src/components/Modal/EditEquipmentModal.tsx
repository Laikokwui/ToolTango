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
    type: string;
}

const EditEquipmentModal: React.FC<{ equipment: EquipmentProps }> = ({equipment}) => {
    const [open, setOpen] = useState(false);
    const [conditionValue, setConditionValue] = useState<string|any>(equipment.condition);
    const [categoryValue, setCategoryValue] = useState<string>(equipment.type);
    const [nameValue, setNameValue] = useState<string>(equipment.name);
    const [quantityValue, setQuantityValue] = useState<number>(equipment.quantity || 1);
    const [errors, setErrors] = useState({
        name: '',
        select1: '',
        select2: '',
        quantity: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        setConditionValue(equipment.condition || '');
        setCategoryValue(equipment.type || '');
        setNameValue(equipment.name || '');
        setQuantityValue(equipment.quantity || 1);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConditionChange = (event: SelectChangeEvent<{ value: string }>) => {
        setConditionValue(event.target.value as string);
    };

    const handleSubmit = async () => {
        const newErrors = {
            name: '',
            select1: '',
            select2: '',
            quantity: '',
        };

        if (!nameValue) newErrors.name = "Name is required";
        if (!conditionValue) newErrors.select1 = "Condition is required";
        if (!categoryValue) newErrors.select2 = "Category is required";
        if (quantityValue <= 0) newErrors.quantity = "Quantity must be greater than 0";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        console.log("Edit Item")
        setSubmitError('');

        try {
            const response = await axios.put(`/api/equipment/${equipment.id}`, {
                id: equipment.id,
                name: nameValue,
                condition: conditionValue,
                quantity: quantityValue,
                category: categoryValue
            });

            console.log('Updated:', response.data);
            handleClose();
        } catch (error) {
            setSubmitError('Failed to update the form. Please try again.');
            console.error('Update error:', error);
        } finally {
            setLoading(false);
        }
    };

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

                    <FormControl fullWidth className="mb-4" error={!!errors.select1}>
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
                        {errors.select1 && <FormHelperText>{errors.select1}</FormHelperText>}
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

                    <FormControl fullWidth className="mb-4" error={!!errors.select2}>
                        <InputLabel>Select Category</InputLabel>
                        <Select
                            label="Select Category"
                            value={categoryValue}
                            onChange={(e) => setCategoryValue(e.target.value)}
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
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditEquipmentModal;
