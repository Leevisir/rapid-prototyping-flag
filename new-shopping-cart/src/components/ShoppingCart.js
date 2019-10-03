import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { bottom } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ShoppingCart({products, stateOfSelection}) {
  const classes = useStyles();
  const [state, setState] = useState({right: false});

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => {
    let tmp = [...new Set(stateOfSelection.selected)];
    let allPrices = stateOfSelection.selected.map(product => product.price)
    return (
    <div className={classes.root}>
    <List>
    <ListItem divider alignitems='center' style={{width:400}}>
      <CardHeader title='Cart'>
      </CardHeader>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
      <Divider/>
    </ListItem>
      {
        tmp.map(product => (
        <ListItem key={product.sku} style={{width: 400}}>
        <Paper className={classes.paper} key={product.sku} bottom='bottom' style={{width: "100%"}}>
          <Grid container spacing={2} position='bottom'>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img src={"data/products/" + product.sku + "_2.jpg"}/>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">

                    Quantity: {stateOfSelection.selected.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map()).get(product)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Remove
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {product.currencyFormat+product.price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        </ListItem>
      ))
    }
    <ListItem style={{position: 'relative', bottom: 0,width: "100%", minHeight: "100vh"}}>
    <Grid item xs={12} style={{position: 'relative', bottom: 0,width: "100%"}}>
      <Paper className={classes.paper} style={{position: 'absolute', bottom: 0, width: "100%"}}>
        <Typography variant="h4" align='center'>
          total: ${allPrices.reduce((a,b) => a + b, 0).toFixed(2)}
        </Typography>
        <Button variant="outlined" color="inherit" className={classes.button} style={{width: "100%"}}>
          <Typography variant="h4">
            Checkout
          </Typography>
        </Button>
      </Paper>

    </Grid>

    </ListItem>
    </List>
    </div>
  );
};

  return (
    <div>
      <Button onClick={toggleDrawer('right', true)}>Cart</Button>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}

export { Drawer };


// <List>
//   {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//     <ListItem button key={text}>
//       <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//       <ListItemText primary={text} />
//     </ListItem>
//   ))}
// </List>
// <Divider />
// <List>
//   {['All mail', 'Trash', 'Spam'].map((text, index) => (
//     <ListItem button key={text}>
//       <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//       <ListItemText primary={text} />
//     </ListItem>
//   ))}
// </List>


// <div
//   className={classes.list}
//   role="presentation"
//   // onClick={toggleDrawer(side, false)}
//   // onKeyDown={toggleDrawer(side, false)}
// >
// <List>
//   <ListItem divider alignItems="center">
//     <CardHeader title='Cart'>
//     </CardHeader>
//     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
//   </ListItem>
//   {
//     tmp.map(product => (
//     <ListItem button key={product.sku}>
//       <img src={"data/products/" + product.sku + "_2.jpg"}/>
//       <ListItemText primary={product.title} />
//       <ListItemText primary={product.currencyFormat+product.price} />
//       <Divider/>
//       <ListItemText primary={stateOfSelection.selected.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map()).get(product)} />
//     </ListItem>
//   ))
// }
// </List>
// </div>
