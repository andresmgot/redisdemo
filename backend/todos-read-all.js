"use strict";

const redis = require("redis");
const fs = require("fs");

const host = fs.readFileSync("/my-redis-binding/host").toString();
const pass = fs.readFileSync("/my-redis-binding/password").toString();
const port = fs.readFileSync("/my-redis-binding/port").toString();

module.exports = {
  readAll: (event, context) =>
    new Promise((resolve, reject) => {
      const client = redis.createClient({
        host,
        password: pass,
        port
      });
      client.on("error", function(err) {
        reject("Error " + err);
      });
      client.on("ready", () => {
        client.hvals("todos", (err, rep) => {
          client.quit();
          if (err) {
            reject(err);
          }
          resolve(rep.map(e => JSON.parse(e)));
        });
      });
    })
};
