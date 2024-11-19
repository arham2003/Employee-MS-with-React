import con from '../../utils/db.js';  // Import the MySQL connection

// Function to get all projects
export const getAllProjects = (req, res) => {
    const query = 'SELECT * FROM projects';
    con.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(results);
    });
};

export const addProject = (req, res) => {
    const { projectName, customerName, startDate, expectedDate, budget, status } = req.body;

    // Check if all required fields are provided
    if (!projectName || !customerName || !startDate || !expectedDate || !budget || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO projects (projectName, customerName, startDate, expectedDate, budget, status) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(query, [projectName, customerName, startDate, expectedDate, budget, status], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Project added successfully',
            projectId: result.insertId // Return the id of the newly inserted project
        });
    });
};


//  project details apis

// Function to get all project parts
export const getAllProjectParts = (req, res) => {
    const query = 'SELECT * FROM project_parts';
    con.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Function to get project parts for a specific project
export const getProjectPartsByProjectId = (req, res) => {
    const { projectId } = req.params; // Get projectId from URL params

    // Ensure projectId is provided and is a valid number
    if (!projectId || isNaN(projectId)) {
        return res.status(400).json({ error: 'Invalid or missing projectId' });
    }

    const query = 'SELECT * FROM project_parts WHERE project_id = ?';
    con.query(query, [projectId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No parts found for this project' });
        }
        res.status(200).json(results);
    });
};

export const getProjectById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM projects WHERE id = ?';
    con.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(result[0]); // Return the project details
    });
};

// Delete Project Part
export const deleteProjectPart = (req, res) => {
    const { partId } = req.params; // Extract the partId from the request parameters

    // Ensure 'id' is the actual column name in your table, otherwise replace it with the correct one.
    const query = 'DELETE FROM project_parts WHERE part_id = ?'; // Use 'part_id' as column name

    con.query(query, [partId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project part not found' });
        }
        res.status(200).json({ Status: true, message: 'Project part deleted successfully' });
    });
};
