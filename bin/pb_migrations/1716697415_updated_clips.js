/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ye60db0w",
    "name": "description",
    "type": "text",
    "required": false,
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

  // remove
  collection.schema.removeField("ye60db0w")

  return dao.saveCollection(collection)
})
