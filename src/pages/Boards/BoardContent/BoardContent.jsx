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
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';


function BoardContent({ board }) {


    // Xu ly state-thay-doi
    const [orderedColumnsState, setOrderedColumnsState] = useState([]);

    useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, board?._id);
        setOrderedColumnsState(orderedColumns);
    }, [board]);

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

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors} >
            {/* Content */}
            <Box sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '5px 0',
            }}>
                <ListColumns columns={orderedColumnsState} key={board._id}/>
            </Box>
        </DndContext>
    );
};

export default BoardContent;