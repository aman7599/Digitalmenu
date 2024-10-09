const express = require("express");
const { pool, pool2 } = require("./db"); // Adjusted import
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your client's origin
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1> Express API </h1>");
});
// --------------   menu list -----------------------

app.get("/menu", async (req, res) => {
  try {
    const result = await pool.query("select mid  , menu_name from menu ;");
    // res.json(result.rows);
    res.json({ status: "200", message: "sucess", menuList: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// app.get("/menu", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM menu");

// const menuList = result.rows.map(row => ({
//   mid: row.mid,
//   menu_name: row.menu_name
// }));

// res.json({
//   status: "200",
//   message: "success",
//   menuList: menuList
// });

//   } catch (err) {
//     console.error(err.message);0
//     res.status(500).send("Server Error");
//   }
// });

//----------------------------- menu  by i d--------------------------

app.get(
  "/menuById",
  [body("id").notEmpty().withMessage("id is required")],
  async (req, res) => {
    try {
      //Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      } else {
        // if validation  passes , proced with the request
        const { id } = req.body;
        const result = await pool.query("SELECT * FROM menu WHERE mid = $1", [
          id,
        ]); // pool.query ka use karna hoga
        if (result.rows.length > 0) {
          // res.json(result.rows);
          res.json({ status: "200", message: "sucess", data: result.rows });
        } else {
          res.json({ status: "400", message: "Data is not found" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// -------------------- add menu --------------------------
app.post("/addmenu", async (req, res) => {
  try {
    const { menu_name, menu_price, gid, qid } = req.body;
    const result = await pool.query(
      "INSERT INTO menu (menu_name, menu_price, gid, qid) VALUES ($1, $2, $3, $4) RETURNING *",
      [menu_name, menu_price, gid, qid]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//------------------- update ----------------
app.put(
  "/updatemenu",
  [
    body("menu_name").notEmpty().withMessage("menu_name is required"),
    body("menu_price").notEmpty().withMessage("menu price is required "),
    body("gid").notEmpty().withMessage("gid is required "),
    body("qid").notEmpty().withMessage("qid is required"),
    body("mid").notEmpty().withMessage("mid is a required "),
  ],
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const { menu_name, menu_price, gid, qid, mid } = req.body;
        const rs = await pool.query("select * from  menu where mid = $1", [
          mid,
        ]);
        if (rs.rows.length > 0) {
          await pool.query(
            "UPDATE menu SET menu_name = $1, menu_price = $2, gid = $3, qid = $4 WHERE mid = $5",
            [menu_name, menu_price, gid, qid, mid]
          );
          
          // res.send({ status: "200", message: "sucess", data : result.rows });
          res.send('{status:"200" , message:"update Success}')
        } else {
          res.send({ status: "400", message: "update faild mid:is not found" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ------------------- Delete -------------------

//53 api2
app.delete(
  "/delmenu",
  [body("id").notEmpty().withMessage("id is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      } else {
        const { id } = req.body;
        // const rs = await pool.query('select * from  menu where mid = $1' , [id]);
        const result = await pool.query("DELETE FROM menu WHERE mid = $1", [
          id,
        ]);
        if (result.rowCount > 0) {
          res.send('{status: "200", message: "Delete Success"}');
        } else {
          res.send('{status: "400", message: "Delete Failed"}');
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ---------------- Food catagerey

app.get("/food_group", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM food_group");
    res.json({ status: 200, foodgroup: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//----------------------------- menu  by i d--------------------------

app.get(
  "/foodgroupById",
  [body("id").notEmpty().withMessage("id is required")],
  async (req, res) => {
    try {
      //Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      } else {
        // if validation  passes , proced with the request
        const { id } = req.body;
        const result = await pool.query(
          "select * from  food_group where gid = $1",
          [id]
        ); // pool.query ka use karna hoga
        if (result.rows.length > 0) {
          // res.json(result.rows);
          res.json({ status: "200", message: "sucess", data: result.rows });
        } else {
          res.json({ status: "400", message: "Data is not found" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ------------------- Delete food group -------------------

//53 api2
app.delete(
  "/delfoodgroup",
  [body("id").notEmpty().withMessage("id is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      } else {
        const { id } = req.body;
        // const rsult= await pool.query('select * from  menu where mid = $1' , [id]);
        const result = await pool.query(
          "DELETE FROM food_group WHERE gid = $1",
          [id]
        );
        if (result.rowCount > 0) {
          res.send('{status: "200", message: "Delete Success"}');
        } else {
          res.send('{status: "400", message: "Delete Failed"}');
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// ----------------- update food group -------------------

app.put(
  "/updatefoodgroup",
  [
    body("group_name").notEmpty().withMessage("group_name is required"),
    body("gid").notEmpty().withMessage("gid is required "),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const { gid, group_name } = req.body;
        const rs = await pool.query(
          "select * from  food_group where gid = $1",
          [gid]
        );
        if (rs.rows.length > 0) {
          await pool.query(
            "UPDATE food_group set group_name=$1 where gid = $2 ",
            [group_name, gid]
          );

          // res.json({status:"200", message : "sucess" , data:result.rows});
          res.send('{ status:"200" , message:"update Success}');
        } else {
          res.json({ status: "400", message: "update faild mid:is not found" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// -------------------- add menu --------------------------
app.post(
  "/addfoodgroup",
  [body("group_name").notEmpty().withMessage("group_name is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const { group_name } = req.body;
        const result = await pool.query(
          "INSERT INTO food_group (group_name) VALUES ($1) RETURNING *",
          [group_name]
        );
        res.json(result.rows);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ------------------------------------------Qty MASt--------------------------------------------------

//    -------------------------------add qty mast ------------------------------------------
app.post(
  "/addqtymast",
  [body("qty_type").notEmpty().withMessage("qty_type is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const { qty_type } = req.body;
        const result = await pool.query(
          "INSERT INTO qtymast (qty_type) VALUES ($1) RETURNING *",
          [qty_type]
        );
        res.json(result.rows);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ---------------------------------------upadate qtymast- -- -

app.put(
  "/updateqtymast",
  [
    body("qty_type").notEmpty().withMessage("qty_type is required"),
    body("qid").notEmpty().withMessage("qid is required "),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const { qid, qty_type } = req.body;
        const rs = await pool.query("select * from  qtymast where qid = $1", [
          qid,
        ]);
        if (rs.rows.length > 0) {
          await pool.query("UPDATE qtymast set qty_type=$1 where qid = $2 ", [
            qty_type,
            qid,
          ]);

          // res.json({status:"200", message : "sucess" , data:result.rows});
          res.send('{status:"200" , message:"update Success}');
        } else {
          res.json({ status: "400", message: "update faild mid:is not found" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ------------------------------------delete qtymst

app.delete(
  "/delqtymast",
  [body("qid").notEmpty().withMessage("qid is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      } else {
        const { qid } = req.body;
        // const rs = await pool.query('select * from  menu where mid = $1' , [id]);
        const result = await pool.query("DELETE FROM qtymast WHERE qid = $1", [
          qid,
        ]);
        if (result.rowCount > 0) {
          res.send('{status: "200", message: "Delete Success"}');
        } else {
          res.send('{status: "400", message: "Delete Failed"}');
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//----------------------------- qtymast by i d--------------------------

app.get(
  "/qtyById",
  [body("qid").notEmpty().withMessage("qid is required")],
  async (req, res) => {
    try {
      //Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      } else {
        // if validation  passes , proced with the request
        const { qid } = req.body;
        const result = await pool.query(
          "select * from  qtymast where qid = $1",
          [qid]
        ); // pool.query ka use karna hoga
        if (result.rows.length > 0) {
          // res.json(result.rows);
          res.json({ status: "200", message: "sucess", data: result.rows });
        } else {
          res.json({ status: "400", message: "Data is not found" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
////------------------------- select qty mast
app.get("/qtymast", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM qtymast");
    res.json({ status: 200, foodgroup: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// ---------------------------------------------------------------------------------------------------------------!
// ---------------------------------------------------------------------------------------------------------------!

// menu card------------------
app.get("/menucard", async (req, res) => {
  try {
    const result = await pool.query(
      "select menu_name , menu_price , group_name  ,qty_type from menu , food_group , qtymast where food_group.gid = menu.gid and menu.qid = qtymast.qid"
    );
    res.json({ status: 200, menucard: result.rows });
    // console.log(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/menucardid", async (req, res) => {
  try {
    const result = await pool.query(
      "select mid, menu_name , menu_price , group_name  ,qty_type from menu , food_group , qtymast where food_group.gid = menu.gid and menu.qid = qtymast.qid"
    );
    res.json({ status: 200, menucard: result.rows });
    console.log(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------


// Fetch all users
app.get("/user", async (req, res) => {
    try {
      const result = await pool2.query("select * from users");
      
      // const menuList = result.rows.map((row) => ({
      //   id: row.id,
      //   name: menuList.name,
      // }));
      
      res.json(result.rows);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });
  
  // // LOGIN
  // app.post('/login', async (req, res) => {
  //   try {
  //     const { email, pwd } = req.body;
  
  //     // Check if the email exists
  //     const emailCheckResult = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
  
  //     if (emailCheckResult.rows.length === 0) {
  //       // Email does not exist
  //       return  res.status(400).json({ message: 'Invalid email.' });
  //     }
  
  //     // Validate the password
  //     const pwdCheckResult = await pool.query('SELECT email FROM users WHERE email = $1 AND pwd = $2', [email, pwd]);
  
  //     if (pwdCheckResult.rows.length === 0) {
  //       // Password is incorrect
  //        return  res.status(400).json({ message: 'Incorrect password.' });
  //     }
  
  //     // If both email and password are valid
  //     res.json({
  //       message: 'Login successful!',
  //       email: email,
  //     });
  
  //   } catch (err) {
  //     console.log(err.message);
  //     res.status(500).send('Server error');
  //   }
  // });
  
  // LOGIN
  app.post("/login", async (req, res) => {
    try {
      const {email,pwd} = req.body;
      
      // Check if the email exists
      const emailCheckResult = await pool2.query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      
      );
      
      if (emailCheckResult.rows.length === 0) {
        // Email does not exist
        return res.status(400).json({ message: "Invalid email." });
      }
  
      // Validate the password
      const pwdCheckResult = await pool2.query(
        "SELECT id, name, email FROM users WHERE email = $1 AND pwd = $2",
        [email, pwd]
      );
      
      if (pwdCheckResult.rows.length === 0) {
        // Password is incorrect
        return res.status(400).json({ message: "Incorrect password." });
      }
      
      // If both email and password are valid, get the user details
      const user = pwdCheckResult.rows[0];
  
      res.json({
        message: "Login successful!",
        email: user.email,
        id: user.id,
        name: user.name,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });
  
  // deleted
  
  app.delete("/delmenu", async (req, res) => {
    try {
      const { id } = req.body;
      const result = await pool2.query("delete from menu where mid=$1", [id]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server errro");
    }
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
