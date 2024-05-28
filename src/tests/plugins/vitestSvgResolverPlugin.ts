import { PluginOption } from 'vite';
import { isTestEnv } from '../utils/testHelpers.ts';

const vitestSvgResolverPlugin = (): PluginOption => ({
  name: 'vitest-svg-resolver',
  enforce: 'pre',
  load(id) {
    if (id.endsWith('.svg') && isTestEnv()) {
      return `export default "";`;
    }
  },
});

export default vitestSvgResolverPlugin;
