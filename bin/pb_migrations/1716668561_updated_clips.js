/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xdlyerla",
    "name": "video",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "video/mp4",
        "video/webm",
        "video/x-matroska"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 350000000,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xdlyerla",
    "name": "video",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "video/mp4",
        "video/webm",
        "video/x-matroska"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 350000000,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
