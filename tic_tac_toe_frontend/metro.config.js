import { getDefaultConfig } from 'expo/metro-config';

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(new URL('.', import.meta.url).pathname);

// Dev server runs via Metro (react-native start), not Expo CLI, for faster startup and proxy support.
// Proxy: set REACT_NATIVE_PACKAGER_HOSTNAME to your host/proxy; use HTTP_PROXY/HTTPS_PROXY if needed.

// Increase timeout to 2 minutes for slow requests (proxy, slow network, large bundle)
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url && req.url.endsWith('.bundle')) {
        res.setTimeout(120000); // 2 minutes
      }
      return middleware(req, res, next);
    };
  },
};

export default config;
