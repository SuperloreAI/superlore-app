import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { projectId, postgresDevSecret } from "@/lib/constants";

async function accessSecretVersion(
  projectId: string,
  secretId: string,
  versionId: string
): Promise<string> {
  // path to repo working directory
  const repoWorkingDir = process.cwd();
  const pathToKeyFile = `${repoWorkingDir}/serviceAccountKey.json`;
  console.log(`path to key file = ${pathToKeyFile}`);
  const client = new SecretManagerServiceClient({
    // path to service account keyfile
    keyFilename: pathToKeyFile,
  });
  const name = `projects/${projectId}/secrets/${secretId}/versions/${versionId}`;
  const [response] = await client.accessSecretVersion({ name });
  const secretValue = response.payload?.data?.toString();
  if (!secretValue) {
    throw Error("No secret value found");
  }
  return secretValue;
}

export type SecretKey = string;

export const getPostgresPassword = (): Promise<SecretKey> => {
  // Get the secret value
  return accessSecretVersion(
    projectId,
    postgresDevSecret.secretId,
    postgresDevSecret.versionId
  ) as Promise<SecretKey>;
  // .then((secretValue) => {
  //   console.log(`Secret value: ${secretValue}`);
  // })
  // .catch((error) => {
  //   console.error(`Error accessing secret: ${error}`);
  // });
};
