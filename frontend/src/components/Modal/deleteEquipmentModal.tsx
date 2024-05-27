import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DeleteConfirmationDialog = ({ open, data, onClose, onDelete }) => {
    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <div className="mb-5">
            <IconButton
                onClick={handleOpen}
                className="text-red-600 border-red-600 p-0 text-base"
            >
                <DeleteIcon className="size-5" />
            </IconButton>
            <button 
                onClick={() => handleOpenDialog('Item 1')} 
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
            >
                <DeleteIcon />
            </button>
            <Dialog open={open} onClose={onClose} classes={{ paper: 'rounded-lg p-4' }}>
                <DialogTitle className="text-2xl font-bold text-gray-800">Delete Confirmation</DialogTitle>
                <DialogContent className="text-gray-600">
                    Are you sure you want to delete <span className="font-semibold">{data}</span>?
                </DialogContent>
                <DialogActions className="flex justify-end p-4">
                    <Button 
                        onClick={onClose} 
                        className="px-4 py-2 rounded-md mr-2 text-gray-600 bg-transparent hover:bg-gray-100 transition-colors duration-200"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDelete} 
                        className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-800 transition-colors duration-200"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteConfirmationDialog;
