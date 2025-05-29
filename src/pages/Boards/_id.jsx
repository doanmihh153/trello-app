// Đây là những Import mới ‼️ ‼️ ‼️ ‼️
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mockAPI';
import { fetchBoardDetailsAPI } from '~/apis';

function Board() {

    const [board, setBoard] = useState(null);

    // useEffect(() => {
    //     // Cái này là fix cứng
    //     const boardId = '68349d5772aa9e04386219bf';
    //     // CallApi
    //     fetchBoardDetailsAPI(boardId)
    //         .then((board) => {
    //             setBoard(board);
    //         });
    // }, []);

    useEffect(() => {
        setBoard(mockData.board);
    }, []);

    return (
        <>
            {/* chiều rộng tối đa -> disableGutters && maxWidth==false */}
            <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
                {/* App Bar - Header */}
                <AppBar />
                {/* Board Bar - Header*/}
                <BoardBar board={board}/>
                {/* Board Content */}
                <BoardContent board={board}/>
            </Container>
        </>
    );
}

export default Board;