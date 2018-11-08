"use strict";

const redis = require("redis");
const fs = require("fs");

const host = fs.readFileSync("/my-redis-binding/host").toString();
const pass = fs.readFileSync("/my-redis-binding/password").toString();

module.exports = {
  delete: (event, context) =>
    new Promise((resolve, reject) => {
      const client = redis.createClient({
        host,
        password: pass
      });
      client.on("error", function(err) {
        reject("Error " + err);
      });
      client.on("ready", () => {
        client.hget(
          "todos",
          event.extensions.request.query.id,
          (err, reply) => {
            if (err) {
              reject(err);
            } else {
              client.hdel(
                "todos",
                event.extensions.request.query.id,
                (err, rep) => {
                  client.quit();
                  if (err) {
                    reject(err);
                  } else {
                    resolve(reply);
                  }
                }
              );
            }
          }
        );
      });
    })
};
