import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, 'src')],
  },
  eslint: {
    // Linting stays a separate step (`npm run lint`), same as under Vite, which never gated the build on ESLint.
    // The repo's committed line endings (LF) don't match .prettierrc's `endOfLine: "crlf"`, which would otherwise
    // fail `next build`'s bundled lint pass across the entire pre-existing codebase, not just files this task touched.
    ignoreDuringBuilds: true,
  },
  images: {
    // Keep plain-string asset imports (matches previous Vite behavior: `import x from './x.svg'` is a URL string).
    disableStaticImages: true,
  },
  webpack(config) {
    // `disableStaticImages` drops Next's default raster-image loader entirely.
    // Add back a plain asset loader so `import x from './x.svg' | './x.png' | './x.jpg'` still resolves to a URL string.
    config.module.rules.push({
      test: /\.(svg|png|jpe?g)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};
export default nextConfig;
