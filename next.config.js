module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    config.experiments = {topLevelAwait: true}
    return config;
  }
}
