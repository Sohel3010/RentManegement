import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';


export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [rentOpen, setRentOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const rentClick = () => {
    setRentOpen(!rentOpen);
  };

  return (
    <>
      <Link to={"/"}>
        <ListItemButton style={{ color: "white" }}>
          <ListItemIcon>
            <CurrencyRupeeIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Rent" />
        </ListItemButton>
      </Link>
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"

      >
        <ListItemButton onClick={handleClick} >
          <ListItemIcon >
            <AccountCircleIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={"/shop"}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon style={{ color: "white" }}>
                  <AddBusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Shop" style={{ color: "white" }} />
              </ListItemButton>
            </Link>
            <Link to={"/shopRent"}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon style={{ color: "white" }}>
                <CurrencyRupeeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="ShopRent" style={{ color: "white" }} />
              </ListItemButton>
            </Link>
            <Link to={"/owner"} >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon style={{ color: "white" }}>
                  <EngineeringIcon />
                </ListItemIcon>
                <ListItemText primary="Tenant" style={{ color: "white" }} />
              </ListItemButton>
            </Link>
            <Link to={"/admin"}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AccountCircleIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="User" style={{ color: "white" }} />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>

      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"

      >
        <ListItemButton onClick={rentClick}>
          <ListItemIcon>
            <CurrencyRupeeIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Rent Report" />
          {rentOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={rentOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DateRangeIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Yearly" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddBusinessIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Shopwise" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AccountCircleIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Tenantwise" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CategoryIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Categorywise" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

    </>
  );
}