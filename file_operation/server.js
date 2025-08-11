// ...existing code...
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Set Content Security Policy to allow images from self and data URLs
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:;");
  next();
});

// Serve static files (HTML, CSS, JS, etc.) from the project root
app.use(express.static(__dirname));

const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILES_DIR = path.join(__dirname, 'files');

// Create a new text file
app.post('/api/create', (req, res) => {
    const { fileName } = req.body;
    if (!fileName) {
        return res.status(400).json({ error: 'File name is required.' });
    }
    const filePath = path.join(FILES_DIR, fileName + '.txt');
    fs.writeFile(filePath, '', { flag: 'wx' }, (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                return res.status(409).json({ error: 'File already exists.' });
            }
            return res.status(500).json({ error: 'Failed to create file.' });
        }
        res.json({ message: 'File created successfully!', file: fileName + '.txt' });
    });
});

// List all files
app.get('/api/files', (req, res) => {
    fs.readdir(FILES_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list files.' });
        }
        res.json({ files });
    });
});

// Delete a file
app.delete('/api/delete', (req, res) => {
    const { fileName } = req.body;
    console.log('Delete request for file:', fileName);
    if (!fileName) {
        return res.status(400).json({ error: 'File name is required.' });
    }
    const filePath = path.join(FILES_DIR, fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('File not found:', filePath);
                return res.status(404).json({ error: 'File not found.' });
            }
            console.log('Error deleting file:', err);
            return res.status(500).json({ error: 'Failed to delete file.' });
        }
        console.log('File deleted:', filePath);
        res.json({ message: 'File deleted successfully!' });
    });
});
// Write to a text file
app.post('/api/write', (req, res) => {
    const { fileName, content } = req.body;
    if (!fileName || typeof content !== 'string') {
        return res.status(400).json({ error: 'File name and content are required.' });
    }
    const filePath = path.join(FILES_DIR, fileName);
    fs.writeFile(filePath, content, { flag: 'w' }, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ error: 'File not found.' });
            }
            return res.status(500).json({ error: 'Failed to write to file.' });
        }
        res.json({ message: 'File written successfully!' });
    });
});

// Update a text file (append content)
app.post('/api/update', (req, res) => {
    const { fileName, content } = req.body;
    if (!fileName || typeof content !== 'string') {
        return res.status(400).json({ error: 'File name and content are required.' });
    }
    const filePath = path.join(FILES_DIR, fileName);
    fs.appendFile(filePath, content, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ error: 'File not found.' });
            }
            return res.status(500).json({ error: 'Failed to update file.' });
        }
        res.json({ message: 'File updated successfully!' });
    });
});

// Serve files for open/download, force download if ?download=1
app.get('/files/:filename', (req, res, next) => {
  const file = req.params.filename;
  const filePath = path.join(FILES_DIR, file);
  if (req.query.download === '1') {
    res.download(filePath, file);

  } else {
    res.sendFile(filePath);
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
