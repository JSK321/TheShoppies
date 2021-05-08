import React from 'react';
// Material-UI Components
import { makeStyles, Card, CardHeader, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Typography, Divider } from '@material-ui/core';
// Material-UI Icons
import CancelIcon from '@material-ui/icons/Cancel';
// CSS
import './styles.css'
const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: '1rem',
    },
    nomList: {
        background: "transparent",
        border: '1px solid floralwhite'
    }
}));

export default function NomList(props) {
    const classes = useStyles();

    return (
        <div className="nomList">
            {props.nominations < 1 ?
                null
                :
                <Card className={classes.nomList}>
                    <CardHeader
                        title="Nominations"
                        style={{color: "floralwhite", textAlign:"center"}}
                    />
                    <List disablePadding>
                        {!props.nominations || props.nominations < 1 ?
                            null
                            :
                            props.nominations.map(nominee => (
                                <ListItem
                                    key={nominee.title}
                                    style={{ color: "floralwhite" }}
                                    divider
                                >
                                    <ListItemAvatar>
                                        <Avatar src={nominee.image} className={classes.large} />
                                    </ListItemAvatar>
                                    <ListItemText primary={nominee.title} secondary={
                                        <Typography variant="p" style={{ color: "floralwhite" }}> Director: {nominee.director}</Typography>
                                    } />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={props.handleRemoveBtn}
                                            id={nominee.id}
                                            name={nominee.title}
                                        >
                                            <CancelIcon
                                                style={{ fill: "floralwhite" }}
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                    </List>
                </Card>
            }
        </div>
    );
};
