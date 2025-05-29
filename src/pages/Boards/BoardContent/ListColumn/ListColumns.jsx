import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
// Import SortableContext trong dnd-kit
import {
    SortableContext,
    horizontalListSortingStrategy, // ngang
    //verticalListSortingStrategy // doc
} from '@dnd-kit/sortable';
import { add } from 'lodash';

function ListColumns({ columns }) {
    // Sortable Context yeu cau context dang items la mot Array ['id-1', 'id-2', ...] --> (khong phai dang nay!) [{ id:'id-1' }]
    // Nen Map du lieu ra --> [ Array ] chu dung de { Object }

    // Tao UI cho add Card:
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);

    // Chuyen doi trang thai cua OpenNewColumnForm
    const toggleOpenNewColumnForm = () => {
        return setOpenNewColumnForm(!openNewColumnForm);
    };

    // Save Input:
    const [addNewColumnTitle, setAddNewColumnTitle] = useState('');

    const addNewColumn = (e) => {
        if (addNewColumnTitle.trim() === '') {
            console.error('Please enter a valid column title!');
            setAddNewColumnTitle(''); // Reset input
            return;
        }

        // Call API here
        console.log('Value title: ', addNewColumnTitle);

        // Reset input
        toggleOpenNewColumnForm();
        setAddNewColumnTitle(''); // Reset input
    };


    return (
        <SortableContext
            items={columns?.map( column => column._id )}
            strategy={horizontalListSortingStrategy} // tối ưu kéo thả theo kéo thả :) --> horizontal -> Ngang -- Doc --> vertical
        >
            <Box sx={{
                bgcolor: 'inherit', // Kế thừa: inherit
                width: '100%', height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                // '&::-webkit-scrollbar-track': { m: 2 }
            }}>
                {/* Column Import here */}
                {columns?.map(column => {
                    return (
                        // Co the co them du lieu
                        <Column key={column._id} column={column}/>
                    );
                })}

                {/* <Column /> --> Fake du lieu */}

                {/* Add Columns */}
                {!openNewColumnForm
                    ? <Box onClick={toggleOpenNewColumnForm} sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff5d',
                        color: 'primary.contrastText',
                    }}>
                        <Button
                            startIcon={<AddIcon
                                sx={{ color: 'primary.contrastText' }}
                            />}
                            sx={{
                                color: 'primary.contrastText',
                                width: '100%',
                                pl: 2.5, px: 2
                            }}
                        >
                            Add new Column
                        </Button>
                    </Box>
                    : <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff5d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        <TextField
                            label="Enter column title"
                            type="text"
                            size='small'
                            variant='outlined'
                            autoFocus
                            value={addNewColumnTitle}
                            onChange={(e) => {
                                // Remove console --> 👇🏼
                                console.log('title: ', e.target.value);
                                return setAddNewColumnTitle(e.target.value);
                            }}
                            sx={{
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '$ label.Mui-focused': { color: 'white' },
                                '& .MuiFormLabel-root': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                }
                            }}
                        />
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Button
                                onClick={addNewColumn}
                                variant='contained'
                                color='primary'
                                size='small'
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.primary.main,
                                    '&:hover': { bgcolor: (theme) => theme.palette.primary.main, boxShadow: 'none' }
                                }}
                            >
                                Add column
                            </Button>
                            <CloseIcon
                                onClick={toggleOpenNewColumnForm}
                                fontSize='small'
                                sx={{ color: 'white', cursor: 'pointer' }}
                            />
                        </Box>
                    </Box>
                }
            </Box>
        </SortableContext>
    );
}

export default ListColumns;