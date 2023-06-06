
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './CheckoutSteps.css'
import { Typography } from '@mui/material';
const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ]

    const stepStyle = {
        boxSizing: "border-box",
        padding: "2.5vmax 0 0 0",
        backgroundColor: 'rgba(231, 231, 231)'


    }
    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel style={stepStyle}>
                {steps.map((item, index) => (
                    <Step
                        key={item.name}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.65)"
                            }}
                            icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps