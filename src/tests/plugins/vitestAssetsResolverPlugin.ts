import { PluginOption } from 'vite';
import { isTestEnv } from '../utils/testHelpers.ts';

const vitestAssetsResolverPlugin = (): PluginOption => ({
  name: 'vitest-svg-resolver',
  enforce: 'pre',
  load(id) {
    if ((id.endsWith('.svg') || id.endsWith('.png') || id.endsWith('.jpg')) && isTestEnv()) {
      return `export default "";`;
    }
  },
});

export default vitestAssetsResolverPlugin;
