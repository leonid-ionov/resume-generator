Object.defineProperty(process, 'env', {
  value: {
    NODE_ENV: 'test',
    VITE_ROUTER_TYPE: 'memory',
  },
});
