// Board Content
import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';

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
    closestCorners,
    pointerWithin,
    // rectIntersection,
    getFirstCollision
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
// package lodash
import { cloneDeep, isEmpty } from 'lodash';

import Column from './ListColumn/Column/Column';
import TrelloCard from './ListColumn/Column/ListCards/Card/Card';
import ListColumns from './ListColumn/ListColumns';
import { mapOrder } from '~/utils/sort';
import { generatePlaceholderCard } from '~/utils/formatters';

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
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);

    const lastOverId = useRef(null);

    // on Drag Start functions
    const handleDragStart = (event) => {
        setActiveDragItemsId(event?.active?.id);
        // Neu columnID dang keo == column -> la column || neu columnID dang keo == card --> Card
        setActiveDragItemsType(event?.active?.data?.current?.columnId
            ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        );
        setActiveDragItemsData(event?.active?.data?.current);

        // Neu keo card thi set hanh dong old columns
        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
        };
        console.log('handleDragStart: ', event);
    };

    // Clean code ----- ✅ ✅ ✅ ✅
    // Cap nhap state khi di chuyen card kahcs nhau!
    const moveCardBetweenDifferentColumns = (
        oColumn, oCardId,
        active, over,
        aColumn, aDraggingCardId,
        aDraggingCardData
    ) => {
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

                // Them card giu cho neu column rong -- Card ao!!!
                if (isEmpty(nextActiveColumns.cards)) {
                    nextActiveColumns.cards = [generatePlaceholderCard(nextActiveColumns)];
                    console.log('Column Empty! ‼️ -- Card cuoi cung bi keo di');
                };
                // Update card in new column (cap nhat mang moi)
                nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id);
            };

            if (nextOverColumns) {
                // kiem tra ton tai cua card
                nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== aDraggingCardId);

                const rebuild_activeDraggingCardData = {
                    ...aDraggingCardData,
                    columnId: nextOverColumns._id,
                };
                // Update Card in new Column --> UI
                nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData );

                // Xoa card giu cho trong Column neu it nhat 1 card trong column duoc them vao
                nextOverColumns.cards = nextOverColumns.cards.filter(card => !card.FE_PlaceholderCard);
                // Update Array new
                nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id);
            };
            return nextColumn;
        });
    };

    // DragEnd Function: -- Xu ly luu tru keo tha!!
    const handleDragEnd = (event) => {
        // Product --> Delete Console.log(); ✍️ ✍️ ✍️
        console.log('handleDragEnd: ', event); // console.log ra thay doi column ✍️ ✍️ ✍️

        const { active, over } = event;
        // Kiểm tra nếu không tồn tại over --> return
        if (!active || !over) return;

        // Kiem tra -- Xu ly drag Card
        if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // activeDragging Column
            const { id: aDraggingCardId, data: { current: aDraggingCardData } } = active;
            const { id: oCardId } = over;

            // Tim column cua no!
            const aColumn = findColumnByCardId(aDraggingCardId);
            const oColumn = findColumnByCardId(oCardId);

            if (!aColumn || !oColumn) return; // Neu khong ton t ai 1 trong 2 thi ko lam gi :)) -> khong bi crash web
            if (oldColumnWhenDraggingCard._id !== oColumn._id) {
                console.log('Drag card in two columns or! 😄😄😄');
                moveCardBetweenDifferentColumns(
                    oColumn,
                    oCardId,
                    active,
                    over,
                    aColumn,
                    aDraggingCardId,
                    aDraggingCardData
                );
            } else {
                console.log('Drag card in a column 👌🏼👌🏼👌🏼');

                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDragItemsId);
                const newCardIndex = oColumn?.cards?.findIndex(card => card._id === oCardId);

                // array move
                const dndOrderedCard = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex);

                setOrderedColumnsState(prevColumns => {
                    const nextColumn = cloneDeep(prevColumns);

                    // Find Column dang tha
                    const targetColumn = nextColumn.find(column => column._id === oColumn._id);
                    targetColumn.cards = dndOrderedCard;
                    targetColumn.cardOrderIds = dndOrderedCard.map(card => card._id);
                    return nextColumn;
                });
            };
        };

        // kiem tra -- Xu Ly drag la column
        if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {

            // Neu dung vi tri drag thi tra ve!
            if ( active.id !== over.id ) {

                // Vi tri cu 👇🏼👇🏼👇🏼 tu active
                const oldColumnIndex = orderedColumnsState.findIndex((column) => {
                    return column._id === active.id;
                });

                // Vi tri moi 👇🏼👇🏼👇🏼 tu over
                const newColumnIndex = orderedColumnsState.findIndex((column) => {
                    return column._id === over.id;
                });

                const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex );

                // const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id);
                setOrderedColumnsState(dndOrderedColumns);
                // In ra console.log -->
                console.log('Drag Success ✅ ✅ ✅');
            };
        };


        // Ham Start --> Du lieu sua khi keo tha luon phai tra ve null
        setActiveDragItemsId(null);
        setActiveDragItemsType(null);
        setActiveDragItemsData(null);
        setOldColumnWhenDraggingCard(null);
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
            moveCardBetweenDifferentColumns(
                oColumn,
                oCardId,
                active,
                over,
                aColumn,
                aDraggingCardId,
                aDraggingCardData
            );
        };
    };

    // args == arguments --> doi so va tham so
    const collisionDetectionStrategy = useCallback((args) => {
        if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args });
        };
        // tim diem va cham
        const pointerIntersections = pointerWithin(args);

        if (!pointerIntersections?.length) return;

        // const intersections =
        // pointerIntersections?.length > 0
        //     ? pointerIntersections
        //     : rectIntersection(args);

        let overId = getFirstCollision(pointerIntersections, 'id');

        if (overId) {

            const checkColumn = orderedColumnsState.find(column => column._id === overId);
            if (checkColumn) {
                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                        container =>
                            (container.id !== overId)
                            && checkColumn?.cardOrderIds.includes(container.id)),
                })[0]?.id;
            };
            lastOverId.current = overId;
            return [{ id: overId }];
        }
        return lastOverId.current ? [{ id: lastOverId.current }] : [];

    }, [activeDragItemsType, orderedColumnsState]);

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            collisionDetection={collisionDetectionStrategy}
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