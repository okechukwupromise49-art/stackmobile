const express = require("express");
const router = express.Router();


router.post("/login", (req, res) => {
  const { password } = req.body

  if (password === "stack2026") {
    res.json({
      success: true,
      message: "Access Granted",
    })
  } else {
    res.status(401).json({
      success: false,
      message: "Wrong Password",
    })
  }
})

module.exports = router;