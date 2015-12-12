module.exports = function(app, pool, STATICS, bodyParser, itemTypes) {
  

  function isValidItemType(itemType) {
    return itemTypes.indexOf(itemType) >= 0;
  }

  function isValidColumnKey(keyName) {
    return keyName === 'name';
  }

  /**
   * API: IS UNIQUE ITEM
   */
  app.post(STATICS.routes.isUniqueItem + "/:itemType", function(req, res) {
    var attrKey = req.body.key,
        attrValue = req.body.value,
        itemType = req.params.itemType;

    if (!isValidColumnKey(attrKey)) {
      res.status(500).send("Invalid key specified in payload.");
      return;
    }

    if (!isValidItemType(itemType)) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    pool.getConnection(function(err, connection) {
      if (err) {
        console.error("ERROR: Connection could not be established.\n");
        res.status(500).send('Could not connect to the database.');
        if (connection) {
          connection.release();
        }
        return;
      }
      // check if unique among the table elements
      connection.query('SELECT * FROM ' + itemType + ' WHERE ' + attrKey + '=?', [attrValue], function(err, rows, fields) {
        if (rows && rows.length) {
          res.status(500).send("ERROR: not unique");
          connection.release();
          return;
        }

        res.send("is unique");
        connection.release();
      });
    });
  });

  /**
   * API: CREATE ITEM
   */
  app.post(STATICS.routes.createItem + "/:itemType", function(req, res) {
    var itemType = req.params.itemType;

    if (!isValidItemType(itemType)) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    pool.getConnection(function(err, connection) {
      if (err) {
        console.error("ERROR: Connection could not be established.\n");
        res.status(500).send('Could not connect to the database.');
        if (connection) {
          connection.release();
        }
        return;
      }


      connection.query('INSERT ....', [itemType, attrKey, attrValue], function(err, rows, fields) {
        if (err) {
          //console.error("ERROR: Could not save approve video form submission:\n" + err.stack);
          if (err.code === "ER_DUP_ENTRY") {
            res.status(500).send("ERROR: not unique");
          }
          else {
            res.status(500).send("Failed to save submission.");
          }
          connection.release();
          return;
        }
      });
    });
  });
};