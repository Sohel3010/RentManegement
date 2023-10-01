import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addRent, updateRent } from "../Service/RentService";
import { RentModel } from "./RentModel";
import { getListOwners } from "../Service/OwnerService";
import { getShopByID, updateShop } from "../Service/ShopService";

const shop = [];
const rent = [];

const RentInput = () => {
  const [rent, setRent] = React.useState(RentModel);
  const [shop, setShop] = React.useState([0]);
  const [save, setSave] = React.useState(false);
  const [actualamount, setValueOfRent] = React.useState(0);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setRent({ ...rent, [name]: value });
  };

  const addRentDetails = async () => {
    let response = await addRent(rent);
    console.log(response);
    setSave(true);
  };

  // close save
  const closeSave = () => {
    setSave(true);
    window.location.reload();
  };

  React.useEffect(() => {
    getRentList();
  }, []);

  const getRentList = async () => {
    let response = await getListOwners();
    if(response !="" && response!=null){
      setShop(response.data);
    }
  };

  const getShopById = async (shopid, ownerid) => {
    //setRent({ [rent?.shopOwner?.id]: ownerid });
    let response = await getShopByID(shopid);
    setValueOfRent(response.data.rent);
  };

  // const [selectedYear, setSelectedYear] = React.useState(null);

  // const handleYearChange = (year) => {
  //   setSelectedYear(year);
  //   console.log(year);
  //   // You can perform any other actions you need with the selected year here
  // };

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ width: "220px", marginLeft: "10px" }}>
        <InputLabel id="demo-simple-select-label">Shop Owner</InputLabel>
        <Select
          style={{ width: "199px", height: "40px", marginTop: "8px" }}
          labelId="demo-simple-select-label"
          // id="demo-simple-select"
          label="Shop Owner"
          name="ownerName"
          MenuProps={MenuProps}
          // onChange={(e) =>getShopById()}
        >
          {shop.map((item) => {
            return (
              <MenuItem
                key={item?.id}
                value={item?.id}
                onClick={() => getShopById(item?.shop?.id, item.id)}
              >
                {item.ownerName}({item.shop?.shopName})
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <TextField
        required
        name="amount"
        label="Actual Rent"
        type="number"
        id="outlined-size-small"
        size="small"
        disabled
        onChange={(e) => onValueChange(e)}
        value={actualamount}
      />

<FormControl sx={{ width: "220px", marginLeft: "10px" }}>
	  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label={'"year"'} openTo="year" views={['year']} />
        
      </DemoContainer>
    </LocalizationProvider>
	 </FormControl> 
      <TextField
        required
        name="paid"
        label="Paid"
        type="number"
        // id="outlined-size-small"
        size="small"
        onChange={(e) => onValueChange(e)}
        value={rent.paid}
      />

      <FormControl sx={{ width: "220px", marginLeft: "22px" }}>
        <InputLabel id="demo-simple-select-label">User Name</InputLabel>
        <Select
          style={{ width: "199px", height: "40px", marginTop: "8px" }}
          labelId="demo-simple-select-label"
          // id="demo-simple-select"
          label="User Name"
          name="userName"
          MenuProps={MenuProps}
          onChange={(e) => onValueChange(e)}
        >
          {shop.map((item) => {
            return (
              <MenuItem key={item.id} value={item?.id}>
                {item.user?.userName} {item.id?.user?.userName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "220px", marginLeft: "10px" }}>
        <InputLabel id="demo-simple-select-label">Rent Type</InputLabel>
        <Select
          style={{ width: "199px", height: "40px", marginTop: "8px" }}
          labelId="demo-simple-select-label"
          // id="demo-simple-select"
          label="Rent Type"
          name="paymentType"
          onChange={(e) => onValueChange(e)}
        >
          <MenuItem value="R">Rent</MenuItem>
          <MenuItem value="D">Deposit</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={() => addRentDetails()}>Save</Button>

      <Dialog open={save}>
        <DialogTitle>
          <Alert severity="success">
            <AlertTitle>Successfully Added</AlertTitle>
            Rent Details — <strong>check it out!</strong>
          </Alert>
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeSave}>Okay</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default RentInput;
