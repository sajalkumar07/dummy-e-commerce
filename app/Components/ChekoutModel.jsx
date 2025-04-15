import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  InputAdornment,
  Select,
  FormControl,
  OutlinedInput,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useCart } from "../context/cartContext";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { displayItems } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState("delivery");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    agreeToTerms: false,
    discountCode: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardName: "",
  });

  // Steps for checkout process
  const steps = ["Shipping Information", "Delivery Method", "Payment Details"];

  // Calculate order summary
  const calculateSubtotal = () => {
    return displayItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = 5.0;
  const discount = formData.discountCode ? 10.0 : 0;
  const total = subtotal + shipping - discount;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDeliveryMethodChange = (method) => {
    setSelectedDeliveryMethod(method);
  };

  // Handle discount code application
  const handleApplyDiscount = () => {
    // In a real app, you would validate the code here
    console.log("Discount applied");
  };

  // Handle step navigation
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    // You would process the order here
  };

  // Content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Full name{" "}
                <Box component="span" sx={{ color: "error.main" }}>
                  *
                </Box>
              </Typography>
              <TextField
                required
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                fullWidth
                value={formData.fullName}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  mb: 2,
                }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Email address{" "}
                <Box component="span" sx={{ color: "error.main" }}>
                  *
                </Box>
              </Typography>
              <TextField
                required
                id="email"
                name="email"
                placeholder="Enter email address"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  mb: 2,
                }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Phone number{" "}
                <Box component="span" sx={{ color: "error.main" }}>
                  *
                </Box>
              </Typography>
              <TextField
                required
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component="span"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src="/api/placeholder/24/18"
                          alt="US Flag"
                          style={{ marginRight: 4 }}
                        />
                        +1
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  mb: 2,
                }}
              />

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Country{" "}
                <Box component="span" sx={{ color: "error.main" }}>
                  *
                </Box>
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <Select
                  value={formData.country}
                  name="country"
                  displayEmpty
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography color="text.secondary">
                          Choose country
                        </Typography>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="United States">United States</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                    City
                  </Typography>
                  <TextField
                    id="city"
                    name="city"
                    placeholder="Enter city"
                    fullWidth
                    value={formData.city}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                    State
                  </Typography>
                  <TextField
                    id="state"
                    name="state"
                    placeholder="Enter state"
                    fullWidth
                    value={formData.state}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                    ZIP Code
                  </Typography>
                  <TextField
                    id="zipCode"
                    name="zipCode"
                    placeholder="Enter ZIP code"
                    fullWidth
                    value={formData.zipCode}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Choose your preferred delivery method
            </Typography>

            {/* Delivery Methods */}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
            >
              <Button
                variant={
                  selectedDeliveryMethod === "delivery"
                    ? "contained"
                    : "outlined"
                }
                sx={{
                  py: 2,
                  px: 3,
                  color:
                    selectedDeliveryMethod === "delivery" ? "#fff" : "#666",
                  bgcolor:
                    selectedDeliveryMethod === "delivery" ? "#3366FF" : "#fff",
                  borderColor: "#EAEAEA",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor:
                      selectedDeliveryMethod === "delivery"
                        ? "#2952CC"
                        : "#F8F8F8",
                    boxShadow: "none",
                  },
                  textTransform: "none",
                  justifyContent: "flex-start",
                }}
                onClick={() => handleDeliveryMethodChange("delivery")}
                startIcon={
                  selectedDeliveryMethod === "delivery" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )
                }
                endIcon={<LocalShippingOutlinedIcon sx={{ ml: "auto" }} />}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Standard Delivery
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      selectedDeliveryMethod === "delivery"
                        ? "inherit"
                        : "text.secondary"
                    }
                  >
                    Estimated delivery in 3-5 business days
                  </Typography>
                </Box>
              </Button>

              <Button
                variant={
                  selectedDeliveryMethod === "pickup" ? "contained" : "outlined"
                }
                sx={{
                  py: 2,
                  px: 3,
                  color: selectedDeliveryMethod === "pickup" ? "#fff" : "#666",
                  bgcolor:
                    selectedDeliveryMethod === "pickup" ? "#3366FF" : "#fff",
                  borderColor: "#EAEAEA",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor:
                      selectedDeliveryMethod === "pickup"
                        ? "#2952CC"
                        : "#F8F8F8",
                    boxShadow: "none",
                  },
                  textTransform: "none",
                  justifyContent: "flex-start",
                }}
                onClick={() => handleDeliveryMethodChange("pickup")}
                startIcon={
                  selectedDeliveryMethod === "pickup" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )
                }
                endIcon={<StoreOutlinedIcon sx={{ ml: "auto" }} />}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Store Pickup
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      selectedDeliveryMethod === "pickup"
                        ? "inherit"
                        : "text.secondary"
                    }
                  >
                    Pick up at a store near you
                  </Typography>
                </Box>
              </Button>
            </Box>

            {selectedDeliveryMethod === "pickup" && (
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Select a store location
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    displayEmpty
                    value={formData.storeLocation || ""}
                    name="storeLocation"
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <Typography color="text.secondary">
                            Choose a store
                          </Typography>
                        );
                      }
                      return selected;
                    }}
                  >
                    <MenuItem value="Downtown Store">Downtown Store</MenuItem>
                    <MenuItem value="Uptown Store">Uptown Store</MenuItem>
                    <MenuItem value="Eastside Store">Eastside Store</MenuItem>
                    <MenuItem value="Westside Store">Westside Store</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter your payment details
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Card Number{" "}
                <Box component="span" sx={{ color: "error.main" }}>
                  *
                </Box>
              </Typography>
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                fullWidth
                value={formData.cardNumber}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  mb: 2,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img src="/api/placeholder/32/20" alt="Card icons" />
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                    Expiry Date{" "}
                    <Box component="span" sx={{ color: "error.main" }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    required
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    fullWidth
                    value={formData.expiryDate}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                      mb: 2,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                    CVC{" "}
                    <Box component="span" sx={{ color: "error.main" }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    required
                    id="cvc"
                    name="cvc"
                    placeholder="123"
                    fullWidth
                    value={formData.cvc}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                      mb: 2,
                    }}
                  />
                </Grid>
              </Grid>

              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Name on Card{" "}
                <Box component="span" sx={{ color: "error.main" }}>
                  *
                </Box>
              </Typography>
              <TextField
                required
                id="cardName"
                name="cardName"
                placeholder="Enter name on card"
                fullWidth
                value={formData.cardName}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
                  mb: 2,
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="saveCard"
                    checked={formData.saveCard || false}
                    onChange={handleChange}
                    sx={{
                      color: "#3366FF",
                      "&.Mui-checked": {
                        color: "#3366FF",
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    Save this card for future purchases
                  </Typography>
                }
                sx={{ mt: 1 }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  sx={{
                    color: "#3366FF",
                    "&.Mui-checked": {
                      color: "#3366FF",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  I have read and agree to the Terms and Conditions.
                </Typography>
              }
              sx={{ mt: 1 }}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      aria-labelledby="checkout-dialog-title"
      overflow="hidden"
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          height: "90vh",
          maxHeight: "700px",
        },
      }}
    >
      {" "}
      <div className="   w-full p-8 flex justify-between items-center bg-gray-100  text-black sticky top-0 z-50">
        <h1 className="text-2xl"> Checkout</h1>
        <span className="text-black">
          <CloseIcon />
        </span>
      </div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", height: "100%" }}
      >
        {/* Left Side - Checkout Process */}
        <Box
          sx={{
            width: "60%",
            borderRight: "1px solid #EAEAEA",
            overflow: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
            {getStepContent(activeStep)}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              pt: 2,
              borderTop: "1px solid #EAEAEA",
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                color: "#666",
                textTransform: "none",
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              sx={{
                bgcolor: "#3366FF",
                "&:hover": {
                  bgcolor: "#2952CC",
                },
                textTransform: "none",
                px: 4,
              }}
            >
              {activeStep === steps.length - 1 ? "Place Order" : "Continue"}
            </Button>
          </Box>
        </Box>

        {/* Right Side - Order Summary (Fixed) */}
        <Box
          sx={{
            width: "40%",
            p: 3,
            backgroundColor: "#FAFAFA",
            height: "100%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Order Summary
          </Typography>

          {/* Cart Items */}
          <Box sx={{ mb: 3 }}>
            {displayItems.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", mb: 2, alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  ) : (
                    <img
                      src="/api/placeholder/60/60"
                      alt={item.title}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.title || "Product Name"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    x{item.quantity}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Discount Code */}
          <Box sx={{ display: "flex", mb: 3, gap: 1 }}>
            <TextField
              id="discountCode"
              name="discountCode"
              placeholder="Discount code"
              value={formData.discountCode}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
            />
            <Button
              variant="outlined"
              onClick={handleApplyDiscount}
              sx={{
                height: 40,
                color: "#3366FF",
                borderColor: "#3366FF",
                "&:hover": {
                  borderColor: "#2952CC",
                  bgcolor: "rgba(51, 102, 255, 0.04)",
                },
              }}
            >
              Apply
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Order Totals */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Shipping
              </Typography>
              <Typography variant="body2">${shipping.toFixed(2)}</Typography>
            </Box>
            {discount > 0 && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Discount
                </Typography>
                <Typography variant="body2" color="error.main">
                  -${discount.toFixed(2)}
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Total
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CheckoutModal;
