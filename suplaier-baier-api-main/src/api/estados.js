var express = require('express');

var router = express.Router();
const app = express();
const connection = '';

/* GET users listing. */
router.get('/', function(req, res, next) {
  const id = req.query.id === undefined ? null : req.query.id;
  const descripcion = req.query.descripcion === undefined ? null : req.query.descripcion;
  req.getConnection((err, conn) =>{
    if(err) return res.send(err);
    conn.query(
      `SELECT * FROM EstadosOferta eo WHERE IdEstadosOferta = COALESCE(${id}, eo.IdEstadosOferta)
      AND Descripcion = COALESCE(${descripcion}, eo.Descripcion)`, 
      (err, rows) => {
        if(err) res.json(err);
        res.json({rows});
    });
  });
});

module.exports = router;