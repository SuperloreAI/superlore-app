# Superlore Server

This is the main Superlore app that handles backend and frontend.
It uses the following technologies:

- ✅ NextJS Typescript
- ✅ GraphQL with autogen-types
- ✅ Postgres with autogen-types
- ☑️ Websockets with autogen-types

## Getting Started

Make sure you are using node 16+

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

If you need to reset the database, you can do so by running within the postgres shell:

```
\l                                                # list databases
DROP DATABASE main;                               # drop database
CREATE DATABASE main WITH TEMPLATE template0;     # create database
\c main;                                          # connect to database

# run the init script to create tables
# src/scripts/initializedb.ts

\d                                                # list tables
```

## Setting up ENV variables

To get GCP to work, you will need to:
[related](https://github.com/orgs/vercel/discussions/219#discussioncomment-128702)

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

## Allow CORS on Cloud Bucket

1. Install Google Cloud SDK by following the instructions here: https://cloud.google.com/sdk/docs/install

2. Authenticate with your Google account:

```bash
gcloud auth login
```

3. Set the CORS configuration for your Firebase Storage bucket (replace `your-bucket-name` with your actual bucket name):

```bash
gsutil cors set ./firebase/firebase-storage-cors.json gs://superlore-dev.appspot.com
```

That's it! Now your Firebase Storage bucket allows all CORS requests.

## User Flow MVP

1. Scrollshow of interesting TikToks
2. Sign up for account --> email passwordless
3. Add money to account
4. Video Canvas page with preloaded models
5. LLM asks what kind of video the user wants to make. User responds with prompt.
6. LLM generates scene by scene descriptions for video.
7. User modifies as they wish. Click the "generate" button to turn text-to-video
8. User may also insert a video from their library into the editor

## Video to Video style transfer

1. Upload a video you want to convert
2. Select timeframe crop and add to canvas
3. Add prompt to timecrop and click "generate"

