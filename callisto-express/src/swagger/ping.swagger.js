/**
 * @swagger
 * /:
 *  get:
 *    summary: health check
 *    description: server health check
 *    tags: [healthCheck]
 *    requestBody:
 *      required: false
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          text:
 *            schema:
 *              type: string
 *              example: "OK"
 */
