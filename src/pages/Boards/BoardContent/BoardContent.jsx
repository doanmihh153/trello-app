// Board Content
import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListColumns from './ListColumn/ListColumns';
import { mapOrder } from '~/utils/sort';

// Import Package DND-kit
import {
    DndContext,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumn/Column/Column';
import TrelloCard from './ListColumn/Column/ListCards/Card/Card';


// ACTIVE:
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
};


function BoardContent({ board }) {


    // Xu ly state-thay-doi
    const [orderedColumnsState, setOrderedColumnsState] = useState([]);

    useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, board?._id);
        setOrderedColumnsState(orderedColumns);
    }, [board]);

    // Phan biet column || card duoc drag --> Lien quan den onDrag
    const [activeDragItemsId, setActiveDragItemsId] = useState(null);
    const [activeDragItemsType, setActiveDragItemsType] = useState(null);
    const [activeDragItemsData, setActiveDragItemsData] = useState(null);

    // on Drag Start functions
    const handleDragStart = (e) => {
        setActiveDragItemsId(e?.active?.id);
        // Neu columnID dang keo == column -> la column || neu columnID dang keo == card --> Card
        setActiveDragItemsType(e?.active?.data?.current?.columnId
            ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        );
        setActiveDragItemsData(e?.active?.data?.current);
        console.log('handleDragStart: ', e);
    };


    // DragEnd Function: -- Xu ly luu tru keo tha!!
    const handleDragEnd = (event) => {
        // Product --> Delete Console.log(); ✍️ ✍️ ✍️
        console.log('handleDragEnd: ', event); // console.log ra thay doi column ✍️ ✍️ ✍️

        const { active, over } = event;

        // Kiểm tra nếu không tồn tại over --> return
        if (!over) return;

        // Neu dung vi tri drag thi tra ve!
        if ( active.id !== over.id ) {


            // Vi tri cu 👇🏼👇🏼👇🏼 tu active
            const oldIndex = orderedColumnsState.findIndex((column) => {
                return column._id === active.id;
            });

            // Vi tri moi 👇🏼👇🏼👇🏼 tu over
            const newIndex = orderedColumnsState.findIndex((column) => {
                return column._id === over.id;
            });

            const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex );

            // const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id);
            setOrderedColumnsState(dndOrderedColumns);
            // In ra console.log -->
            console.log('Drag Success ✅ ✅ ✅');
        };

        // Ham Start
        setActiveDragItemsId(null);
        setActiveDragItemsType(null);
        setActiveDragItemsData(null);
    };

    // Xu ly CLick ! 🙃
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint : { distance: 10 }
    }); // Chuot --> pointer --> yeu cau di chuot 10px de active event

    const mouserSensor = useSensor(MouseSensor, {
        activationConstraint : { distance: 10 }
    }); // Chuot --> pointer --> yeu cau di chuot 10px de active event

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint : { delay: 250, tolerance: 5 }
    }); // Chuot --> pointer --> yeu cau di chuot 10px de active event

    // const sensors = useSensors(pointerSensor); // Cam bien --> Cam ung...
    const sensors = useSensors(mouserSensor, touchSensor);


    // Xử lý CSS DropShadow in Column
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5'
                },
            },
        }),
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            sensors={sensors}
        >
            {/* Content */}
            <Box sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '5px 0',
            }}>
                <ListColumns columns={orderedColumnsState} key={board._id}/>
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemsType && null}
                    {(activeDragItemsId && activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
                    && <Column column={activeDragItemsData}
                    />}
                    {(activeDragItemsId && activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.CARD)
                    && <TrelloCard card={activeDragItemsData}
                    />}
                </DragOverlay>
            </Box>
        </DndContext>
    );
};

export default BoardContent;