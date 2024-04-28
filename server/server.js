const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors")

const databasePath = path.join(__dirname, "vehicles.db");

const app = express();

app.use(express.json());
app.use(cors());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () =>
      console.log("Server Running at http://localhost:3001 \nDB Connected")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//vehicle types api
app.get("/vehicle-types", async(req,res)=>{
    const allVehiclesQuery = `SELECT * FROM vehicles_data`
    const allVehicles = await database.all(allVehiclesQuery);
    res.status(200).json(allVehicles);
})

//booking api
app.post("/booking", async (req, res) => {
    const { firstName, lastName, numberOfWheels, vehicleType, vehicleModel, startDate, endDate,vehicleName="new" } = req.body;

    try {
        // Validate input data
        if (!firstName || !lastName || !numberOfWheels || !vehicleType || !vehicleModel || !startDate || !endDate || !vehicleName) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Perform additional validations if needed

        // Insert booking data into the database
        const insertBookingQuery = `
            INSERT INTO vehicle_bookings (first_name, last_name, number_of_wheels, vehicle_type, vehicle_model, start_date, end_date,vehicle_name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        await database.run(insertBookingQuery, [firstName, lastName, numberOfWheels, vehicleType, vehicleModel, startDate, endDate,vehicleName]);

        res.status(200).json({ message: "Booking successful!" });
    } catch (error) {
        console.error("Error submitting booking:", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

//bookings data api
app.get("/booking", async(req,res)=>{
  const allVehiclesQuery = `SELECT * FROM vehicle_bookings`
  const allVehicles = await database.all(allVehiclesQuery);
  res.status(200).json(allVehicles);
})





