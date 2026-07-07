const isTestEnv = () => process.env.NODE_ENV === 'test';

const isDevEnv = () => process.env.NODE_ENV === 'development';

const isProdEnv = () => !isTestEnv() && !isDevEnv();

export { isTestEnv, isDevEnv, isProdEnv };
