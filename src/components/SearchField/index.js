// Material-UI Components
import { makeStyles, Grid, TextField } from '@material-ui/core';
// Material-UI Icons
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
    inputField: {
        width: '100%',
    },
    input: {
        color: 'floralwhite',
        "&.focused": {
            color: 'floralwhite'
        },
    },
    searchForm: {
        marginBottom: '1rem',
        color: "floralwhite"
    },
}));


export default function SearchField(props) {
    const classes = useStyles();

    return (
        <div>
            <form
                onSubmit={props.handleSearchMovie}
                className={classes.searchForm}
            >
                <Grid container alignItems="flex-end">
                    <Grid item style={{ marginLeft: '1rem' }}>
                        <SearchIcon />
                    </Grid>
                    <Grid xs={10}>
                        <TextField
                            label="Search"
                            className={classes.inputField}
                            onChange={props.handleSearchInput}
                            InputProps={{
                                className: classes.input
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.input,
                                    focused: "focused",
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
