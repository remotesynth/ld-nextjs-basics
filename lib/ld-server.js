import LaunchDarkly from "launchdarkly-node-server-sdk";

async function initialize() {
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK);
  await client.waitForInitialization();
  return client;
}

export const client = await initialize();
