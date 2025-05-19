import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';


function TrelloCard({ temporaryHideMedia }) {

    if (temporaryHideMedia) {
        return (
            <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                overflow: 'unset',
            }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography variant="body1" component="div">
                        We're
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <>
            <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                overflow: 'unset',
            }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image='/public/minhvakhay.jpg' // Khai báo ảnh
                    title='Minh và khầy'
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography variant="body1" component="div">
                    We're
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    They have been best friends since they were kids, growing up together and sharing countless memories.
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    <Button startIcon={<FavoriteIcon />} size="small">1k</Button>
                    <Button startIcon={<ThumbUpIcon />} size="small">2k3</Button>
                    <Button startIcon={<CommentIcon />} size="small">303</Button>
                </CardActions>
            </Card>
        </>
    );
}

export default TrelloCard;