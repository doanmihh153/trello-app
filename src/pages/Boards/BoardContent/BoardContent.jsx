// Board Content
import React from 'react';
import Box from '@mui/material/Box';
import ListColumns from './ListColumn/ListColumns';
import { mapOrder } from '~/utils/sort';

function BoardContent({ board }) {

    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, board?._id);

    return (
        <>
            {/* Content */}
            <Box sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '5px 0',
            }}>
                <ListColumns columns={orderedColumns}/>
            </Box>
        </>
    );
};

export default BoardContent;