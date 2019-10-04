import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ReactDOM from 'react-dom';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import ItemList from './components/ItemList';
import firebase from 'firebase/app';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

const firebaseConfig = {
  apiKey: "AIzaSyCy-AHsFAjOKvoBN3gw8htGE0Ohe0daLaQ",
  authDomain: "leevi-shopping-cart-34e65.firebaseapp.com",
  databaseURL: "https://leevi-shopping-cart-34e65.firebaseio.com",
  projectId: "leevi-shopping-cart-34e65",
  storageBucket: "leevi-shopping-cart-34e65.appspot.com",
  messagingSenderId: "1047218202000",
  appID: "1:1047218202000:web:be75e96c1b2b539640bf15",
};



firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const useSelection = () => {
  const [selected, setSelected] = useState([]);
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
  const [inventoryData, setInventoryData] = useState({});
  const [selected, addToCart] = useSelection();
  const [state, setState] = useState({right: false});
  
  const classes = useStyles();
  const products = Object.values(data);
  const inventory = Object.values(inventoryData);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      const handleData = snap => {
        if(snap.val()) {
          Object.keys(json).forEach(element => {
            Object.assign(json[element], snap.val()[element]);
          });
          setData(json);
        }
      };
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData)}; 
    };
    fetchProducts();
  }, []);



  return (

    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
          <div className={classes.root}>
            <div className={classes.Child}>
              <PrimarySearchAppBar products={products} stateOfSelection={{selected, addToCart}} state={state} setState={setState} inventory={inventory}/>
            </div>
            <br/>

            <div className={classes.Child}>
            <ItemList products={products} stateOfSelection={{selected, addToCart}} state={state} setState={setState} inventory={inventory}/>
            </div>
          </div>
        </Container>
    </React.Fragment>
  );
};

export default App;
