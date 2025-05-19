// Đây là những Import mới ‼️ ‼️ ‼️ ‼️
import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
import AppBar from '~/components/AppBar';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';

function Board() {
    return (
        <>
            {/* chiều rộng tối đa -> disableGutters && maxWidth==false */}
            <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
                {/* App Bar - Header */}
                <AppBar />
                {/* Board Bar - Header*/}
                <BoardBar />
                {/* Board Content */}
                <BoardContent />
            </Container>
        </>
    );
}

export default Board;