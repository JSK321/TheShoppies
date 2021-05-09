// React
import { useState, useEffect } from 'react';
// API
import API from '../../utils/API';
// clsx
import clsx from 'clsx';
// Material-UI Components
import { makeStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
// Material-UI Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './styles.css';
// CSS
const useStyles = makeStyles((theme) => ({
    root: {
        width: '350px',
        background: 'hsla(216, 15%, 52%, 1)',
        color: 'black'
    },
    inputField: {
        width: '100%',
    },
    media: {
        width: '200px',
        height: '300px',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function SearchResult(props) {
    const classes = useStyles();
    const [movie, setMovie] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        API.searchMovieByTitle(props.id).then(res => {
            setMovie({
                title: res.data.Title,
                director: res.data.Director,
                released: res.data.Released,
                image: res.data.Poster,
                actors: res.data.Actors,
                plot: res.data.Plot,
                genre: res.data.Genre,
                id: res.data.imdbID
            });
        });
    }, [props.anchorEl]);

    return (
        <div className="moreInfoCard">
            {movie === null ?
                null
                :
                <Card className={classes.root}>
                    <CardHeader
                        title={movie.title}
                        subheader={
                            <Typography variant="p" style={{ color: "floralwhite" }}> Director: {movie.director}</Typography>
                        }
                    />
                    <CardMedia
                        className={classes.media}
                        image={movie.image}
                        title={movie.title}
                    />
                    <CardContent>
                        <List disablePadding>
                            <ListItem divider>
                                <ListItemText primary="Actors" secondary={
                                    <Typography variant="p" style={{ color: "floralwhite" }}> {movie.actors}</Typography>
                                } />
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Genre" secondary={
                                    <Typography variant="p" style={{ color: "floralwhite" }}> {movie.genre}</Typography>
                                } />
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="Released" secondary={
                                    <Typography variant="p" style={{ color: "floralwhite" }}> {movie.released}</Typography>
                                } />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon

                            />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <ListItem>
                            <ListItemText primary="Plot" secondary={
                                <Typography variant="p" style={{ color: "floralwhite" }}> {movie.plot}</Typography>
                            } />
                        </ListItem>
                    </Collapse>
                </Card>
            }
        </div>
    );
};
