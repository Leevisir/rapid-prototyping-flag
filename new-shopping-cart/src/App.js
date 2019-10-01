import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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
        <Container maxWidth="sm">
          <div className={classes.root}>
            <Grid container spacing={3}>
              {products.map(product =>
                <Grid item xs={6} sm={3} key={product.sku}>
                  <Paper className={classes.paper} key={product.sku}>{product.title}</Paper>
                </Grid>
              )}
            </Grid>
          </div>
        </Container>
    </React.Fragment>
  );
};

export default App;
