import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { capitalizeFirstLetter } from '~/utils/formatters';

// Sửa biến chung! -- Style
const STYLES_MENU_BOARD_BAR = {
    color: 'primary.main',
    backgroundColor: 'white',
    border: 'none', paddingX: '5px',
    borderRadius: '2px',

    // Custom Icons nè ‼️ ‼️ ‼️
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    },
    '&:hover': {
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15)
    }
};


function BoardBar({ board }) {

    // Optional Destructuring 👇🏼
    // const { board } = props;
    // const board = props.board;
    return (
        <>
            {/* Navbar - Board Bar */}
            <Box px={2} sx={{
                width: '100%',
                // height: '48px', ---> Cũ ‼️
                height: (theme) => theme.trello.boardBarHeight, // Mới ✅ ✅ ✅
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', gap: 2, overflowX: 'auto',
                borderTop: '1px solid #00bfa5',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Dashboard --- */}
                    <Chip
                        sx={STYLES_MENU_BOARD_BAR}
                        icon={<DashboardIcon />}
                        // label="Dashboard"  ---> cũ ‼️‼️‼️
                        label={board?.title}
                        onClick={() => console.log('This is Dashboard')}
                    />
                    {/* Public WorkSpaces */}
                    <Chip
                        sx={STYLES_MENU_BOARD_BAR}
                        icon={<VpnLockIcon />}
                        // label="Public WorkSpace" ---> cũ ‼️‼️‼️
                        label={capitalizeFirstLetter(board?.type)}
                        onClick={() => console.log('This is Public WorkSpace')}
                    />
                    {/* Add to Google Drive */}
                    <Chip
                        sx={STYLES_MENU_BOARD_BAR}
                        icon={<AddToDriveIcon />}
                        label="Add to Google Drive"
                        onClick={() => console.log('This is Google Drive')}
                    />
                    {/* Automation */}
                    <Chip
                        sx={STYLES_MENU_BOARD_BAR}
                        icon={<AutoAwesomeIcon />}
                        label="Automation"
                        onClick={() => console.log('This is Automation')}
                    />
                    {/* Automation */}
                    <Chip
                        sx={STYLES_MENU_BOARD_BAR}
                        icon={<FilterListIcon />}
                        label="Filter"
                        onClick={() => console.log('This is Filter')}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant='outlined'
                        startIcon={<PersonAddAltIcon />}
                    >
                        Invite
                    </Button>

                    <AvatarGroup
                        max={4}
                        sx={{
                            '& .MuiAvatar-root' : {
                                height: 32,
                                width: 32,
                                fontSize: 16
                            }
                        }}
                    >
                        <Tooltip title='Minh đen'>
                            <Avatar
                                alt='Minh đen'
                                // src='https://pbs.twimg.com/profile_images/1758508514954391552/ymUgHzSG_400x400.jpg'
                                src='../public/meme2.JPG'
                            />
                        </Tooltip>
                        <Tooltip title='Minh đầu đinh'>
                            <Avatar
                                alt='Minh đầu đinh'
                                // src='https://cdn.24h.com.vn/upload/1-2025/images/2025-01-17/2-1737097800-113-width645height904.jpg'
                                src='../public/meme3.JPG'
                            />
                        </Tooltip>
                    </AvatarGroup>
                </Box>
            </Box>
        </>
    );
}

export default BoardBar;