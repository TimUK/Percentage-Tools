import React,{ Component } from 'react';
import './App.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minWidth:"40vw"

  },
  formControl:{
    marginLeft:"5vw"
  }
});
 

class App extends Component{
  
  state={
    initialNumber:0,
    operationtype:"reduce",
    newamount:"",
    operationvalue:0
  }

  constructor(props){
    super(props);
    this.props=props;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  calculateReduction= event => {
    this.setState({[event.target.name]:event.target.value},()=>{
      let newprice=0;
      if(this.state.operationtype==="reduce"){
        newprice = parseFloat(parseFloat(this.state.initialNumber) - (parseFloat(this.state.initialNumber)*(parseFloat(this.state.operationvalue)/100))).toFixed(2);
      }else{
        newprice = parseFloat(parseFloat(this.state.initialNumber) + (parseFloat(this.state.initialNumber)*(parseFloat(this.state.operationvalue)/100))).toFixed(2);
      }
      
      if(!isNaN(newprice)){
        this.setState({newamount:newprice});
      }else{
        this.setState({newamount:this.state.initialNumber});
      }
    });
    
  };

  render(props) {
    const { classes } = this.props;
    return (
      <div className="App">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh', }}
        >
        <Grid item xs={12}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">
                Percentage Tools
            </Typography>
            <TextField
              name="initialNumber"
              label="Initial Number"
              className={styles.textField}
              value={this.state.initialNumber}
              onChange={this.calculateReduction}
              margin="normal"
            />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Operation</FormLabel>
                <RadioGroup
                  aria-label="Operation"
                  name="operationtype"
                  className={classes.group}
                  value={this.state.operationtype}
                  onChange={this.calculateReduction}
                >
                  <FormControlLabel value="reduce" control={<Radio />} label="Reduce Amount" />
                  <FormControlLabel value="increase" control={<Radio />} label="Increase Amount" />          
              </RadioGroup>
            </FormControl>

            <TextField
              name="operationvalue"
              label="Operation Amount"
              style={{display:"block"}}
              className={styles.textField}
              value={this.state.operationvalue}
              onChange={this.calculateReduction}
              margin="normal"
            />

            <TextField
              name="newamount"
              label="New Amount"
              style={{display:"block"}}
              className={styles.textField}
              value={this.state.newamount}
              onChange={this.handleChange}
              margin="normal"
              
            />
          </Paper>
        </Grid>
      </Grid>
      </div>
    );
  }

  
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
