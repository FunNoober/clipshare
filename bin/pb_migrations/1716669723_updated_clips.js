/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp")

  collection.createRule = "uploadToken = \"NMV3JSPY0kUVj96RGCVW7hXfD0h9TJjL\""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l4hvfgcs",
    "name": "uploadToken",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp")

  collection.createRule = ""

  // remove
  collection.schema.removeField("l4hvfgcs")

  return dao.saveCollection(collection)
})
