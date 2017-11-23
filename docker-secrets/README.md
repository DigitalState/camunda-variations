# Camunda with Docker Secrets Usage (also includes Jsoup)

This deploys Camunda along with a Docker Secrets volume for the my_password.json file.
Allows you to securely access Secrets without storing them in a Camunda Process Variable

https://docs.docker.com/engine/swarm/secrets

https://forum.camunda.org/t/using-secrets-passwords-securely-in-processes-using-docker-secrets-not-storing-passwords-in-process-variables

**WARNING / NOTE**: The my_password.json file is saved in this repository for example purposes only.  DO NOT save your passwords in your SCM/GIT repositories!!!!

Example Script Usage in Camunda.

Javascript:

```javascript
/**
 * Load Passwords Json File and returns a specific password
 *
 * @param string passwordKey The json property key that the password is stored. Currently only single level json is supported.
 * @param string passwordEnvName The Env Variable name that the JSON is stored in using Docker Secrets
 * @return string The password. Assumes that all passwords are strings and therefore returns a string.
 */
function getPassword(passwordKey, passwordEnvName)
{
  with (new JavaImporter(java.lang.System, java.nio.file))
  {
    var passwordPath = System.getenv(passwordEnvName)
    var passwordFileBytes = Files.readAllBytes(Paths.get(passwordPath))
  }

  var String = Java.type('java.lang.String')
  var passwordFileString = new String(passwordFileBytes)

  var passwordJson = JSON.parse(passwordFileString)
  var password = passwordJson[passwordKey]

  return password.toString()
}

var thePassword = getPassword('someKey', 'MY_PASSWORD_FILE')
```