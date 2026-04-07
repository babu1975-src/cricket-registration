const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// POST - Register student
app.post("/register", (req, res) => {
    try {
        const filePath = path.join(__dirname, "registrations.json");

        let data = [];

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf8");
            if (fileData) {
                data = JSON.parse(fileData);
            }
        }

        data.push(req.body);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.json({ message: "Registration Successful!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ GET - Fetch all students (ADMIN)
app.get("/students", (req, res) => {
    try {
        const filePath = path.join(__dirname, "registrations.json");

        let data = [];

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf8");
            if (fileData) {
                data = JSON.parse(fileData);
            }
        }

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching data" });
    }
});

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});