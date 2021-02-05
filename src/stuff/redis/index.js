import redis from 'redis';
import { promisify } from 'util';

import { redisConnect } from '../../../config/redis';

class RedisService {
  constructor() {
    this.client = redis.createClient(redisConnect);
  }

  async aexists(key) {
    return promisify(this.client.exists).apply(this.client, [key]);
  }

  async aset(key, value) {
    return promisify(this.client.set).apply(this.client, [key, value]);
  }

  async asetnx(key, value) {
    return promisify(this.client.setnx).apply(this.client, [key, value]);
  }

  async aget(key) {
    return promisify(this.client.get).apply(this.client, [key]);
  }

  async amget(key) {
    return promisify(this.client.mget).apply(this.client, [key]);
  }

  async adel(key) {
    return promisify(this.client.del).apply(this.client, [key]);
  }

  async ahset(key, field, value) {
    return promisify(this.client.hset).apply(this.client, [key, field, value]);
  }

  async ahget(key, field) {
    return promisify(this.client.hget).apply(this.client, [key, field]);
  }

  async ahdel(key, field) {
    return promisify(this.client.hdel).apply(this.client, [key, field]);
  }

  async ahgetall(key) {
    return promisify(this.client.hgetall).apply(this.client, [key]);
  }

  async ahvals(key) {
    return promisify(this.client.hvals).apply(this.client, [key]);
  }

  async ahexists(key, field) {
    return promisify(this.client.hexists).apply(this.client, [key, field]);
  }

  async ahmset(key, value) {
    return promisify(this.client.hmset).apply(this.client, [key, value]);
  }

  async aexpire(key, expire) {
    return promisify(this.client.expire).apply(this.client, [key, expire]);
  }

  akeys(template) {
    return promisify(this.client.keys).apply(this.client, [template]);
  }

  ascan(cursor, template, count = '10') {
    return promisify(this.client.scan).apply(this.client, [cursor, 'MATCH', template, 'COUNT', count]);
  }

  async asadd(key, value) {
    return promisify(this.client.sadd).apply(this.client, [key, value]);
  }

  async asrem(key, value) {
    return promisify(this.client.srem).apply(this.client, [key, value]);
  }

  async asmembers(key) {
    return promisify(this.client.smembers).apply(this.client, [key]);
  }

  async attl(key) {
    return promisify(this.client.ttl).apply(this.client, [key]);
  }

  async apersist(key, unique) {
    return promisify(this.client.persist).apply(this.client, [key]);
  }

  async arpush(key, data) {
    return promisify(this.client.rpush).apply(this.client, [key, data]);
  }

  async alrange(key, start, stop) {
    return promisify(this.client.lrange).apply(this.client, [key, start, stop]);
  }

  async alpop(key) {
    return promisify(this.client.lpop).apply(this.client, [key]);
  }
}

export default new RedisService();


