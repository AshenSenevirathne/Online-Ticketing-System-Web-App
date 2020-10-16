import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {deepPurple} from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import {deleteRoute} from "../../Store/Actions/RouteActions";
import {connect} from "react-redux";
import ConfirmDialog from "../Shared/ConfirmDialog";
import RouteDialog from "../Shared/RouteDialog";
import Chip from '@material-ui/core/Chip';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import TimelineIcon from '@material-ui/icons/Timeline';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import {deleteBus} from "../../Store/Actions/BusActions";
import BusesDialog from "../Shared/BusesDialog";

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

function BusSmallView(props) {
    const classes = useStyles();
    const confirmDialogRef = useRef();
    const updateBusesDialogRef = useRef();
    const bus = props.bus;
    const routes = props.routes;


    const deleteBus = () => {
        props.deleteBus(bus.id, res => {
            if (res.status) {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Bus Deleted Successfully!'
                })
            } else {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Something Went Wrong.Please Delete Bus Again!'
                })
            }
        })
    }


    return (
        <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
            <ConfirmDialog ref={confirmDialogRef} deleteBus={deleteBus}/>
            <BusesDialog ref={updateBusesDialogRef} bus={bus}/>
            <Card className={classes.root + " hoverable"}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography align={"center"} variant={"h5"}>{bus.busNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`Route Number - ${bus.routeNumber}`}
                                  color={"primary"}
                                  icon={<TimelineIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`Condition - ${bus.type}`}
                                  color={"primary"}
                                  icon={<AssignmentLateIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  color={"primary"}
                                  label={`Sheets - ${bus.sheets}`}
                                  icon={<AirlineSeatReclineNormalIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip color={"primary"} variant="outlined" size={"small"}
                                  label={`Pass Code - ${bus.passcode}`}
                                  icon={<DeveloperModeIcon/>}/>
                        </Grid><Grid item xs={12}>
                            <Chip
                                color={"primary"}
                                variant="outlined" size={"small"}
                                  label={`Driver - ${bus.driver}`}
                                  icon={<AccountBoxIcon/>}/>
                        </Grid>
                    </Grid>
                    <hr/>
                </CardContent>
                <CardActions disableSpacing style={{marginTop : "-30px"}}>
                    <IconButton
                        aria-label="add to favorites"
                        style={{color: "green", marginLeft : "auto"}}
                        onClick={() => {
                            updateBusesDialogRef.current.handleClickOpenForEdit(bus, routes)
                        }}
                    >
                        <CreateIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            confirmDialogRef.current.handleClickOpen(
                                `Do you need to delete the Bus : ${bus.busNumber}?`,
                                `By confirming this, You give permission to delete Bus.Note that this process can not be revert!`,
                                "deleteBus"
                            );
                        }}
                        aria-label="share" color={"secondary"}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>

            </Card>
        </Grid>
    );
}



const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
        deleteBus: (id, callback) => dispatch(deleteBus(id, callback)),
    }
};

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(BusSmallView)
