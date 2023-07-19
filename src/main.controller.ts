import { Controller, Get } from "@nestjs/common";

@Controller()
export class Controller1 {
  @Get() public get(): string {
    return "success";
  }
}
