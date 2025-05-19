import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppsIcon from '@mui/icons-material/Apps';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

// import trelloLogo from '~/assets/trelloLogo.svg' --> Import kieu cu ‼️‼️
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as TrelloLogo } from '~/assets/trelloLogo.svg'; // import kieu Plugin ✅
import Typography from '@mui/material/Typography';

import ModeSelect from '~/components/ModeSelects';
import WorkSpaces from './Menus/WorkSpace';
import Recent from './Menus/Recent';
import Template from './Menus/Template';
import Profile from './Menus/Profiles';

function AppBar() {
    return (
        <>
            {/* Navbar -- Header */}
            <Box
                px={2} //padding left + right
                sx={{
                    width: '100%',
                    // height: '48px', ---> Cũ ‼️
                    height: (theme) => theme.trello.appBarHeight, // Mới ✅ ✅ ✅
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', gap: 2, overflowX: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AppsIcon sx={{ color: 'primary.main' }}/>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SvgIcon component={TrelloLogo} fontSize='small' inheritViewBox sx={{ color: 'primary.main' }}/>
                        <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {/* WorkSpaces ✅*/}
                        <WorkSpaces />
                        {/* Recent ✅*/}
                        <Recent />
                        <Template />
                        <Button variant='outlined'>Create</Button>
                    </Box>
                </Box>
                {/* right */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        id="outlined-search"
                        label="Search..."
                        type="search" size='small'
                        sx={{ minWidth: '120px' }}
                    />
                    {/* Components dung nhieu noi! */}
                    <ModeSelect />
                    {/* Notify */}
                    <Tooltip title="Notifications">
                        <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                            <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
                        </Badge>
                    </Tooltip>
                    {/* Help Icons */}
                    <Tooltip title="Help">
                        <HelpOutlineIcon sx={{ color: 'primary.main' }}/>
                    </Tooltip>
                    <Profile />
                </Box>
            </Box>
        </>
    );
}

export default AppBar;