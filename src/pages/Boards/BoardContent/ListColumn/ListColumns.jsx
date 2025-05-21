import React from 'react';
import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// Import SortableContext trong dnd-kit
import {
    SortableContext,
    horizontalListSortingStrategy, // ngang
    //verticalListSortingStrategy // doc
} from '@dnd-kit/sortable';

function ListColumns({ columns }) {
    // Sortable Context yeu cau context dang items la mot Array ['id-1', 'id-2', ...] --> (khong phai dang nay!) [{ id:'id-1' }]
    // Nen Map du lieu ra --> [ Array ] chu dung de { Object }
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
                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
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
            </Box>
        </SortableContext>
    );
}

export default ListColumns;