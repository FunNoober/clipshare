/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vc1kd4wr",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp")

  // remove
  collection.schema.removeField("vc1kd4wr")

  return dao.saveCollection(collection)
})
