import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addShop, getListOfCategory } from '../Service/ShopService';
import { ShopModel } from '../model/ShopModel';
import { CategoryModel } from '../model/CategoryModel';

const shop = [];
const category = [];
const rows = [];

const ShopInput = () => {
    const [rows, setCategory] = React.useState([])
    const [shop, setShop] = React.useState(ShopModel)
    const [category, setCategoryModel] = React.useState(CategoryModel)
    const onValueChange = (e) => {
        setShop({ ...shop, [e.target.name]: e.target.value });
    }

    const handleChange = (e) => {
        setCategoryModel({ ...category, [e.target.name]: e.target.value });
        setShop({ ...shop, category });
    };

    const addShopDetails = async () => {
        let response = await addShop(shop);
        console.log(response)
    }

    React.useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        let response = await getListOfCategory();
        setCategory(response.data)

    }
    return (
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
                name='shopName'
                label="Shop Name"
                id="outlined-size-small"
                size="small"
                onChange={(e) => onValueChange(e)}
            />
            <TextField
                required
                name='shopCode'
                label="Shop Code"
                id="outlined-size-small"
                size="small"
                onChange={(e) => onValueChange(e)}
                value={shop.shopCode}
            />
            <TextField
                required
                name='rent'
                label="Rent"
                id="outlined-size-small"
                size="small"
                onChange={(e) => onValueChange(e)}
                value={shop.rent}
            />
            <TextField
                required
                name='rentType'
                type='Rent Type'
                label="Rent Type"
                id="outlined-size-small"
                size="small"
                onChange={(e) => onValueChange(e)}
                value={shop.rentType}
            />

            <TextField
                required
                name='address'
                label="Address"
                id="outlined-size-small"
                size="small"
                onChange={(e) => onValueChange(e)}
                value={shop.address}
            />
            <FormControl sx={{ width: "220px", marginLeft: "10px" }}>
                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                <Select
                    style={{ width: '199px', height: '40px', marginTop: '8px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Position"
                    name='id'
                    onChange={handleChange}
                >
                    {rows.map(item => {
                        return (
                            <MenuItem value={item.id}>{item.categoryName}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Button onClick={() => addShopDetails()}>Save</Button>
        </Box>
    );
}
export default ShopInput;