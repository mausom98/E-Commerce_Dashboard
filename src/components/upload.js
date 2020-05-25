import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { storage, firebase } from '../firebaseConfig';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { Select } from 'antd';

const { Option } = Select;
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

function getSteps() {
    return ['Select Upload Image', 'Content', 'Confirm'];
}



export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [uploaded, setUploaded] = React.useState(false);
    const [name, setName] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [quantity, setQuantity] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const steps = getSteps();
    const handleChange = (value) => {
        setCategory(value);

    }



    const handleNext = () => {
        if (activeStep === steps.length - 3) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if (activeStep === steps.length - 2) {
            setLoading(true);
            db.collection('Brands').doc(brand).get().then((docSnap) => {
                if (docSnap.exists) {
                    setLoading(false);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                else {
                    setLoading(false);
                    setAlert(true);
                }
            })

        }
        if (activeStep === steps.length - 1) {
            setLoading(true);
            const storageRef = storage.ref(`products/${image.name}`).put(image);
            storageRef.on('state_changed',
                (snapShot) => {
                    console.log(snapShot)
                }, (err) => {
                    console.log(err)
                }, () => {
                    storage.ref('products').child(image.name).getDownloadURL()
                        .then(url => {
                            db.collection('Product').add({
                                CurTime: Date.now(),
                                Image: url,
                                Name: name,
                                Brand: brand,
                                Quantity: quantity,
                                Price: price,
                                Category: category
                            }).then((e) => {
                                setLoading(false);
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }).catch((error) => {
                                console.log(error);
                            });
                        })
                });
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setUploaded(false);
        setImage(null);
        setName('');
        setBrand('');
        setQuantity(0);
        setPrice(0);
        setCategory('');
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <div>
                    <Button variant="contained" component="label">
                        Upload File
                        <input onChange={(e) => {
                            let file = e.target.files[0];
                            if (file) {
                                setImage(file);
                                setUploaded(true);
                            }
                        }}
                            type="file"
                            style={{ display: "none" }}
                            accept="image/png, image/jpeg"
                        />
                    </Button>
                </div>;

            case 1:
                return <div>
                    <Select defaultValue="Select Category" style={{ width: 190 }} onChange={handleChange}>
                        <Option value="Beer">Beer</Option>
                        <Option value="Rum">Rum</Option>
                        <Option value="Whiskey">Whiskey</Option>
                        <Option value="Vodka">Vodka</Option>
                        <Option value="Scotch">Scotch</Option>
                        <Option value="Wine">Wine</Option>
                        <Option value="Tequila">Tequila</Option>
                    </Select>
                    <TextField
                        autoComplete="off"
                        id="name"
                        label="Name"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <TextField
                        autoComplete="off"
                        id="brand"
                        label="Brand"
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

                    <TextField
                        autoComplete="off"
                        id="quantity"
                        label="Quantity in Ltr"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(e) => {
                            setQuantity(parseInt(e.target.value));
                        }}
                    />
                    <TextField
                        autoComplete="off"
                        id="price"
                        label="Price"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(e) => {
                            setPrice(parseInt(e.target.value));
                        }}
                    />
                    {alert ? <Alert severity="error">
                        The Given Brand Doesnot Exist in the Database,<strong> Please Add it.</strong>
                    </Alert> : <div></div>}

                </div>;
            case 2:
                return `Confirm All The Changes Made, Once Processed It Will Go For Public View`;
            default:
                return 'Unknown step';
        }

    }


    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        disabled={uploaded === false}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;ve successfully uploaded</Typography>
                    <Button onClick={handleReset} className={classes.button}>Reset</Button>
                </Paper>
            )}
        </div>
    );
}
