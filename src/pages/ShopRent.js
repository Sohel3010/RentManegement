import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getListOwners } from "./../Service/OwnerService";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  datePickerInput: {
    width: "100%",
  },
}));

function ShopRent() {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  const [receitNumber, setReceitNumber] = useState("123");
  const [receitDate, setReceitDate] = useState(dayjs(new Date()));
  const [shopOwner, setShopOwner] = useState([]);
  const [shopOwnerId, setShopOwnerId] = useState("");
  const [selectShop, setSelectShop] = useState("");
  const [rentType, setRentType] = useState("");
  const [year, setYear] = useState(dayjs(new Date()));
  const [totalRent, setTotalRent] = useState("");
  const [totalPaid, setTotalPaid] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("")
  const [payingAmount, setPayingAmount] = useState("")
  const [list, setList] = useState([])

  React.useEffect(() => {
    getOwnerList();
  }, []);

  const getOwnerList = async () => {
    let response = await getListOwners();
    setShopOwner(response.data);
    console.log(response.data);
  };


  React.useEffect(() => {
    const rentAmount = parseFloat(totalRent);
    const paidAmount = parseFloat(totalPaid);

    // Calculate the remaining amount
    const remaining = rentAmount - paidAmount;

    setRemainingAmount(isNaN(remaining) ? '' : remaining.toFixed(2));
  }, [totalRent, totalPaid]);

  const AmountSubmitHandle = (e) =>{
    e.preventDefault();
    const newItem = {
      id: 0,
      itemId: uuidv4(),
      receitNumber, 
      totalRent,   
      totalPaid, 
      remainingAmount
    }
    setTotalRent("");
    setTotalPaid("");
    setRemainingAmount("");
    setList([...list,newItem])
  }
  console.log("list array",list)

  // const handleEventChange = (event) => {
  //   const selectedShopOwnerId = event.target.value;
  //   setShopOwnerId(selectedShopOwnerId);
  // };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ height: "10px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{ position: "sticky", top: 0, backgroundColor: "white" }}
              >
                <Tab label="Rent Form" value="1" />
                <Tab label="Rent Records" value="2" />
              </TabList>
            </Box>
          </Box>
          <TabPanel value="1">
            <>
              <form className="custem-form">
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    variant="outlined"
                    label="Recete Number"
                    // fullWidth
                    disabled
                    required
                    sx={{ mb: 4 }}
                    value={receitNumber}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Receit Date"
                      value={receitDate}
                      onChange={(newValue) => {
                        setReceitDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidt
                          required
                          className={classes.datePickerInput}
                        />
                      )}
                    />
                  </LocalizationProvider>

                  <FormControl>
                    <InputLabel>Shop Owner</InputLabel>
                    <Select
                      className="custom-date"
                      label="Shop Owner"
                      value={shopOwnerId}
                      onChange={(e) => {
                        setShopOwnerId(e.target.value);
                      }}
                      name="ownerName"
                    >
                      {shopOwner.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item?.ownerName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>
                {/* <Button
                  variant="outlined"
                  type="submit"
                  style={{
                    marginBottom: "20px",
                    alignItems: "end",
                    padding: "10px 20px",
                  }}
                  //   onClick={handleSubmit}
                >
                  Submit
                </Button> */}

                <hr />
                <Stack spacing={2} direction="row" sx={{ marginTop: 4 }}>
                  <FormControl className="custom-date">
                    <InputLabel>Select Shop</InputLabel>
                    <Select
                      label="Select Shop"
                      onChange={(e) => setSelectShop(e.target.value)}
                      name="SelectName"
                      value={selectShop}
                    >
                      <MenuItem value="Shop1"> Shop1</MenuItem>
                      <MenuItem value="Shop2"> Shop2</MenuItem>
                      <MenuItem value="Shop3"> Shop3</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className="custom-date">
                    <InputLabel>Rent Type</InputLabel>
                    <Select
                      label="Rent Type"
                      onChange={(e) => {
                        setRentType(e.target.value);
                      }}
                    >
                      <MenuItem value="R">Rent</MenuItem>
                      <MenuItem value="D">Deposit</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className="custom-date">
                    {/* <div className="input-CustemWidth"> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label={"Year"}
                          views={["year"]}
                          value={year}
                          onChange={(newValue) => {
                            setYear(newValue);
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    {/* </div> */}
                  </FormControl>
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginTop: 4 }}>
                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label="Total Rent Amount"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    value={totalRent}
                    onChange={(e) => {
                      setTotalRent(e.target.value);
                    }}
                  />

                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label="Total Paid Amount"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    value={totalPaid}
                    onChange={(e) => {
                      setTotalPaid(e.target.value);
                    }}
                  />

                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label="Toatl Remaining Amount"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    value={remainingAmount}           
                  />
                 
                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label="Paying Amount"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    value={payingAmount}
                    onChange={(e)=>{
                      setPayingAmount(e.target.value)
                    }} 
                  />
                  <Button variant="contained" 
                  onClick={AmountSubmitHandle}>
                    <ControlPointIcon />
                  </Button>
                </Stack>
              </form>

              <div style={{ marginTop: "70px" }}>
                <hr />
                <TableContainer className="custem-form">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr No</TableCell>
                        <TableCell>Receit Number</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>Paid Amount</TableCell>
                        <TableCell>Remaining Amount</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        list.map((Items,index)=>{
                          return(
                            <TableRow>
                            <TableCell>{index +1}</TableCell>
                            <TableCell>{Items.receitNumber}</TableCell>
                            <TableCell>{Items.totalRent}</TableCell>
                            <TableCell>{Items.totalPaid}</TableCell>
                            <TableCell>{Items.remainingAmount}</TableCell>
                            <TableCell>
                              <DeleteIcon
                                //   onClick={() => deleteRentData(obj.id)}
                                style={{ marginRight: "50px" }}
                              />
                              <EditIcon
                              //  onClick={() => getRentData(obj.id)}
                              />
                            </TableCell>
                          </TableRow>
                          )
                         
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </TabPanel>
          <TabPanel value="2">
            <>
              <TableContainer className="custem-form">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr No</TableCell>
                      <TableCell>Receit Number</TableCell>
                      <TableCell>Receit Date</TableCell>
                      <TableCell>Shop Owner</TableCell>
                      <TableCell>Shop</TableCell>
                      <TableCell>Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>123</TableCell>
                      <TableCell>10-01-2015</TableCell>
                      <TableCell>ABC</TableCell>
                      <TableCell>SHOP1</TableCell>
                      <TableCell>2015</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default ShopRent;
