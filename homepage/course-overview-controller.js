/* Access database*/
async function main(req, res) {

    const mysql2 = require('mysql2/promise');

    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE,
        connectTimeout: 60000
    });

    // list = [ {}, {}, ... ]
    let [list] = await connection.execute('SELECT * FROM course');
    // list = list.slice(0,50)

    for (i = 0; i < list.length; i++) {

        [b_to] = await connection.execute('SELECT degree,stream,supplement FROM `degree_course` WHERE `courses` = "' + list[i].fullname + '";');
        let bt = [];
        let info = {
            degree: "",
            courses: "",
            stream: "",
            supplement: "",
            full: ""
        }
        for (ii = 0; ii < b_to.length; ii++) {
            var reg = RegExp(/Master/)
            var part1, part2, part3;

            if (b_to[ii].degree.match(reg)) {
                part1 = b_to[ii].degree.replace("Master of ", "M-");
            } else if (b_to[ii].degree == "") {
                part1 = ""
            } else {
                part1 = b_to[ii].degree.replace("Bachelor of ", "B-");
            }
            if (b_to[ii].stream == "") {
                part2 = "";
            } else {
                part2 = "-" + b_to[ii].stream;
            }
            if (b_to[ii].supplement == "") {
                part3 = "";
            } else {
                part3 = "-" + b_to[ii].supplement
            }

            bb = part1 + part2 + part3;
            info = b_to[ii];
            info.full = bb;
            bt.push(info)
        }
        list[i].belongs_to = bt;
    }

    list = setData1(list)
    res.render("../views/homepage-course-overview.ejs", { course_list: list });
}

/* Export the function to be used by routes.js */
module.exports = main;
