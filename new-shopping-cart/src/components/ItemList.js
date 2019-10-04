import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ReactDOM from 'react-dom';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ThemeProvider } from '@material-ui/styles';
import { green, purple } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    width: 200,
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);



const buttonColor = selected => (
  selected ? 'secondary' : 'primary'
);
const buttonText = (selected, product, selectedList) => {
  if (product.S < 1 && product.M <1 && product.L < 1 && product.XL < 1) {
    return 'Out of stock'
  }
  return selected ? 'Added'+' '+selectedList.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map()).get(product) : 'Add to Cart'
};
const sizeButtonColor = (selectedSize, product, size) => {
  if(Object.keys(selectedSize).includes(String(product.sku)) && selectedSize[product.sku]===String(size)) 
    return 'primary';
  else 
    return 'default';
}

const Product = ({ product, state, classes, inventoryOne, selectedSize, setSelectedSize }) => (
  <Grid item xs={12} sm={6} md={4} lg={4} key={product.sku}>
    <Paper className={classes.paper} key={product.sku}>
      <img src={"data/products/" + product.sku + "_1.jpg"}/>
      <br/>
      {product.title}
      <br/>
      {product.description + "\n"}
      <br/>
      {product.currencyFormat + product.price}
      <br/>
      <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
        <Button 
          disabled={product.S <= 0} 
          onClick={() => { setSelectedSize({[product.sku]:'S'})}} 
          color={ sizeButtonColor(selectedSize, product, 'S') } 
        >S</Button>
        <Button 
          disabled={product.M <= 0} 
          onClick={() => { setSelectedSize({[product.sku]:'M'})}}
          color={ sizeButtonColor(selectedSize, product, 'M') }
        >M</Button>
        <Button 
          disabled={product.L <= 0} 
          onClick={() => { setSelectedSize({[product.sku]:'L'})}}
          color={ sizeButtonColor(selectedSize, product, 'L') }
        >L</Button>
        <Button 
          disabled={product.XL <= 0} 
          onClick={() => { setSelectedSize({[product.sku]:'XL'})}}
          color={ sizeButtonColor(selectedSize, product, 'XL') }
        >XL</Button>
      </ButtonGroup>
      <br/>
      <Button
        style={{width: "100%"}}
        variant="contained"
        color={ buttonColor(state.selected.includes(product)) }
        disabled={!Object.keys(selectedSize).includes(String(product.sku)) || (product.S < 1 && product.M <1 && product.L < 1 && product.XL < 1)}
        onClick={ () => { 
          if (!Object.keys(product).includes('addedSize')) Object.assign(product, {'addedSize': []})
          if (!Object.keys(selectedSize).includes(String(product.sku))) 
            { alert("Please select a size :)"); setSelectedSize({}); }
          else
            product['addedSize'].push(selectedSize[product.sku]); 
          state.addToCart(product);
          setSelectedSize({});
          product[selectedSize[product.sku]] = product[selectedSize[product.sku]] - 1;
          console.log(product);
          state.setState({ ...state.state, ['right']: true })}}
        >
        { buttonText(state.selected.includes(product), product, state.selected) }
      </Button>
    </Paper>
  </Grid>
);

export default function ItemList({ products, stateOfSelection, state, setState, inventory }) {
  const [selectedSize, setSelectedSize] = useState({});
  const classes = useStyles();
  // const [listOfItemsInCart, setlistOfItemsInCart] = useState(null);
  // const inCartItems = items.filter(item => term === getCourseTerm(course));
  return (
    <Grid container spacing={3}>
      {products.map(product =>
        <Product
          key={product.sku}
          product={product}
          classes={classes}
          state={ { selected:stateOfSelection.selected, addToCart:stateOfSelection.addToCart, state:state, setState:setState } }
          inventoryOne={inventory[product.sku]}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      )}
    </Grid>
  );
}


// <Grid item xs={12} sm={6} md={4} lg={4} key={product.sku}>
//   <Paper className={classes.paper} key={product.sku}>
//     {product.title}
//     <br/>
//     <img src={"data/products/" + product.sku + "_2.jpg"}/>
//     <br/>
//     {product.description + "\n"}
//     <br/>
//     {product.currencyFormat + product.price}
//     <br/>
//     <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
//       <Button>S</Button>
//       <Button>M</Button>
//       <Button>L</Button>
//       <Button>XL</Button>
//     </ButtonGroup>
//     <br/>
//     <ColorButton variant="contained" color="primary">
//       Add to cart
//     </ColorButton>
//   </Paper>
// </Grid>
