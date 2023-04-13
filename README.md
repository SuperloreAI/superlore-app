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

## Setting up ENV variables

To get GCP to work, you will need to:

```js
const GCP_service_account_key = {
  "type": "service_account",
  "project_id": "superlore-demo",
  "private_key_id": "______",
  "private_key": "-----BEGIN PRIVATE KEY-----_______\n-----END PRIVATE KEY-----\n",
  "client_email": "_____@superlore-demo.iam.gserviceaccount.com",
  "client_id": "_______",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/_______%40superlore-demo.iam.gserviceaccount.com"
}
const base64EncodedKey = btoa(JSON.stringify(GCP_service_account_key))
```

Now save `base64EncodedKey` into your `.ENV` file like so:

```.env
GCP_KEYFILE_BASE64=eyJ0eXBlIjoi....291bnQuY29tIn0=
```

To get this available in Vercel deployment, manually copy the env variables into the deployment tab `Project > Settings > Environment Variables`

Be sure to also add `NPM_TOKEN` as an env variable in Vercel. The token is found locally at `.npmrc`