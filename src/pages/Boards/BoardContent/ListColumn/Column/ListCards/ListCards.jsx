import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TrelloCard from './Card/Card';

const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

function ListCards() {
    return (
        <>
            {/* CONTENT -- BOX LIST CARD -- ✍️✍️✍️*/}
            <Box sx={{
                p: '0 5px',
                m: '0 5px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowX: 'hidden',
                overflowY: 'auto',
                maxHeight: (theme) => `calc(
                    ${theme.trello.boardContentHeight} -
                    ${theme.spacing(5)} -
                    ${COLUMN_FOOTER_HEIGHT} -
                    ${COLUMN_HEADER_HEIGHT}
                )`,
                '&::-webkit-scrollbar': {
                    width: '6px',
                    height: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#bdc3c7',
                    borderRadius: '10px'
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#95a5a6',
                    borderRadius: '10px'
                }
            }}>
                {/* Card is in here -- ✍️✍️✍️*/}
                <TrelloCard />
                <TrelloCard temporaryHideMedia/>
                {/* Card is in here -- ✍️✍️✍️*/}

            </Box>

        </>
    );
}

export default ListCards;