import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, Grid  } from '@material-ui/core';
import Success from '../../organisms/Success';
import green from '@material-ui/core/colors/green';
import AttendanceDataPanel from './AttendanceDataPanel';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  checked: {},
  checkboxRoot: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: '700'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#f9f9f9'
  }
}));

const CellPanels = (props) => {
  const { cellList } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = ({index}) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <div className={classes.root}>
      {cellList.map((cell, index)=>{
        return(
          <ExpansionPanel  TransitionProps={{ unmountOnExit: true }} expanded={expanded === index} 
            onChange={handleChange({ index })} key={`cell_${index}`}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography className={classes.heading}>{`${cell.name}셀`}</Typography>
                    </Grid>
                    <Grid item> 
                      <Divider orientation="vertical" variant="middle" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {(cell.members.length !== 0) ?(
                  <Success>
                    <Check />
                  </Success>
                  ):
                  (
                    <span role='img' aria-label="X">❌</span>
                  )
                  }
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AttendanceDataPanel members={cell.members}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </div>
  );
}

export default CellPanels;