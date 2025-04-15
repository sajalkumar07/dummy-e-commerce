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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { useCart } from "../context/cartContext";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { displayItems } = useCart();
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
  });

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    // You would process the order here
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      aria-labelledby="checkout-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <DialogTitle id="checkout-dialog-title" sx={{ p: 3, fontWeight: 600 }}>
        Checkout
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#000",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <div className="flex justify-between items-center">
        <div>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container>
              <Grid
                item
                xs={12}
                md={7}
                sx={{ p: 3, borderRight: { md: "1px solid #EAEAEA" } }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Shipping Information
                </Typography>

                {/* Delivery Methods */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Button
                    variant={
                      selectedDeliveryMethod === "delivery"
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      flex: 1,
                      py: 1.5,
                      color:
                        selectedDeliveryMethod === "delivery" ? "#fff" : "#666",
                      bgcolor:
                        selectedDeliveryMethod === "delivery"
                          ? "#3366FF"
                          : "#fff",
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
                    Delivery
                  </Button>
                  <Button
                    variant={
                      selectedDeliveryMethod === "pickup"
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      flex: 1,
                      py: 1.5,
                      color:
                        selectedDeliveryMethod === "pickup" ? "#fff" : "#666",
                      bgcolor:
                        selectedDeliveryMethod === "pickup"
                          ? "#3366FF"
                          : "#fff",
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
                    Pick up
                  </Button>
                </Box>

                {/* Form Fields */}
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
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, fontWeight: 500 }}
                      >
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
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, fontWeight: 500 }}
                      >
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
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, fontWeight: 500 }}
                      >
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
              </Grid>
            </Grid>
          </Box>
        </div>

        <div>
          <Grid item xs={12} md={5} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Review your cart
            </Typography>

            {/* Cart Items */}
            <Box>
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

            {/* Discount Code */}
            <Box
              sx={{
                display: "flex",
                mt: 3,
                mb: 3,
                gap: 1,
              }}
            >
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

            {/* Order Totals */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2">${shipping.toFixed(2)}</Typography>
              </Box>
              {discount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Discount
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    -${discount.toFixed(2)}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Pay Button */}
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                py: 1.5,
                bgcolor: "#3366FF",
                "&:hover": {
                  bgcolor: "#2952CC",
                },
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Pay Now
            </Button>

            {/* Secure Checkout Message */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <LockIcon
                sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                Secure Checkout - SSL Encrypted
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 1 }}
            >
              Ensuring your financial and personal details are secure during
              every transaction.
            </Typography>
          </Grid>
        </div>
      </div>
    </Dialog>
  );
};

export default CheckoutModal;
