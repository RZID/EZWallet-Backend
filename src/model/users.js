const connection = require("../config/db");

module.exports = {
  mLogin: () => {
    return;
  },
  mCheckEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  mRegister: (dataUser) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO users SET ?`, dataUser, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  mDetailUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  mUpdateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE users SET ? WHERE id=?`,
        [data, id],
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  mAllUser: (id, searchParams, search, param, sort, offset, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users
            WHERE id != ${id} AND 
            ${searchParams} LIKE '%${search}%' ORDER BY ${param} ${sort}
            LIMIT ${offset}, ${limit} `,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  mTotal: (id, searchParams, search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) as total FROM users WHERE id != ${id} AND ${searchParams} LIKE '%${search}%'`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  createActivationToken: (token, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO activation (email,token) VALUES (?,?)`,
        [email, token],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getActivation: (token, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT id FROM activation WHERE email = ? AND token = ?`,
        [email, token],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  deleteActivation: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM activation WHERE id = ?`,
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  setActiveUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE users SET is_active = ? WHERE email = ?`,
        [1, email],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};
