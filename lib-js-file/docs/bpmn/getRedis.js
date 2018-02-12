var Jedis = Java.type('redis.clients.jedis.Jedis')
var jedis = new Jedis("redisdb")
var value = jedis.get("foo");
execution.setVariable('myRedisValue', value)
