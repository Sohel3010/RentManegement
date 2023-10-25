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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getListOwners } from "./../Service/OwnerService";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { v4 as uuidv4 } from "uuid";
import {
  addRent,
  getListOfRent,
  shopByOwnerId,
  getAmount,
  getRiciptNo,
} from "./../Service/RentService";
import RentListTable from "./RentListTable";

const useStyles = makeStyles((theme) => ({
  datePickerInput: {
    width: "100%",
  },
  searchBar: {
    width: "400px",
    marginLeft: "670px",
  },
}));

function ShopRent() {
  const [value, setValue] = useState("1");
  const [receitNumber, setReceitNumber] = useState("");
  const [receitDate, setReceitDate] = useState(dayjs(new Date()));
  const [shopOwner, setShopOwner] = useState([]);
  const [shopOwnerId, setShopOwnerId] = useState(0);
  const [selectShop, setSelectShop] = useState([]);
  const [selectShopId, setSelectShopId] = useState(0);
  const [rentType, setRentType] = useState("");
  const [status, setStatus] = useState("Active");
  const [year, setYear] = useState(dayjs(new Date()));
  const [totalRentAmount, setTotalRentAmount] = useState(100000);
  const [totalPaidAmount, setTotalPaidAmount] = useState(40000);
  const [totalRemainingAmount, setTotalRemainingAmount] = useState(60000);
  const [totalDepositAmount, setTotalDepositAmount] = useState(50000);
  const [totalRent, setTotalRent] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [payingAmount, setPayingAmount] = useState("");
  const [list, setList] = useState([]);
  const [totalRemaining, setTotalRemaining] = useState("");
  const [rentList, setRentList] = useState([]);
  const [tablePages, setTablePages] = useState(0);
  const [page, setPage] = useState(1);
  const [ownerSearched, setOwnerSearched] = useState("");
  const [shopShearched, setShopShearched] = useState("");
  const [shearchedYear, setShearchedYear] = useState(dayjs().year());
  const [searchedRiciptDate, setSearchedRiciptDate] = useState(
    dayjs(new Date())
  );
  const [recivedAmount, setRecivedAmount] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refresh, setRefresh] = useState(false);

  const classes = useStyles();

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const updateListData = { ...ListData };
    updateListData.page = newPage;
    getRentList(  );
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    const updatedDataList = { ...ListData, page: 1, size: newRowsPerPage };
    getRentList(updatedDataList);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    newValue === "2" ? getRentList(ListData) : getOwnerList();
    newValue === "1" ? setRefresh(true) : setRefresh(false);
  };

  const searchData = (data) => {
    setOwnerSearched(data.shopownerName);
    setShopShearched(data.shopName);
    setShearchedYear(data.year);
    setSearchedRiciptDate(data.receiptDate);
    const updateListData = { ...ListData };
    updateListData.shopownerName = data.shopownerName;
    updateListData.shopName = data.shopName;
    updateListData.year = data.year;
    updateListData.receiptDate = data.receiptDate;
    getRentList(updateListData);
  };

  const handelOwnerChange = (event) => {
    setShopOwnerId(event.target.value);
    const id = event.target.value;
    getShopByOwnerId(id);

    setTotalRent(0);
    setDepositAmount(0);
    setTotalPaid(0);
    setRemainingAmount(0);
  };
  const handleShopChange = (e) => {
    const newShopId = e.target.value;
    setSelectShopId(newShopId);
    setTotalRent(0);
    setDepositAmount(0);
    setTotalPaid(0);
    setRemainingAmount(0);
  };

  React.useEffect(() => {
    getReciptNumber();
    getOwnerList();
  }, []);

  const getReciptNumber = async () => {
    let response = await getRiciptNo();
    setReceitNumber(response.data);
  };
  const getOwnerList = async () => {
    let response = await getListOwners();
    setShopOwner(response.data.data);
  };

  const getShopByOwnerId = async (id) => {
    let response = await shopByOwnerId(id);
    setSelectShop(response.data.data.shopownerSlave);
  };

  // calculation for payingamount and remainingAmount
  React.useEffect(() => {
    if (typeof remainingAmount === "number") {
      const paying_amount = parseFloat(payingAmount);
      const totalRemainingAmount = remainingAmount - paying_amount;

      setTotalRemaining(
        isNaN(totalRemainingAmount) ? "" : totalRemainingAmount.toFixed(2)
      );
    } else {
      setTotalRemaining("");
    }
  }, [payingAmount, remainingAmount]);

  const AmountSubmitHandle = (e) => {
    e.preventDefault();
    if(!rentType){
      toast.error("Please Select Rent Type");
    }else if (!payingAmount || !remainingAmount ) {
      toast.error("Please Fill Paying Amount");
    } else {
      let newItem = {
        id: 0,
        itemId: uuidv4(),
        selectShopId,
        payingAmount,
        totalRemaining,
        remainingAmount,
        depositAmount,
        rentType,
        year: year.year(),
        totalPaid,
        totalRent,
      };
      setTotalRent(0);
      setDepositAmount(0);
      setTotalPaid(0);
      setRemainingAmount(0);
      setPayingAmount(0);
      setYear(dayjs(new Date()));
      setList([...list, newItem]);
    }
  };

  //Edit Row Item
  const EditListItem = (itemId) => {
    const editingRow = list.find((row) => row.itemId === itemId);
    setList(list.filter((row) => row.itemId !== itemId));
    const {
      totalRent,
      totalPaid,
      totalRemaining,
      payingAmount,
      remainingAmount,
      year,
    } = editingRow;
    setTotalRent(totalRent);
    setTotalPaid(totalPaid);
    setRemainingAmount(totalRemaining);
    setPayingAmount(payingAmount);
    setRemainingAmount(remainingAmount);
    setYear(dayjs(year)); // Convert year to a dayjs object
  };

  //Delete Row Item
  // Delete function
  const deleteRow = (itemId) => {
    setList(list.filter((row) => row.itemId !== itemId));
  };

  const saveRentData = async (e) => {
    let actualData = [];
    list.map((item, index) => {
      let mapping = {
        id: item.id,
        rentAmount: item.totalRent,
        depositAmount: item.depositAmount,
        paid: item.payingAmount,
        remaining: item.totalRemaining,
        paymentType: item.rentType,
        shopId: item.selectShopId,
        year: item.year.toString(),
      };
      actualData.push(mapping);
    });
    e.preventDefault();

    if (list < 1) {
      toast.error("Please Add List");
    } else {
      const data = {
        id: 0,
        totalRentAmount: totalRentAmount,
        totalDepositAmount: totalDepositAmount,
        totalPaid: totalPaidAmount,
        totalRemaining: totalRemainingAmount,
        receiptDate: receitDate.format(),
        status: status,
        receiptNo: receitNumber,
        shopownerId: shopOwnerId,
        userId: 0,
        year: year.year().toString(),
        rentSlave: actualData,
      };
      let response = await addRent(data);
      console.log("data saved", response);
      setValue("2");
      getRentList(ListData);
      clearFields();
    }
  };

  const ListData = {
    page: page,
    size: 10,
    shopownerName: ownerSearched,
    shopName: shopShearched,
    year: shearchedYear.toString(),
    receiptDate: searchedRiciptDate,
    mobileNo: "",
    status: "",
    receiptNo: "",
  };
  const getRentList = async (updateListData) => {
    let response = await getListOfRent(updateListData);
    setRentList(response.data.data.data);
    setTablePages(response.data.data.totalCount);
  };
  const clearFields = () => {
    setDepositAmount(0);
    setTotalPaid(0);
    setPayingAmount(0);
    setRemainingAmount(0);
    setTotalRent(0);
    setTotalRemaining(0);
    setShopOwner([]);
    setSelectShop([]);
    setReceitDate(dayjs(new Date()));
    setYear(dayjs(year));
    setRentType("");
    setList([]);
  };

  //calulation done here
  const rentTypeHandler = (e) => {
    if (shopOwnerId < 1) {
      toast.error("Please Select Shop Owner");
    } else if (shopOwnerId >= 1 && selectShopId < 1) {
      toast.error("Please Select Shop Name");
    } else {
      const selectedRentType = e.target.value;
      setRentType(selectedRentType);
      const Year = year.year();
      getAmountByShopId(selectShopId, Year, selectedRentType);
      setPayingAmount("");
    }
  };
  const getAmountByShopId = async (selectShopId, selectedRentType, Year) => {
    let response = await getAmount(selectShopId, selectedRentType, Year);
    setRecivedAmount(response.data);
    setTotalRent(response.data.rentAmount);
    setDepositAmount(response.data.depositAmount);
    setTotalPaid(response.data.paidAmount);
    setRemainingAmount(response.data.remainingAmount);
  };
  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ height: "10px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
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
                <ToastContainer position="top-right" theme="colored" />
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    variant="outlined"
                    label="Recete Number"
                    disabled
                    required
                    sx={{ mb: 4 }}
                    value={receitNumber}
                    // onChange={receiptNumberHandler}
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
                      onChange={handelOwnerChange}
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

                <hr />
                <Stack spacing={2} direction="row" sx={{ marginTop: 4 }}>
                  <FormControl>
                    <InputLabel>Select Shop</InputLabel>
                    <Select
                      className="custom-date"
                      label="Select Shop"
                      value={selectShopId}
                      onChange={handleShopChange}
                      name="shopId"
                    >
                      {selectShop.map((item) => {
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
                          value={year}
                          onChange={(newValue) => {
                            setYear(newValue);
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl>
                    <InputLabel>Rent Type</InputLabel>
                    <Select
                      className="custom-date"
                      label="Rent Type"
                      value={rentType}
                      onChange={rentTypeHandler}
                      name="shopId"
                    >
                      <MenuItem value="R">Rent</MenuItem>
                      <MenuItem value="D">Deposit</MenuItem>
                    </Select>
                  </FormControl>
                  {rentType === "R" ? (
                    <TextField
                      className="custom-date"
                      variant="outlined"
                      label="Rent Amount"
                      disabled
                      required
                      sx={{ mb: 4 }}
                      value={totalRent}
                      onChange={(e) => {
                        setTotalRent(e.target.value);
                      }}
                    />
                  ) : (
                    <TextField
                      className="custom-date"
                      variant="outlined"
                      label="Deposit Amount"
                      disabled
                      required
                      sx={{ mb: 4 }}
                      value={depositAmount}
                      onChange={(e) => {
                        setDepositAmount(e.target.value);
                      }}
                    />
                  )}
                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label=" Paid Amount"
                    required
                    disabled
                    sx={{ mb: 4 }}
                    value={totalPaid}
                    onChange={(e) => {
                      setTotalPaid(e.target.value);
                    }}
                  />
                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label="Remaining Amount"
                    required
                    disabled
                    sx={{ mb: 4 }}
                    value={remainingAmount}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginTop: 4 }}>
                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label="Paying Amount"
                    required
                    sx={{ mb: 4 }}
                    value={payingAmount}
                    onChange={(e) => {
                      setPayingAmount(e.target.value);
                    }}
                  />

                  <TextField
                    className="custom-date"
                    variant="outlined"
                    label="Remaining Amount"
                    required
                    sx={{ mb: 4 }}
                    value={totalRemaining}
                  />
                  <Button
                    variant="contained"
                    sx={{ fontSize: "20px", fontFamily: "sans-serif" }}
                    onClick={AmountSubmitHandle}
                  >
                    Add
                    <ControlPointIcon
                      sx={{ paddingLeft: "9px", fontSize: "25px" }}
                    />
                  </Button>
                </Stack>
              </form>

              <div style={{ marginTop: "70px" }}>
                <hr />
                <TableContainer className="custem-form">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Shop Name</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Rent Type </TableCell>
                        <TableCell>Paying Amount</TableCell>
                        <TableCell>Remaing Amount</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list.map(
                        ({
                          id,
                          itemId,
                          selectShopId,
                          year,
                          rentType,
                          payingAmount,
                          totalRemaining,
                        }) => {
                          return (
                            <TableRow key={id}>
                              <TableCell>
                                {
                                  selectShop.find(
                                    (item) => item.id === selectShopId
                                  )?.shop?.shopName
                                }
                              </TableCell>
                              <TableCell>{year}</TableCell>
                              <TableCell>
                                {rentType === "R" ? "Rent" : "Deposit"}
                              </TableCell>
                              <TableCell>{payingAmount}</TableCell>
                              <TableCell>{totalRemaining}</TableCell>
                              <TableCell>
                                <DeleteIcon
                                  onClick={() => deleteRow(itemId)}
                                  style={{ marginRight: "50px" }}
                                />
                                <EditIcon
                                  onClick={() => EditListItem(itemId)}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                      <Button
                        variant="outlined"
                        type="submit"
                        style={{
                          marginBottom: "20px",
                          alignItems: "end",
                          padding: "10px 20px",
                        }}
                        onClick={saveRentData}
                      >
                        Submit
                      </Button>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </TabPanel>
          <TabPanel value="2">
            <>
              <RentListTable
                rentList={rentList}
                getRentList={getRentList}
                tablePages={tablePages}
                getOwnerList={getOwnerList}
                shopOwner={shopOwner}
                // ListData={ListData}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                searchData={searchData}
              />
            </>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default ShopRent;
