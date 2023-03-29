import { Model } from "objection";

export default class Board extends Model {
  static tableName = "board";

  id;
  title;
  content;
  viewCount;
  likeCount;
  commentCount;
  createdAt;
  deletedAt;
  updatedAt;
  categoryId;
  userId;

  static jsonSchema = {
    type: "object",
    required: [
      "title",
      "content",
      "viewCount",
      "likeCount",
      "commentCount",
      "categoryId",
      "userId",
    ],

    properties: {
      id: { type: "integer" },
      title: { type: "string", minLength: 1, maxLength: 255 },
      content: { type: "string", minLength: 1, maxLength: 10000 },
      viewCount: { type: "integer" },
      likeCount: { type: "integer" },
      commentCount: { type: "integer" },
      createdAt: { type: "string", format: "date-time" },
      deletedAt: { type: ["string", "null"], format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      categoryId: { type: "integer" },
      userId: { type: "integer" },
    },
  };
}
