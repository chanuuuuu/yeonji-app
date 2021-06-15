import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Grid, AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { CallMerge, AssignmentInd } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  item : {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  bar: {
    flexGrow: 1,
  },
  contents: {
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightLink: {
    color: theme.palette.common.blue,
    marginLeft: 0,
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 0,
    fontFamily: 'Noto Sans KR',
  },
   buttonIcon: {
    marginRight: 5,
  },
}));


const CustomAppBar = (props) => {
  const classes = useStyles();
  const { isLogin, logout, loading, office } = props;

  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  // 모바일 메뉴버튼 오픈 state
  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  // 모바일 메뉴버튼 오픈 닫는 핸들링 함수
  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  // 모바일 메뉴 컴포넌트
  const MobileMenu = (
    <Menu
      anchorEl={mobileAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      getContentAnchorEl={null}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className={classes.item}>
        <Button
          className={classes.rightLink}
          component={Link}
          to="/request"
        >
          <CallMerge className={classes.buttonIcon} />
          기도제목
        </Button>
      </MenuItem>
      <MenuItem className={classes.item}>
        {(office === null || office === 2) ? (
           <Button
           className={classes.rightLink}
           component={Link}
           to="/admin"
         >
           <AssignmentInd className={classes.buttonIcon} />
           출석현황
         </Button>
        ):
        (
          <Button
            className={classes.rightLink}
            component={Link}
            to="/attendance"
          >
            <AssignmentInd className={classes.buttonIcon} />
            출석부
          </Button>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" className={classes.bar}>
      <Toolbar>
      {(!loading)&&
        (
        (isLogin) ?
        (
        <Grid container direction="row" justify="space-evenly" className={classes.contents}>
          <Grid item xs={9}>
            <IconButton edge="start" className={classes.menuButton} onClick={handleMobileMenuOpen} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <Button color="inherit" onClick={logout}>LOGOUT</Button>
          </Grid>
        </Grid>
        )
        :
        (
        <Grid container direction="row" justify="center" className={classes.contents}>
          <Grid item xs={9}>
            <div className={classes.header}>
              <Typography style={{ fontSize: 15, fontWeight: 700 }}>연지 <span role="img" aria-label="church" style={{fontSize :25}}>⛪️</span> 출석부</Typography>
            </div>
          </Grid>
        </Grid>
        )
        )
      }
      </Toolbar>
      {MobileMenu}
    </AppBar>
  );
}

export default CustomAppBar;