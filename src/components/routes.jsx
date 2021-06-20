import React from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Search from './searchCrud/search'
import Insert from './insertCrud/insert'
import Delete from './deleteCrud/delete'

const useStyles = makeStyles({
  list: {
    backgroundColor: '#212121',
    color: 'white',
    width: 150,
  },
  fullList: {
    width: 'auto',
  },
  customDivider: {
    backgroundColor: '#249de4',
  },
  customButton: {
    backgroundColor: 'inherit',
  },
  customListItem: {
    backgroundColor: '#212121',
    color: 'white',
    '&:hover': {
        backgroundColor: '#0d3c58',
    },
  },
});

export default function LinkRouter() {

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Router>

      <div className={classes.customButton}>
        {['Menu'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button variant="contained" color="primary" onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <div className={classes.list}>
                <List>
                  <ListItem className={classes.customListItem} component={RouterLink} to="/search">
                    <ListItemText primary="Consultar" />
                  </ListItem>
                  
                  <ListItem className={classes.customListItem} component={RouterLink} to="/insert">
                    <ListItemText primary="Inserir" />
                  </ListItem>

                  <ListItem className={classes.customListItem} component={RouterLink} to="/delete">
                    <ListItemText primary="Excluir" />
                  </ListItem>

                  <Divider className={classes.customDivider} />

                  <ListItem className={classes.customListItem} component={RouterLink} to="/login">
                    <ListItemText primary="Login" />
                  </ListItem>
                </List>
              </div>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>

      <div>
        <Route path="/search" exact>
          <Search></Search>
        </Route>

        <Route path="/insert">
          <Insert></Insert>
        </Route>

        <Route path="/delete">
          <Delete></Delete>
        </Route>

      </div>
    </Router>
  );
}