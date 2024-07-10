/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "sqodz1stumh68zp",
    "created": "2024-05-25 18:10:24.859Z",
    "updated": "2024-05-25 18:10:24.859Z",
    "name": "clips",
    "type": "base",
    "system": false,
    "schema": [
      {
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
          "maxSize": 150000000,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "rrhsuy7n",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sqodz1stumh68zp");

  return dao.deleteCollection(collection);
})
