const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { files: 5 }  // Limit to 5 files
});

// Route: Serve homepage (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'found.html'));
});

// Route: Handle form submission
app.post('/api/found', upload.array('photos', 5), (req, res) => {
  const { description } = req.body;
  const photoPaths = req.files.map(file => `/uploads/${file.filename}`);

  // Example: Store data in memory (you could use DB here)
  const newFoundItem = {
    id: Date.now(),
    description,
    photos: photoPaths
  };

  console.log('New found item:', newFoundItem);
  res.send('✅ Found item submitted successfully!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
