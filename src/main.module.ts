import { Module } from "@nestjs/common";
import { Controller1 } from "./main.controller";

@Module({ controllers: [Controller1] })
export class Module1 {}
