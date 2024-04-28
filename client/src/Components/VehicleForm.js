import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/lab";
import "./VehcileForm.css";
import axios from "axios";

const steps = [
  "Personal Details",
  "Choose your wheels",
  "Type of vehicle",
  "Specific Model",
  "Date range picker",
];

export default function VehicleForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("");

  const [mobileError, setMobileError] = useState(false);
const [emailError, setEmailError] = useState(false);
const [selectedModel, setSelcetdModel] = useState([]);




  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    numberOfWheels: "",
    vehicleType: "",
    vehicleModel: "",
    startDate:"",
    endDate:""
  });


  console.log(formData)

  const [vehicleType, setVehicleType] = useState([]);

  const handleNext = () => {
    // Validate form data before proceeding
    if (activeStep === 0) {
      if (!formData.firstName || !formData.lastName) {
        toast.error("Please fill in all required fields.");
        return;
      }
    } else if (activeStep === 1) {
      if (!formData.numberOfWheels) {
        toast.error("Please select the number of wheels.");
        return;
      }
    } else if (activeStep === 2) {
      if (!formData.vehicleType) {
        toast.error("Please select a vehicle type.");
        return;
      }
    } else if (activeStep === 3) {
      if (!formData.vehicleModel) {
        toast.error("Please select a vehicle model.");
        return;
      }
    }

    // Proceed to the next step if all validations pass
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        numberOfWheels: "",
        vehicleType: "",
        vehicleModel: "",
        dateRange: [null, null],
      });
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

 
  const fetchVehicleType = async () => {
    try {
      const response = await axios.get("http://localhost:3001/vehicle-types");
      const data = await response.data 
      setVehicleType(data);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVehicleType();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/booking", formData);
      console.log("Booking successful:", response.data);
      toast.success("Booking successful!");
      setFormData({
        firstName: "",
        lastName: "",
        numberOfWheels: "",
        vehicleType: "",
        vehicleModel: "",
        dateRange: [null, null],
      });
      setActiveStep(0);
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Error submitting booking. Please try again.");
    }
  };



  return (
    <Box sx={{ width: "100%" }}>
    
      <Stepper
        activeStep={activeStep}
        className="container d-flex"
        style={{ marginTop: "90px" }}
      >
        {steps.map((label) => (
          <Step key={label} className="flex-wrap justify-content-center">
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <ToastContainer />
      <Box>
        {activeStep === 0 && (
          //   <Box>
          //     <TextField
          //       name="firstName"
          //       label="First Name"
          //       value={formData.firstName}
          //       onChange={handleInputChange}
          //       fullWidth
          //     />
          //     <TextField
          //       name="lastName"
          //       label="Last Name"
          //       value={formData.lastName}
          //       onChange={handleInputChange}
          //       fullWidth
          //     />
          //           </Box>
          <section className="container">
            <div className="row vechicle_form_Identify_yourself">
              <div className="col-md-6 col-sm-12 col-12">
                <div className="card">
                  <h6>
                    Enter Your First Name
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </h6>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    name="firstName"
                  />
                  <p className="pb-2"></p>
                  <p> </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-12">
                <div className="card">
                  <h6>
                    Enter Your Last Name
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>
                  </h6>

                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={handleInputChange}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      name="lastName"
                      value={formData.lastName}

                    />
                    <div className="input-group-append">
                      {/* <button
                             className="input-group-text vechicle_form_email_otp_getotp_btn"
                             id="basic-addon2"
                             disabled={isVerified}
                             onClick={() => {
                               if (userData.email) {
                                 handleGetOTP();
                               } else {
                                 handleemailerror();
                               }
                             }}
                             data-toggle={ismailValid && "modal"}
                             data-target={ismailValid && "#myModal"}
                           >
                             {isVerified ? "Verified" : "Get OTP"}
                           </button> */}
                    </div>
                  </div>

                  <p className="help-block"></p>
                  <p style={{ color: "#000" }}>
                    <b>Note :</b>{" "}
                    <span style={{ color: "red", paddingLeft: "3px" }}>*</span>{" "}
                    Indicates Mandatory Fields
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeStep === 1 && (
          <section className="container">
            <div className="row vechicle_form_Identify_yourself">
              <div className="col-12">
                <div className="card">
                  <h6>
                    Better with two wheels or four?
                    <RadioGroup
                      name="numberOfWheels"
                      value={formData.numberOfWheels}
                      onChange={handleInputChange}
                      className="mt-3 d-flex"
                    >
                      <FormControlLabel
                        value="bike"
                        control={<Radio />}
                        label="2 Wheels"
                        onClick={() => setSelectedVehicleType("bike")}
                      />
                      <FormControlLabel
                        value="car"
                        control={<Radio />}
                        label="4 Wheels"
                        onClick={() => setSelectedVehicleType("car")}
                      />
                    </RadioGroup>
                  </h6>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeStep === 2 && selectedVehicleType && (
          <section className="container">
            <div className="row vechicle_form_Identify_yourself">
              <div className="col-12">
                <div className="card">
                  <h6>
                    Select the vehicle model you desire
                    <RadioGroup
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="mt-3 d-flex"
                    >
                      {vehicleType
                        .filter((type) => type.type === selectedVehicleType)
                        .map((filteredType) => (
                          <FormControlLabel
                            key={filteredType.id}
                            value={filteredType.model}
                            control={<Radio />}
                            label={filteredType.model}
                          />
                        ))}
                    </RadioGroup>
                  </h6>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeStep === 3 && (
          <section className="container">
            <div className="row vechicle_form_Identify_yourself">
              <div className="col-12">
                <div className="card">
                  <h6>Select the model you wish to drive</h6>
                  <RadioGroup
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className="mt-3 d-flex"
                  >
                    {vehicleType
                      .filter((type) => type.model === formData.vehicleType)
                      .flatMap((filteredType) =>
                      JSON.parse(filteredType.models_json).map((model) => (
                          <FormControlLabel
                            key={model.replace(/\\/g, '')}
                            value={model.replace(/\\/g, '')}
                            control={<Radio />}
                            label={model.replace(/\\/g, '')} 
                          />
                        ))
                      )}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeStep === steps.length - 1 && (
          <section className="container">
            <div className="row vechicle_form_Identify_yourself">
              <div className="col-12">
                <div className="card">
                  <h6 className="text-center">
                    Select Date Range you wish to have
                  </h6>
                  <div className="d-flex flex-wrap justify-content-around mt-4">
                    <div>
                      <p>Select start date</p>
                      <input
                        type="date"
                        label="Select start date"
                        value={formData.startDate}
                        name={"startDate"}
                        onChange={handleInputChange}
                        className="p-1 form-control"
                        style={{ borderRadius: "3px" }}
                      />
                    </div>

                    <div className="">
                      <p>Select end date</p>
                      <input
                        type="date"
                        label="Select start date"
                        value={formData.endDate}
                        name={"endDate"}
                        onChange={handleInputChange}
                        className="p-1 form-control"
                        style={{ borderRadius: "3px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
        className="container"
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
