import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addOwner, getShopNotRented } from '../Service/OwnerService';
import { OwnerModel } from './OwnerModel';
import Validation from './Validation';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const shop = [];


const OwnerInput = () => {
  const [owner, setOwner] = React.useState(OwnerModel)
  const [shop, setShop] = React.useState([0])
  const [save, setSave] = React.useState(false);
  const [errors, setErrors] = React.useState({})

  const onValueChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  }

  const addOwnerDetails = async () => {
    if (owner.ownerName !== "" && owner.mobileNo !== "" && owner.address !== "" && owner.shopId !== 0) {
      await addOwner(owner);
      setSave(true);
    }
    setErrors(Validation(owner));
  }

  // close save
  const closeSave = () => {
    setSave(false);
    window.location.reload();
  }

  React.useEffect(() => {
    getShopList();
  }, []);

  const getShopList = async () => {
    let response = await getShopNotRented();
    setShop(response.data)
    console.log(response.data);

  }
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
    <>
      <form>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >

          <TextField
            required
            fullWidth
            autoFocus
            name='ownerName'
            label="Tenants Name"
            id="outlined-size-small"
            size="small"
            onChange={(e) => onValueChange(e)}
            value={owner.ownerName}
            error={errors.ownerName}
          />
          <TextField
            required
            name='mobileNo'
            type='number'
            label="Moble number"
            id="outlined-size-small"
            size="small"
            onChange={(e) => onValueChange(e)}
            value={owner.mobileNo}
            error={errors.mobileNo}
          />
          <TextField
            required
            name='address'
            label="Address"
            id="outlined-size-small"
            size="small"
            onChange={(e) => onValueChange(e)}
            value={owner.address}
            error={errors.address}
          />
          <TextField
            required
            type='date'
            name='year'
            id="outlined-size-small"
            size="small"
            // label={"Select Year"}
            openTo="year" views={["year"]}
            onChange={(e) => onValueChange(e)}
            value={owner.year}
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker label={"Select Year"} openTo="year" views={["year"]} />
            </DemoContainer>
          </LocalizationProvider> */}
          <TextField
            required
            name='date'
            type='date'
            id="outlined-size-small"
            size="small"
            onChange={(e) => onValueChange(e)}
            value={owner.date}
            error={errors.date}
          />

          <FormControl sx={{ width: "220px", marginLeft: "10px" }}>
            <InputLabel id="demo-simple-select-label">Select Shop</InputLabel>
            <Select
              style={{ width: '199px', height: '40px', marginTop: '8px' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Position"
              name='shopId'
              onChange={(e) => onValueChange(e)}
              MenuProps={MenuProps}
              error={errors.shopId}
            >
              {shop.map(item => {
                return (
                  <MenuItem value={item.id}>{item.shopName}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <div style={{ marginTop: "10px" }} >
            <Button onClick={() => addOwnerDetails()} style={{ marginRight: "30px" }}>Save</Button>
            <Button onClick={closeSave}>Cancel</Button>
          </div>
          <Dialog open={save}>
            <DialogTitle>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Owner Registered — <strong>check it out!</strong>
              </Alert>

            </DialogTitle>
            <DialogActions>
              <Button onClick={closeSave}>Okay</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </form>
    </>
  );
}
export default OwnerInput;