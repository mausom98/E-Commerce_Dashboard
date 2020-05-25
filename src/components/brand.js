import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { firebase } from '../firebaseConfig';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Select } from 'antd';
import { message } from "antd";
const { Option } = Select;
const success = () => {
    message.success("Brand Successfully Added");
};
const error1 = () => {
    message.error("Error in Adding Brand");
};


const db = firebase.firestore();
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));




export default function Brands() {
    const classes = useStyles();
    const [brand, setBrand] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [cat, setCat] = React.useState('Select Category');


    const handleChange = (value) => {
        setCategory(value);
    }

    const handleSubmit = () => {
        setLoading(true);
        db.collection('Brands').doc(brand).set({
            Brand: brand,
            Category: category
        }).then((e) => {
            setLoading(false);
            setCategory('');
            setBrand('');
            setCat('Select Category');
            success();
        }).catch((error) => {
            console.log(error);
            error1();
        });
    };
    return (
        <div className={classes.root}>
            <Paper>
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div style={{ padding: 80 }}>
                    <h1>Add Brands Here</h1>
                    <Select defaultValue={cat} style={{ width: 190 }} onChange={handleChange}>
                        <Option value="Beer">Beer</Option>
                        <Option value="Rum">Rum</Option>
                        <Option value="Whiskey">Whiskey</Option>
                        <Option value="Vodka">Vodka</Option>
                        <Option value="Scotch">Scotch</Option>
                        <Option value="Wine">Wine</Option>
                        <Option value="Tequila">Tequila</Option>
                    </Select>
                    <div style={{ paddingTop: 20 }}>
                        <TextField
                            autoComplete="off"
                            id="brand"
                            label="Brand Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                        />

                    </div>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>

                </div>


            </Paper>


        </div>
    );



};







