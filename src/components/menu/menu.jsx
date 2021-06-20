import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  list: {
    backgroundColor: '#212121',
    color: 'white',
    width: 200,
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

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    teste: ["/about","B","C"]
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Consultar', 'Inserir', 'Excluir'].map((text, index) => (
        <ListItem className={classes.customListItem} button component={Link} to={state.teste[index]} key={text}>
          <ListItemText primary={text} />
        </ListItem>
        ))}
      </List>
      <Divider className={classes.customDivider} />
      <List>
        {['Login'].map((text, index) => (
          <ListItem className={classes.customListItem} button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

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
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </Router>
  );
}
