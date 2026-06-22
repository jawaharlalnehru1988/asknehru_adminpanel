/**
 * Simple in-memory cache store for the admin panel.
 * Data is retained for the lifetime of the browser tab (survives React re-renders & view switches).
 * The cache is invalidated explicitly after mutations (create / update / delete).
 */
const cache = {};

export const getCache = (key) => cache[key] ?? null;

export const setCache = (key, data) => { cache[key] = data; };

export const invalidateCache = (key) => { delete cache[key]; };
