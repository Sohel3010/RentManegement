import * as React from "react";
import { useState, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getListOwners } from "./../Service/OwnerService";
import dayjs from "dayjs";
import { shopByOwnerId } from "./../Service/RentService";

const useStyles = makeStyles((theme) => ({
  datePickerInput: {
    width: "80%",
  }
}));
export default function SearchInput({ searchData }) {
  const [selectedYear, setSelectedYear] = useState(dayjs(new Date()));
  const [searchShopOwner, setSearchShopOwner] = useState([]);
  const [seclectedShopOwner, setSeclectedShopOwner] = useState("");
  const [searchSelectShop, setSearchSelectShop] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [receitNumber, setReceitNumber] = useState("123");
  const [receitDate, setReceitDate] = useState(dayjs(new Date()));



  const classes = useStyles();
  //owner api call
  useEffect(() => {
    getOwnerList();
  }, []);
  const getOwnerList = async () => {
    let response = await getListOwners();
    setSearchShopOwner(response.data.data);
  };

  //shop api
  const getShopByOwnerId = async (id) => {
    let response = await shopByOwnerId(id);
    setSearchSelectShop(response.data.data.shopownerSlave);
  };
  const handelOwnerChange = (event) => {
    setSeclectedShopOwner(event.target.value);
    const id = event.target.value;
    getShopByOwnerId(id);
  };
  const handleShopChange = (e) => {
    const newShopId = e.target.value;
    setSelectedShop(newShopId);
  };
  const handleYearChange = (newValue) => {
  setSelectedYear(newValue);
  };
  const searchOnClick = () => {
    const ShopName = searchSelectShop.find((item) => item.id === selectedShop)
      ?.shop?.shopName;
    const ShopOwnerName = searchShopOwner.find(
      (item) => item.id === seclectedShopOwner
    )?.ownerName;

    const Year = selectedYear.year().toString();
    const searchedReceitDate = receitDate.format().toString();
    let searchObject = {
      shopownerName: ShopOwnerName,
      shopName: ShopName,
      year: Year,
      receiptDate:searchedReceitDate,
    };
    searchData(searchObject);
  };

  return (
    <>
      <Stack className="custem-search">
        <TextField
          className="custom-date"
          variant="outlined"
          label="Recete Number"
          disabled
          required
          sx={{ mb: 4 }}
          value={receitNumber}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Receit Date"
                      // value={receitDate}
                      onChange={(newValue) => {
                        setReceitDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidt
                          required
                          // className={classes.datePickerInput}
                        />
                      )}
                    />
                  </LocalizationProvider>
        <FormControl>
          <InputLabel>Shop Owner</InputLabel>
          <Select
            className="custom-date"
            label="Shop Owner"
            onChange={handelOwnerChange}
            name="ownerName"
          >
            {searchShopOwner.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item?.ownerName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Select Shop</InputLabel>
          <Select
            className="custom-date"
            label="Select Shop"
            value={selectedShop}
            onChange={handleShopChange}
            name="shopId"
          >
            {searchSelectShop.map((item) => {
              return (
                <MenuItem key={item.id} value={item?.id}>
                  {item?.shop?.shopName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className="custom-date custom-year">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label={"Year"}
                views={["year"]}
                // value={year}
                onChange={handleYearChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          style={{
            padding: "0px 30px",
          }}
          onClick={searchOnClick}
        >
          Search
        </Button>
      </Stack>
    </>
  );
}
