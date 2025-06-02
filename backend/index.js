const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoutes = require("./routes/auth/AuthRoutes");

const app=express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
}
)
.catch((err) => {
    console.error("MongoDB connection error:", err);
    }
);


app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);
