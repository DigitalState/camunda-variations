# Accessing JS file from Lib folder in Java

Using Nashorn's `load()` function

https://wiki.openjdk.java.net/display/Nashorn/Nashorn+extensions

```javascript
load('classpath:jedis-setup.js')

var jedis = new Jedis()
jedis.set("foo", "bar")
```