enum RouterTypes {
  BROWSER = 'browser',
  MEMORY = 'memory',
  HASH = 'hash',
}

const routerEnvironmentMap: Record<string, RouterTypes> = {
  development: RouterTypes.BROWSER,
  production: RouterTypes.BROWSER,
  test: RouterTypes.MEMORY,
  'github-pages': RouterTypes.HASH,
};

const baseUrlMap: Record<string, string> = {
  development: '/',
  production: '/',
  'github-pages': '/resume-generator/',
};

export { routerEnvironmentMap, baseUrlMap, RouterTypes };
