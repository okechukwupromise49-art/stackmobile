const express = require ("express")
const cors = require ("cors")
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const dotenv = require ("dotenv")
const mongoose = require("mongoose")

dotenv.config()

const app = express()

const loginRoutes = require("./routes/login")
const uploadRoutes = require("./routes/upload")

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174","https://stackmobile.vercel.app", ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));


  app.use("/api", loginRoutes)
  app.use("/api", uploadRoutes)
 
app.get("/", (req, res) => {
  res.send("Backend Running")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

