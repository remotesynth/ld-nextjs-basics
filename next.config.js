module.exports = {
  reactStrictMode: true,
  env: {
    LAUNCHDARKLY_SDK_CLIENT: process.env.LAUNCHDARKLY_SDK_CLIENT,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};
