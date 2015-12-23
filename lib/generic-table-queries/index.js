module.exports = function(app, models, STATICS, bodyParser, itemTypes) {
  

  function isValidItemType(itemType) {
    return itemTypes.indexOf(itemType) >= 0;
  }

  function isValidColumnKey(keyName) {
    return keyName === 'name';
  }

  function convertModelKey(keyName) {
    var retString;
    retString = keyName.replace(/\s/g, "_");
    return retString.toLowerCase();
  }

  /**
   * API: IS UNIQUE ITEM
   */
  app.post(STATICS.routes.isUniqueItem + "/:itemType", function(req, res) {
    var attrKey = req.body.key,
        attrValue = req.body.value,
        itemType = req.params.itemType,
        findObj;

    if (!isValidColumnKey(attrKey)) {
      res.status(500).send("Invalid key specified in payload.");
      return;
    }

    if (!isValidItemType(itemType)) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    findObj = {};
    findObj[attrKey] = attrValue;

    models[itemType].findOne(findObj, function (err, document) {
      if (err) {
        console.error("ERROR: Could not find entries:\n" + err);
        res.status(500).send('Could not connect to the database.');
        return;
      }

      if (document) {
        res.status(500).send("ERROR: not unique");
        return;
      }

      res.send("is unique");
    });

    // pool.getConnection(function(err, connection) {
    //   if (err) {
    //     console.error("ERROR: Connection could not be established.\n");
    //     res.status(500).send('Could not connect to the database.');
    //     if (connection) {
    //       connection.release();
    //     }
    //     return;
    //   }
    //   // check if unique among the table elements
    //   connection.query('SELECT * FROM ' + itemType + ' WHERE ' + attrKey + '=?', [attrValue], function(err, rows, fields) {
    //     if (rows && rows.length) {
    //       res.status(500).send("ERROR: not unique");
    //       connection.release();
    //       return;
    //     }

    //     res.send("is unique");
    //     connection.release();
    //   });
    // });
  });

  /**
   * API: CREATE ITEM
   */
  app.post(STATICS.routes.createItem + "/:itemType", function(req, res) {
    var itemType = req.params.itemType,
        input = req.body.input,
        newItem, secondNewItem, findObj, i, modelForm,
        secondEntryModel;

    if (!isValidItemType(itemType)) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    // small check for input
    if (!input || !input.length || !input[0].key) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    //console.log(input);

    modelForm = {};
    // start by parsing the input into model form
    for (i = 0; i < input.length; i++) {
      modelForm[input[i].key] = input[i].value;
    }

    // no name provided
    if (!modelForm.name) {
      res.status(500).send("No name given for entry.");
      return;
    }

    findObj = {};
    findObj["name"] = modelForm.name;
    
    // ensure the item is unique
    models[itemType].findOne(findObj, function (err, document) {
      if (err) {
        console.error("ERROR: Could not find entries:\n" + err);
        res.status(500).send('Could not connect to the database.');
        return;
      }

      if (document) {
        res.status(500).send("Entry not unique.");
        return;
      }

      // item is unique; create the item
      newItem = new models[itemType](modelForm);

      // save item
      newItem.save(function (err, document) {
        if (err) {
          console.error("ERROR: Could not save entry:\n" + err);
          res.status(500).send("Could not save entry.");
          return;
        }

        // if we need to save to an additional table (such as for saving items of different types)
        if (modelForm["primary type"]) {
          secondEntryModel = convertModelKey(modelForm["primary type"]);
          secondNewItem = new models[secondEntryModel](modelForm);
          secondNewItem.save(function (err, document) {
            console.log("Primary type:");
            console.log(document);
            if (err) {
              console.error("ERROR: Could not save entry:\n" + err);
              res.status(500).send("Could not save entry.");
              return;
            }
            res.send("Submission saved.");
          });
        }
        else {
          res.send("Submission saved.");
        }
      });
    });

    // pool.getConnection(function(err, connection) {
    //   if (err) {
    //     console.error("ERROR: Connection could not be established.\n");
    //     res.status(500).send('Could not connect to the database.');
    //     if (connection) {
    //       connection.release();
    //     }
    //     return;
    //   }


    //   connection.query('INSERT ....', [itemType, attrKey, attrValue], function(err, rows, fields) {
    //     if (err) {
    //       //console.error("ERROR: Could not save approve video form submission:\n" + err.stack);
    //       if (err.code === "ER_DUP_ENTRY") {
    //         res.status(500).send("ERROR: not unique");
    //       }
    //       else {
    //         res.status(500).send("Failed to save submission.");
    //       }
    //       connection.release();
    //       return;
    //     }
    //   });
    // });
  });


/**
 * API: DELETE ITEM
 */
app.post(STATICS.routes.deleteItem + "/:itemType", function(req, res) {
  var itemType = req.params.itemType,
      itemName = req.body.itemName,
      newItem, secondNewItem, findObj, i, modelForm,
      secondEntryModel;

  if (!isValidItemType(itemType)) {
    res.status(500).send("Invalid item type specified in URL.");
    return;
  }

  // no name provided
  if (!itemName) {
    res.status(500).send("No item name given for entry.");
    return;
  }

  findObj = {};
  findObj["name"] = itemName;
  
  // ensure the item is unique
  models[itemType].find(findObj).remove().exec(function (err, document) {
    if (err) {
      console.error("ERROR: Could not find entries:\n" + err);
      res.status(500).send('Could not connect to the database.');
      return;
    }
    res.send("Entry deleted.");
  });
});

  /**
   * API: EDIT ITEM
   */
  app.post(STATICS.routes.editItem + "/:itemType", function(req, res) {
    var itemType = req.params.itemType,
        input = req.body.input,
        newItem, secondNewItem, findObj, i, modelForm, originalModelForm,
        secondEntryModel;

    if (!isValidItemType(itemType)) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    // small check for input
    if (!input || !input.length || !input[0].key) {
      res.status(500).send("Invalid item type specified in URL.");
      return;
    }

    modelForm = {};
    originalModelForm = {};
    // start by parsing the input into model form
    for (i = 0; i < input.length; i++) {
      modelForm[input[i].key] = input[i].value;
      originalModelForm[input[i].key] = input[i].originalValue;
    }

    // no name provided
    if (!modelForm.name) {
      res.status(500).send("No name given for entry.");
      return;
    }

    findObj = {};
    findObj["name"] = modelForm.name;
    
    // ensure the item's new name is unique
    models[itemType].findOne(findObj, function (err, document) {
      if (err) {
        console.error("ERROR: Could not find entries:\n" + err);
        res.status(500).send('Could not connect to the database.');
        return;
      }

      // it is not unique if we found an entry and that entry isn't this entry's original entry
      if (document && document.name !== originalModelForm.name) {
        res.status(500).send("Entry not unique.");
        return;
      }

      findObj["name"] = originalModelForm.name;

      // remove the original entry
      models[itemType].find(findObj).remove().exec(function (err, document) {

        // create the new item
        newItem = new models[itemType](modelForm);

        // save item
        newItem.save(function (err, document) {
          if (err) {
            console.error("ERROR: Could not save entry:\n" + err);
            res.status(500).send("Could not save entry.");
            return;
          }

          // if we need to edit an additional table (such as for saving items of different types)
          // if (originalModelForm["primary type"]) {
          //   secondEntryModel = convertModelKey(modelForm["primary type"]);
          //   secondNewItem = new models[secondEntryModel](modelForm);
          //   secondNewItem.save(function (err, document) {
          //     console.log("Primary type:");
          //     console.log(document);
          //     if (err) {
          //       console.error("ERROR: Could not save entry:\n" + err);
          //       res.status(500).send("Could not save entry.");
          //       return;
          //     }
          //     res.send("Submission saved.");
          //   });
          // }
          // else {
          //   res.send("Submission saved.");
          // }

          res.send("Submission saved.");
        });
      });
    });
  });
};