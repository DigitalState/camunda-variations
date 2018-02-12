function Jedis(){
  var Jedis = Java.type('redis.clients.jedis.Jedis')
  var jedis = new Jedis("redisdb")
  return jedis
}