import { useState } from 'react';
// Components
import SearchResultCardInfo from '../SearchResultCardInfo';
// Material-UI Components
import { makeStyles, Card, List, CardActionArea, CardActions, CardContent, Popover, Grow } from '@material-ui/core';
// CSS
import './styles.css';
const useStyles = makeStyles({
    results: {
        overflow: 'auto',
        maxWidth: 500,
        padding: '1rem',
        marginBottom: '1rem'
    },
    card: {
        border: '1px solid floralwhite',
        padding: '1rem',
        marginBottom: '1rem',
        background:'transparent'
    },
    cardAction: {
        display: 'flex',
        justifyContent: "center",
        fontSize: '24px',
        fontWeight: 'bold',
        color:"floralwhite"
    },
});

export default function SearchResult(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [movieTitle, setMovieTitle] = useState(null);

    const handleClick = event => {
        let id = event.currentTarget.id;
        setAnchorEl(event.currentTarget);
        setMovieTitle(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="searchDiv">
            <List className={classes.results}>
                {!props.movies || props.movies < 1 ?
                    null
                    :
                    props.movies.map(movie => (
                        <Grow in={props.checked} timeout={700}>
                            <Card className={classes.card} key={movie.Title}>
                                <CardActionArea
                                    aria-describedby={id}
                                    className={classes.cardAction}
                                    onClick={handleClick}
                                    id={movie.Title}
                                >
                                    <img src={movie.Poster} alt={movie.Title} className="media" />
                                </CardActionArea>
                                <Popover
                                    id={id}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center',
                                    }}
                                >
                                    <SearchResultCardInfo
                                        movie={movie}
                                        anchorEl={anchorEl}
                                        id={movieTitle}
                                        nominations={props.nominations}
                                        handleNominateBtn={props.handleNominateBtn}

                                    />
                                </Popover>
                                <CardContent className={classes.cardAction} style={{fontFamily:"cursive"}}>
                                    {movie.Title} - {movie.Year}
                                </CardContent>
                                <CardActions>
                                    <button
                                        id={`${movie.imdbID}`}
                                        name={movie.Title}
                                        onClick={props.handleNominateBtn}
                                        className="nominateBtn"
                                        style={{color:'whitesmoke'}}
                                    >
                                        Nominate
                                </button>
                                </CardActions>
                            </Card>
                        </Grow>
                    ))}
            </List>
        </div>
    );
};
