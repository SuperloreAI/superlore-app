# Superlore Server

This is the main Superlore app that handles backend and frontend.
It uses the following technologies:

- ✅ NextJS Typescript
- ✅ GraphQL with autogen-types
- ✅ Postgres with autogen-types
- ☑️ Websockets with autogen-types

## Getting Started

```bash
$ npm install
$ npm run dev
```

When you run `$ npm run generate`, it will require you to modify the files generated at `src/lib/graphql/types/demo/resolvers/Query`. Re-running `npm run generate` has no 

## Seeding Database

1. First connect to Postgres using [Google Cloud Shell](https://console.cloud.google.com/sql/instances/core-db-dev/overview?project=superlore-demo&cloudshell=true).

2. Then [setup Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/baseline-your-database-typescript-postgres) database types.

```bash
$ npx prisma
$ npx prisma init
$ npx prisma db pull
$ mkdir -p prisma/migrations/0_init
$ npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
$ npx prisma migrate resolve --applied 0_init
$ npx prisma generate
```