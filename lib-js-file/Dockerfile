FROM camunda/camunda-bpm-platform:tomcat-7.8.0

# add custom configurations
COPY docker/camunda/conf/ /camunda/conf

# Copy third-party Java libraries
COPY docker/camunda/lib/jedis-2.9.0.jar /camunda/lib/jedis-2.9.0.jar
COPY docker/camunda/lib/jedis-setup.js /camunda/lib/jedis-setup.js