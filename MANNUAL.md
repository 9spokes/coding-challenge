# Environment & Dependencies

```
% javac -version
javac 1.8.0_202
```
```
% mvn --version
Apache Maven 3.6.0 (97c98ec64a1fdfee7767ce5ffb20918da4f719f3; 2018-10-25T07:41:47+13:00)
Maven home: /usr/local/apache-maven-3.6.0
Java version: 1.8.0_202, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_202.jdk/Contents/Home/jre
Default locale: en_AU, platform encoding: UTF-8
OS name: "mac os x", version: "10.16", arch: "x86_64", family: "mac"
```

# Build
Run command below, all unit tests will be triggered in building process. To skip the unit tests, simply add -Dmaven.test.skip=true at the end of the command.
```
% mvn clean package
```
The final jar locates in target folder with a default name code-challenge-1.0-SNAPSHOT.jar, if you want to have a customised name, please modify this part in pom.xml (currently commented in pom.xml), all dependency libs will be copied to target/libs folder
```
<build>
  <finalName>change_it_to_another_name_you_preferred</finalName>
  ......
</build>
```

# Run

Run command below. If you'd like to copy the code-challenge-1.0-SNAPSHOT.jar to another folder from target, please make sure the dependency libs folder is copied and existing in the same path as the jar file as well.
```
% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path=xxx
```

--json_path argument supports 2 types of input

- file://xxxxxx, where xxxxxx is the file path in file system, this is also the default option if no URL schema prefix specified
- classpath://xxxxxx, where xxxxxx is the file path in the classpath
- the default data.json will be used if no --json_path specified. This could be changed if necessary.

# Output

Result as per requirement is print in stdout. All error/info/warning unrelated but could be useful for trouble shooting are print in stderr with logback log. You may customise it if you wish to print it in a different format.
```
% java -jar code-challenge-1.0-SNAPSHOT.jar
Revenue: $32,431
Expenses: $36,529
Gross Profit Margin: 0.0%
Net Profit Margin: -12.6%
Working Capital Ratio: 118.8%

% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path=file://../src/main/resources/data.json
Revenue: $32,431
Expenses: $36,529
Gross Profit Margin: 0.0%
Net Profit Margin: -12.6%
Working Capital Ratio: 118.8%

% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path=../src/main/resources/data.json
Revenue: $32,431
Expenses: $36,529
Gross Profit Margin: 0.0%
Net Profit Margin: -12.6%
Working Capital Ratio: 118.8%

% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path=/tmp/ddd.json                                            
Revenue: $32,431
Expenses: $36,529
Gross Profit Margin: 0.0%
Net Profit Margin: -12.6%
Working Capital Ratio: 118.8%

% java -jar code-challenge-1.0-SNAPSHOT.jar --json       
2022-04-27 10:47:33 WARN  [main] com.ninespokes.challenge.Main-21: Exception while parsing args, Invalid argument: --json
com.ninespokes.challenge.exception.InvalidValueException: Invalid argument: --json
	at com.ninespokes.challenge.settings.SettingsParser.parse(SettingsParser.java:30)
	at com.ninespokes.challenge.Main.main(Main.java:19)
	
% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path
2022-04-27 10:46:35 WARN  [main] com.ninespokes.challenge.Main-21: Exception while parsing args, Invalid argument: --json_path
com.ninespokes.challenge.exception.InvalidValueException: Invalid argument: --json_path
	at com.ninespokes.challenge.settings.SettingsParser.parse(SettingsParser.java:30)
	at com.ninespokes.challenge.Main.main(Main.java:19)

% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path=
2022-04-27 10:46:42 ERROR [main] c.n.challenge.ledger.LedgerReader-35: Unable to read resource from specified resource ()
2022-04-27 10:46:42 WARN  [main] com.ninespokes.challenge.Main-32: Exception while reading JSON, Unable to read resource from specified resource: 
com.ninespokes.challenge.exception.InvalidValueException: Unable to read resource from specified resource: 
	at com.ninespokes.challenge.ledger.LedgerReader.read(LedgerReader.java:36)
	at com.ninespokes.challenge.Main.main(Main.java:30)

% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path=invalid
2022-04-27 10:46:53 ERROR [main] c.n.challenge.ledger.LedgerReader-35: Unable to read resource from specified resource (invalid)
2022-04-27 10:46:53 WARN  [main] com.ninespokes.challenge.Main-32: Exception while reading JSON, Unable to read resource from specified resource: invalid
com.ninespokes.challenge.exception.InvalidValueException: Unable to read resource from specified resource: invalid
	at com.ninespokes.challenge.ledger.LedgerReader.read(LedgerReader.java:36)
	at com.ninespokes.challenge.Main.main(Main.java:30)
```

# Potentials
- More URL schemas in --json_path argument could be supported to satisfy more use cases. Just add the schema into ResourceSchema and write the corresponding resource reading logic in PathUtil. e.g. I've added http & https and marked them as unsupported. if you pass in --json_path==https://xxxxxx, you'll experience a different error message like below
```
% java -jar code-challenge-1.0-SNAPSHOT.jar --json_path=https://ffdafd                       
2022-04-27 10:08:47 INFO  [main] c.ninespokes.challenge.util.PathUtil-43: URL schema https:// has not been supported yet
2022-04-27 10:08:47 ERROR [main] c.n.challenge.ledger.LedgerReader-35: Unable to read resource from specified resource (https://ffdafd)
2022-04-27 10:08:47 WARN  [main] com.ninespokes.challenge.Main-32: Exception while reading JSON, Unable to read resource from specified resource: https://ffdafd
com.ninespokes.challenge.exception.InvalidValueException: Unable to read resource from specified resource: https://ffdafd
	at com.ninespokes.challenge.ledger.LedgerReader.read(LedgerReader.java:36)
	at com.ninespokes.challenge.Main.main(Main.java:30)
```
- Using annotation with options so that currency/percentage format factors could be controlled dynamically and easily, e.g.
  1. number of decimal to scale;
  2. fix number of decimal or truncate the 0s at the end;
  3. round type;
  4. special round type for negative values;
  5. customised currency symbols, e,g, $, ¥, €, £,...;
  6. customised percentage symbols ‰ or ‱ or whatever customised symbols;
  7. customised coefficient to match the customised percentage symbols

There are some examples in LedgerAnnotationTest.

__Enjoy!__