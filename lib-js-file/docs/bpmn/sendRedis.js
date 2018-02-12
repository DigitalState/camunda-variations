
load('classpath:jedis-setup.js')

var jedis = new Jedis()
jedis.set("foo", "bar")