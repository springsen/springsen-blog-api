import { isDevMode } from '../app.environment';

export const logger = () => {
  // 替换 console 为更统一友好的
  const { log, warn, info } = console;
  const color = c => (isDevMode ? c : '');
  Object.assign(global.console, {
    log: (...args) => log('[log]', '[springsen]', ...args),
    warn: (...args) =>
      warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[springsen]', ...args),
    info: (...args) =>
      info(color('\x1b[34m%s\x1b[0m'), '[info]', '[springsen]', ...args),
    error: (...args) =>
      info(color('\x1b[31m%s\x1b[0m'), '[error]', '[springsen]', ...args),
  });
};
