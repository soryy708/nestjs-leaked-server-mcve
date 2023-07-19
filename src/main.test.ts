import http from "http";
import { AddressInfo } from "net";
import express, { Express } from "express";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Module1 } from "./main.module";

let app: INestApplication;

beforeAll(async () => {
  // https://docs.nestjs.com/faq/multiple-servers#multiple-simultaneous-servers

  const expressServer = express();
  app = await NestFactory.create(Module1, new ExpressAdapter(expressServer));
  await app.init();

  const [port1, port2] = await Promise.all([
    startServerAndGetPort(expressServer),
    startServerAndGetPort(expressServer),
  ]);

  console.log(`Listening on ports: ${port1}, ${port2}`);
});

afterAll(async () => {
  await app.close();
});

function startServerAndGetPort(expressServer: Express): Promise<number> {
  return new Promise((resolve, reject) => {
    const arbitraryUnusedPort = 0;
    const newServer = http
      .createServer(expressServer)
      .listen(arbitraryUnusedPort);

    newServer.on("listening", () => {
      resolve((newServer.address() as AddressInfo).port);
    });
    newServer.on("error", (error) => {
      console.error(error);
      reject(error);
    });
    newServer.on("close", () => console.log("Closing server"));
  });
}

it("", () => {});
