import React, { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import Cloud from '@mui/icons-material/Cloud';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCardIcon from '@mui/icons-material/AddCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Button from '@mui/material/Button';
import DragHandleIcon from '@mui/icons-material/DragHandle';import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
// dnd-kit -- CSS ✅ ✅ ✅ ✅
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import ListCards from './ListCards/ListCards';
import { mapOrder } from '~/utils/sort';


const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

function Column({ column }) {

    // Dropdown Menu -- 🚀🚀🚀🚀
    const [anchorEl, setAnchorEl] = React.useState(null);
    // Trả sự kiện về chỗ cũ
    const buttonRef = useRef(null);

    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        buttonRef.current?.focus(); // Trả focus về lại
    };

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
    // Dropdown Menu -- 🚀🚀🚀🚀


    // dnd-kit -- sortable:
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging, // De lai bong :) hieu nom na la nhu vay :)
    } = useSortable({
        id: column._id,
        data: { ...column },
    });

    // CSS -- dnd-kit
    const dndKitColumnStyle = {
        // touchAction: 'none',
        // translate ko bi bien dang --> Giu nguyen -- Linh hoat giua transform && translate
        transform: CSS.Translate.toString(transform),
        transition, height: '100%',
        opacity: isDragging ? 0.5 : undefined,
    };

    // UI Add card in column
    const [openNewCardForm, setOpenNewCardForm] = useState(false);

    // Chuyen doi trang thai cua OpenNewColumnForm
    const toggleOpenNewCardForm = () => {
        return setOpenNewCardForm(!openNewCardForm);
    };

    // Save Input:
    const [addNewCardTitle, setAddNewCardTitle] = useState('');

    const addNewCard = (e) => {
        if (addNewCardTitle.trim() === '') {
            console.error('Please enter a valid Card title!');
            setAddNewCardTitle(''); // Reset input
            return;
        }

        // Call API here
        console.log('Value title: ', addNewCardTitle);

        // Reset input
        toggleOpenNewCardForm();
        setAddNewCardTitle(''); // Reset input
    };

    const colorTextField = (theme) => theme.palette.primary.textBlack;
    const colorTextField1 = (theme) => theme.palette.primary.main;

    return (
        <div
            // Package DND_KIT is here 👇🏼👇🏼👇🏼👇🏼
            ref={setNodeRef}
            style={dndKitColumnStyle}
            {...attributes}
            // Package DND_KIT is here 👆🏼👆🏼👆🏼👆🏼
        >
            {/* HEADER -- 🙃🙃🙃*/}
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: '#dff9fb',
                    ml: 2,
                    borderRadius: '4px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
                }}
            >
                <Box sx={{
                    height: COLUMN_HEADER_HEIGHT,
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography
                        variant='h6'
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: '600'
                        }}
                    >
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title='More options'>
                            <IconButton
                                id='basic-button-dropdown'
                                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    color: 'primary.textBlack'
                                }}
                            ><KeyboardArrowDownIcon /></IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu-column-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button-dropdown',
                            }}
                        >
                            {/* Add columns */}
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <AddCardIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new Card</ListItemText>
                            </MenuItem>
                            {/* Cut */}
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            {/* Copy */}
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ContentCopyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            {/* Paste */}
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ContentPasteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Remove this Columns</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {/* Import ListCard is here 👇🏼 */}
                <ListCards cards={orderedCards}/>
                {/* Import ListCard is here */}

                {/* FOOTER -- 👇🏼👇🏼👇🏼*/}
                <Box sx={{
                    height: COLUMN_FOOTER_HEIGHT,
                    p: 1.5,
                }}>
                    {!openNewCardForm
                        ? <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                onClick={toggleOpenNewCardForm}
                                startIcon={<AddCardIcon />}>
                                Add new card
                            </Button>
                            <Tooltip title='Drag to move' sx={{ cursor: 'pointer' }}>
                                <DragHandleIcon />
                            </Tooltip>
                        </Box>
                        : <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <TextField
                                label="Enter card title"
                                type="text"
                                size='small'
                                variant='outlined'
                                autoFocus
                                data-no-dnd='true' // un - drag dndKit
                                value={addNewCardTitle}
                                onChange={(e) => {
                                    // Remove console --> 👇🏼
                                    console.log('title: ', e.target.value);
                                    return setAddNewCardTitle(e.target.value);
                                }}
                                sx={{
                                    '& label': { color: colorTextField1 },
                                    '& input': { color: colorTextField1 },
                                    '$ label.Mui-focused': { color: colorTextField1 },
                                    '& .MuiFormLabel-root': { color: colorTextField1 },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: colorTextField1 },
                                        '&.Mui-focused fieldset': { borderColor: colorTextField1 }
                                    }
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Button
                                    onClick={addNewCard}
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
                                    Add
                                </Button>
                                <CloseIcon
                                    onClick={toggleOpenNewCardForm}
                                    fontSize='small'
                                    sx={{ color: colorTextField1, cursor: 'pointer' }}
                                />
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>

        </div>
    );
}

export default Column;