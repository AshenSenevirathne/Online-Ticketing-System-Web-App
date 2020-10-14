import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {deepPurple} from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import {deleteRoute} from "../../Store/Actions/RouteActions";
import {connect} from "react-redux";
import ConfirmDialog from "../Shared/ConfirmDialog";
import RouteDialog from "../Shared/RouteDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        margin: "20px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    avatar: {
        backgroundColor: deepPurple[500],
        color: '#fff'
    },
}));

function RouteSmallView(props) {
    const classes = useStyles();
    const confirmDialogRef = useRef();
    const routeDialogRef = useRef();
    const [expanded, setExpanded] = React.useState(false);

    const route = props.route;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const deleteRoute = () => {
        props.deleteRoute(route.id, res => {
            if (res.status) {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Route Deleted Successfully!'
                })
            } else {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Something Went Wrong.Please Delete Route Again!'
                })
            }
        })
    }


    return (
        <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
            <ConfirmDialog ref={confirmDialogRef} deleteRoute={deleteRoute}/>
            <RouteDialog ref={routeDialogRef}/>
            <Card className={classes.root + " hoverable"}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            RR
                        </Avatar>
                    }
                    title={route.routeNumber}
                    subheader={`${route.start} - ${route.end}`}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        style={{color: "green"}}
                        onClick={() => {
                            routeDialogRef.current.handleClickOpenForEdit(route)
                        }}
                    >
                        <CreateIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            confirmDialogRef.current.handleClickOpen(
                                "Do you need to delete the Route?",
                                `By confirming this, You give permission to delete Route.Note that this process can not be revert!`,
                                "deleteRoute"
                            );
                        }}
                        aria-label="share" color={"secondary"}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                            again without stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        email: state.firebase.auth.email
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
        deleteRoute: (id, callback) => dispatch(deleteRoute(id, callback)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(RouteSmallView)
