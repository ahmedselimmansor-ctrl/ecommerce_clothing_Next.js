import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Configure Redis client with robust connection retry strategy and graceful fallback
const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ||
  new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    retryStrategy(times) {
      if (times > 2) {
        console.warn('⚠️ [Redis] Connection retry limit reached. Operating in memory-fallback mode.');
        return null; // Stop retrying
      }
      return Math.min(times * 200, 1000);
    },
  });

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn(`⚠️ [Redis Cache Miss / Fallback] Failed to get key: ${key}`);
    return null;
  }
}

export async function setCache(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch (error) {
    console.warn(`⚠️ [Redis Cache Fallback] Failed to set key: ${key}`);
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.warn(`⚠️ [Redis Cache Fallback] Failed to invalidate pattern: ${pattern}`);
  }
}
