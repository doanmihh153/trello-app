import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelects';
function AppBar() {
    return ( 
        <>
        {/* Navbar -- Header */}
        <Box 
          sx={{ 
            backgroundColor: 'primary.light',
            width: '100%',
            // height: '48px', ---> Cũ ‼️ 
            height: (theme) => theme.trello.appBarHeight,  // Mới ✅ ✅ ✅
            display: 'flex',
            alignItems: 'center'
          }}>
            {/* Components dung nhieu noi! */}
            <ModeSelect />
        </Box>
        </>
    );
}

export default AppBar;