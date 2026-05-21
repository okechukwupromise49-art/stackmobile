const express = require("express");
const router = express.Router();

const fs = require("fs");

const Upload = require("../models/upload");

const upload = require("../middleware/upload");

const { supabase } = require("../supabase/supabaseClient.js")

router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {

    try {

      const { name } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded"
        });
      }

      const filePath = req.file.path;

      const fileBuffer = fs.readFileSync(filePath);

      const fileName = Date.now() + "-" + req.file.originalname;

      const { data, error } = await supabase.storage
        .from("stackmobile")
        .upload(fileName, fileBuffer, {
          contentType: req.file.mimetype,
        });
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
}

    

      const imageUrl =
        `${process.env.SUPABASE_URL}/storage/v1/object/public/stackmobile/${fileName}`;

        

      const newUpload = new Upload({
        name,
        image: imageUrl
      });

      await newUpload.save();

      fs.unlinkSync(filePath);

      res.status(201).json({
        success: true,
        message: "Upload successful",
        data: newUpload
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

router.get("/details", async (req, res) => {

  try {

    const product = await Upload.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Upload.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;