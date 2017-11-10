FROM camunda/camunda-bpm-platform:tomcat-7.7.0

# Copy third-party Java libraries
COPY docker/tomcat/lib/* lib