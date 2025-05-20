// Đây là những Import mới ‼️ ‼️ ‼️ ‼️
import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mockAPI';


function Board() {
    return (
        <>
            {/* chiều rộng tối đa -> disableGutters && maxWidth==false */}
            <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
                {/* App Bar - Header */}
                <AppBar />
                {/* Board Bar - Header*/}
                <BoardBar board={mockData?.board}/>
                {/* Board Content */}
                <BoardContent board={mockData?.board}/>
            </Container>
        </>
    );
}

export default Board;