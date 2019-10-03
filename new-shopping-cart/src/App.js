import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ReactDOM from 'react-dom';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import ItemList from './components/ItemList';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const [addedTimes, setAddedTimes] = useState(0);
  const addToCart = (x, add = true) => {
    if (add) {
      setSelected([x].concat(selected));
    } else {
      selected.splice(selected.indexOf(x), 1);
      setSelected(selected);
    }
    // setSelected(selected.includes(x) ? selected : [x].concat(selected));
    // setAddedTimes(addedTimes+1);
  };
  return [ selected, addToCart ];
};

const App = () => {
  const [data, setData] = useState({});
  const [selected, addToCart] = useSelection();
  const [state, setState] = useState({right: false});
  const classes = useStyles();
  const products = Object.values(data);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (

    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
          <div className={classes.root}>
            <div className={classes.Child}>
              <PrimarySearchAppBar products={products} stateOfSelection={{selected, addToCart}} state={state} setState={setState}/>
            </div>
            <br/>

            <div className={classes.Child}>
            <ItemList products={products} stateOfSelection={{selected, addToCart}} state={state} setState={setState}/>
            </div>
          </div>
        </Container>
    </React.Fragment>
  );
};

export default App;
