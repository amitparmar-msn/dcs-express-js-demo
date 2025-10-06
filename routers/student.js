const express = require('express');
const Router = express.Router();

// Sample student data (in real app, this would come from database)
const students = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 20, course: 'Computer Science' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 21, course: 'Mathematics' },
    { id: 123, name: 'Amit Parmar', email: 'amit@example.com', age: 22, course: 'Engineering' }
];

// Response middleware for standardized responses
const responseMiddleware = (req, res, next) => {
    // Add custom response methods
    res.success = (data, message = 'Success', statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
            path: req.originalUrl,
            method: req.method
        });
    };

    res.error = (message = 'Error', statusCode = 500, error = null) => {
        return res.status(statusCode).json({
            success: false,
            message,
            error,
            timestamp: new Date().toISOString(),
            path: req.originalUrl,
            method: req.method
        });
    };

    next();
};

// Apply response middleware to all student routes
Router.use(responseMiddleware);

Router.route('/')
    .get((req, res) => {
        console.log("req.query:: ", req.query.q, req.query.value);
        
        let filteredStudents = students;
        
        // Apply query filters if provided
        if (req.query.q) {
            filteredStudents = students.filter(student => 
                student.name.toLowerCase().includes(req.query.q.toLowerCase()) ||
                student.course.toLowerCase().includes(req.query.q.toLowerCase())
            );
        }
        
        res.success(filteredStudents, 'Students retrieved successfully');
    })
    .post((req, res) => {
        const { name, email, age, course } = req.body;
        
        // Basic validation
        if (!name || !email || !age || !course) {
            return res.error('Missing required fields: name, email, age, course', 400);
        }
        
        const newStudent = {
            id: students.length + 1,
            name,
            email,
            age: parseInt(age),
            course
        };
        
        students.push(newStudent);
        res.success(newStudent, 'Student created successfully', 201);
    });

Router.route('/:id')
    .get((req, res) => {
        console.log("req.params:: ", req.params.id);
        console.log("req.query:: ", req.query.q, req.query.value);
        
        const studentId = parseInt(req.params.id);
        const student = students.find(s => s.id === studentId);
        
        if (!student) {
            return res.error(`Student with ID ${studentId} not found`, 404);
        }
        
        res.success(student, 'Student retrieved successfully');
    })
    .put((req, res) => {
        const studentId = parseInt(req.params.id);
        const studentIndex = students.findIndex(s => s.id === studentId);
        
        if (studentIndex === -1) {
            return res.error(`Student with ID ${studentId} not found`, 404);
        }
        
        const { name, email, age, course } = req.body;
        const updatedStudent = {
            ...students[studentIndex],
            ...(name && { name }),
            ...(email && { email }),
            ...(age && { age: parseInt(age) }),
            ...(course && { course })
        };
        
        students[studentIndex] = updatedStudent;
        res.success(updatedStudent, 'Student updated successfully');
    })
    .delete((req, res) => {
        const studentId = parseInt(req.params.id);
        const studentIndex = students.findIndex(s => s.id === studentId);
        
        if (studentIndex === -1) {
            return res.error(`Student with ID ${studentId} not found`, 404);
        }
        
        const deletedStudent = students.splice(studentIndex, 1)[0];
        res.success(deletedStudent, 'Student deleted successfully');
    });

module.exports = Router;