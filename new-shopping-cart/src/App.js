import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const classes = useStyles();
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
        <Container maxWidth="md">
          <div className={classes.root}>
            <Grid container spacing={3}>
              {products.map(product =>
                <Grid item xs={12} sm={6} md={4} lg={4} key={product.sku}>
                  <Paper className={classes.paper} key={product.sku}>
                    {product.title}
                    <br/>
                    <img src={"data/products/" + product.sku + "_2.jpg"}/>
                    <br/>
                    {product.description + "\n"}
                    <br/>
                    {product.currencyFormat + product.price}
                    <br/>
                    <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
                      <Button>S</Button>
                      <Button>M</Button>
                      <Button>L</Button>
                      <Button>XL</Button>
                    </ButtonGroup>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </div>
        </Container>
    </React.Fragment>
  );
};

export default App;
