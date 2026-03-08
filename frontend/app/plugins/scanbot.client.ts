import ScanbotSDK from "scanbot-web-sdk";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const scanbotSDK = await ScanbotSDK.initialize({ licenseKey: config.public.scanbotKey, enginePath: "/scanbot-web-sdk" });

  return { provide: { scanbot: scanbotSDK } };
});
