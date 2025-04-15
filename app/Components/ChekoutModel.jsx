"use client";
import { useState } from "react";
import { X, Check, CreditCard, Truck, User } from "lucide-react";
import { useCart } from "../context/cartContext";

const CheckoutModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const { displayItems } = useCart();

  // Calculate subtotal
  const calculateSubtotal = () => {
    return displayItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment and finalize order
      alert("Order placed successfully!");
      onClose();
    }
  };

  // Step indicators
  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          <User size={16} />
        </div>
        <div
          className={`w-12 h-1 ${step > 1 ? "bg-black" : "bg-gray-200"}`}
        ></div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          <Truck size={16} />
        </div>
        <div
          className={`w-12 h-1 ${step > 2 ? "bg-black" : "bg-gray-200"}`}
        ></div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 3 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          <CreditCard size={16} />
        </div>
      </div>
    </div>
  );

  // Modal content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-black">
              Your Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-black">
              Order Summary
            </h2>
            <div className="max-h-64 overflow-y-auto">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="flex py-3 border-b border-gray-200"
                >
                  <div className="w-16 h-16 text-black bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200" />
                    )}
                  </div>
                  <div className="ml-4 flex-1 text-black">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-black">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black">5.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-black">
                  ${(calculateSubtotal() * 0.08).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-black">Total</span>
                <span className="text-black">
                  $
                  {(
                    calculateSubtotal() +
                    5.99 +
                    calculateSubtotal() * 0.08
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-black focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Save shipping information
                </span>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-black">
              Payment
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-black">Total Amount</span>
                <span className="font-semibold text-black">
                  $
                  {(
                    calculateSubtotal() +
                    5.99 +
                    calculateSubtotal() * 0.08
                  ).toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Includes shipping and taxes
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full px-3 py-2 border  text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium  text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium  text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-black focus:border-black"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded text-black focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Save payment information
                </span>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-black">Checkout</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <StepIndicator />
          <form onSubmit={handleSubmit}>{renderStepContent()}</form>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-black border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-black border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            {step === 3 ? "Place Order" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
