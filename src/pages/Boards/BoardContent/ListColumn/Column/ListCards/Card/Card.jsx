import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';


function TrelloCard({ card }) {

    const shouldShowCardAction = () => {
        return (
            !!card?.memberIds?.length ||
            !!card?.comments?.length ||
            !! card?.attachments?.length
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
                    image={card?.cover} // Khai báo ảnh
                    title='Minh và khầy'
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography variant="body1" component="div">
                        {card?.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {card?.description}
                    </Typography>
                </CardContent>
                {/* Nem card neu co Value */}
                {shouldShowCardAction() &&
                    <CardActions sx={{ p: '0 4px 8px 4px' }}>
                        {/* !! là boolean --> ! là phủ định <true>-><false> (ngược lại) --> Kiểu Boolean*/}
                        {!!card?.memberIds?.length &&
                            <Button startIcon={<GroupIcon />} size="small">{card?.memberIds?.length}</Button>
                        }
                        {!!card?.comments?.length &&
                            <Button startIcon={<CommentIcon />} size="small">{card?.comments?.length}</Button>
                        }
                        {!! card?.attachments?.length &&
                            <Button startIcon={<ShareIcon />} size="small">{card?.attachments?.length}</Button>
                        }
                    </CardActions>
                }
            </Card>
        </>
    );
}

export default TrelloCard;