// Board Content
import React from 'react';
import Box from '@mui/material/Box';

import ListColumns from './ListColumn/ListColumns';

function BoardContent() {

    return (
        <>
            {/* Content */}
            <Box sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '5px 0',
            }}>
                <ListColumns />
            </Box>
        </>
    );
};

export default BoardContent;