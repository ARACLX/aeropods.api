# `@aeropod/api`

Package that holds an `express`-based Node.js application.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

### Prerequisites

```
#!/bin/bash
Node@v13.x.x
```

### Installing

A step by step series that will tell you how to get a development env running.

```
#!/bin/bash
$ git clone https://github.com/ARACLX/aeropods.git
$ cd aeropods/packages/api
```

### Scripts

| Command  | Description                                                                     |
| :------- | :------------------------------------------------------------------------------ |
| yarn dev | Starts a development server which have included automatic reolading by changes. |

### Reqiurements

- [ ] Application should have protected routes in RBAC model powered by OAuth or
      JWT as a authorization method.
- [ ] Users should be able to create their accounts.
- [ ] Users should be able to login into their account to have access to
      additional features of application.
- [ ] Users should have a two layers of permission, one for free users and one
      for paid users in SaaS model.
- [ ] Users should be able to modify their profiles, and remove their account.
- [ ] Administrators should be able to do everything.
- [ ] Application should have implemented caching build on Redis.
- [ ] Application should use a TypeORM with Cockroach by default, but should
      have also implemented MongoDB and PostgreSQL based on Mongoose and Prisma.
