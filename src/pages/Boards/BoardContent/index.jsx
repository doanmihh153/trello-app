// Board Content
import Box from '@mui/material/Box';

function BoardContent() {
    return ( 
        <>
        {/* Content */}
        <Box sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        }}>
          Board Content
        </Box>
        </>
    );
};

export default BoardContent;