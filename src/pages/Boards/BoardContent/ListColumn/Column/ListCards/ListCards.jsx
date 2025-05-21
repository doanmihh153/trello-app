import React from 'react';
import Box from '@mui/material/Box';
// SortableContext
import {
    SortableContext,
    verticalListSortingStrategy // doc
} from '@dnd-kit/sortable';

import TrelloCard from './Card/Card';

const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

function ListCards({ cards }) {
    return (
        <SortableContext
            items={cards?.map( column => column._id )}
            strategy={verticalListSortingStrategy} // tối ưu kéo thả theo kéo thả :) --> horizontal -> Ngang -- Doc --> vertical
        >
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
                {cards?.map((card) => {
                    return (
                        <TrelloCard key={card._id} card={card}/>
                    );
                })}
                {/* <TrelloCard temporaryHideMedia/> */}
                {/* Card is in here -- ✍️✍️✍️*/}

            </Box>

        </SortableContext>
    );
}

export default ListCards;