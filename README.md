# [NestJS](https://nestjs.com/) leaked server [MCVE](https://stackoverflow.com/help/minimal-reproducible-example)

It appears that when listening on multiple ports (like documented in [faq > https & multiple servers > multiple simultaneous servers](https://docs.nestjs.com/faq/multiple-servers#multiple-simultaneous-servers))
calling `.close()` on the `INestApplication` doesn't close the underlying HTTP server, leaking it.

In production workloads this means the server never closes gracefully, so the user is forced to kill it abruptly.
In tests this means an open handle is leaked, causing the shutdown to never complete, making the tests suite never finish proper.

## Instructions

1. Install dependencies by running `yarn install`
2. Run the tests by running `yarn test`
