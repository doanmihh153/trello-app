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
// package lodash
import { cloneDeep } from 'lodash';

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

        // Kiem tra drag column || drag card
        if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            console.log('drag Card 🙃');
            return;
        };
        // Kiểm tra nếu không tồn tại over --> return
        if (!active || !over) return;

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

    // find column:
    const findColumnByCardId = (cardId) => {
        return orderedColumnsState.find(column => column.cards.map(card => card._id)?.includes(cardId));
    };

    // Qua trinh dragend <ket thuc>
    const handleDragOver = (event) => {
        console.log('Drag Column 📊');
        // khong lam gi gi neu dang drag ->
        if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

        // a --> active ✅ || o --> over ‼️ || e --> event 🚀 --> Xem thi len handleDragEnd 👆🏼
        const { active, over } = event;

        if (!active || !over) return;

        // drag card pending...
        const { id: aDraggingCardId, data: { current: aDraggingCardData } } = active; // active - dragging card id/data
        // interact card down up -- so với đang drag card
        const { id: oCardId } = over; // over - card id

        // Tim column cua no!
        const aColumn = findColumnByCardId(aDraggingCardId);
        const oColumn = findColumnByCardId(oCardId);
        if (!aColumn || !oColumn) return; // Neu khong ton tai 1 trong 2 thi ko lam gi :)) -> khong bi crash web

        // neu 2 column kha nhau thi chay!
        if (aColumn._id !== oColumn._id) {
            setOrderedColumnsState(prevColumns => {
                // tim vi tri index cua card!
                const oCardIndex = oColumn?.cards?.findIndex(card => card._id === oCardId);
                console.log('index card: ', oCardIndex);

                let newCardIndex;

                const isBelowOverItems =
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.to+ over.rect.height;

                const modifier = isBelowOverItems ? 1 : 0;
                newCardIndex = oCardIndex >= 0 ? oCardIndex + modifier : oColumn?.cards.length + 1;

                // clone Array orderedColumnsState old --> New Array --> update new orderedColumnsState
                const nextColumn = cloneDeep(prevColumns);

                const nextActiveColumns = nextColumn.find(column => column._id === aColumn._id);
                const nextOverColumns = nextColumn.find(column => column._id === oColumn._id);

                if (nextActiveColumns) {
                    // Delete card in column drag active (xoa cac o column active (cu) --> luc keo tha de sang card khac)
                    nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card._id !== aDraggingCardId);

                    // Update card in new column (cap nhat mang moi)
                    nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id);
                };

                if (nextOverColumns) {
                    // kiem tra ton tai cua card
                    nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== aDraggingCardId);
                    // Update Card in new Column --> UI
                    nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, aDraggingCardData );

                    // Update Array new
                    nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id);
                };
                return nextColumn;
            });
        };
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
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