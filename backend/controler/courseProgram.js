const rootdb = require('../config/connectDb');

const createTable = async (req, res) => {
    try {
        const colName = req.body.cName;
        const creatCommand = `CREATE TABLE courseProgram (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(255),
            credit int,
            tutionFee int,
            PRIMARY KEY (id)
        )`
        var sql = `ALTER TABLE users ADD COLUMN ${colName} varchar(255)`;
        rootdb.query(creatCommand, (err, result) => {
            if (err) res.status(400).send(err);
            res.send(result);
        })
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const insertCourseProgram = async (req, res) => {
    try {
        const courseData = req.body;
        const resultArray = [
            courseData.name,
            courseData.credit,
            courseData.tutionFee,
            courseData.type,
        ]
        const sql = `insert into courseProgram (name, credit, tutionFee, type) values(?, ?, ?, ?)`;
        rootdb.query(sql, resultArray, (err, result) => {
            if (err) res.status(400).send(err);
            res.send(result);
        })
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
}

const getallInfo = async (req, res) => {
    try {
        const courseSql = `select * from courseprogram where type = "Undergraduate"`;
        const waiverSql = `select * from waivertypes`;
        const boardSql = `select * from educationboard`;
        const studentWaiverSql = `select * from student_discount order by mark_range_up_to`
        rootdb.query(courseSql, (err, courseList) => {
            if (err) {
                // Error occurred during the query execution
                console.error('Error executing SQL:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            rootdb.query(waiverSql, (err, waiverList) => {
                if (err) {
                    // Error occurred during the query execution
                    console.error('Error executing SQL:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                rootdb.query(boardSql, (err, boardList) => {
                    if (err) {
                        // Error occurred during the query execution
                        console.error('Error executing SQL:', err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }

                    rootdb.query(studentWaiverSql, (err, studentWaiverList) => {
                        if (err) {
                            // Error occurred during the query execution
                            console.error('Error executing SQL:', err);
                            res.status(500).send('Internal Server Error');
                            return;
                        }
                        res.status(200).json({ courseList, waiverList, boardList, studentWaiverList });
                    });
                });
            })
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

const getCourseWithType = async (req, res) => {
    try {
        const programType = req.params.programType;
        const sql = `select * from courseprogram where type = "${programType}"`
        rootdb.query(sql, (err, courseList) => {
            if (err) {
                // Error occurred during the query execution
                console.error('Error executing SQL:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send(courseList)
        })
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}


module.exports = {
    createTable,
    insertCourseProgram,
    getallInfo,
    getCourseWithType
}