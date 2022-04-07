
# Sensor Class for ST VL6180 Ambient Light Sensing and Proximity

## 1 Scope

This document defines the ECMAScript class supporting the VL6180 time-of-flight range finder and ambient light sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Ambient Light and Proximity Sensor Classes of ECMA-4xx, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [ST VL6180 data sheet](https://www.st.com/resource/en/datasheet/vl6180x.pdf)
- [ECMA-4xx, ECMAScript® Embedded Systems API Specification](https://EcmaTC53.github.io/spec/web/spec.html)

## 4 Notational Conventions

## 5 `VL6180` Sensor Class

**Module Specifier**: `embedded:sensor/AmbientLight-Proximity/VL6180`

The `VL6180` Sensor Class extends the `AmbientLight` and `Proximity` Sensor Classes with additional properties on the option objects passed to the `configure` method and returned by the `sample` method.

#### Properties of `constructor` Options Object

The `VL6180` constructor takes an `I2C` class constructor options object. The VL6180 has a default I²C address of `0x29` which will be used for `address` unless otherwise specified.

#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Description |
| :---: | :--- |
| `includeSensorID` | Boolean specifying if `modelID`, `modelRevisionMajor`, `modelRevisionMinor`, `moduleRevisionMajor`, `moduleRevisionMinor`, and `manufacturedOn` properties will be included in the result returned from `sample`. Initial value is `false`.
| `rangingMode` | Number specifying ranging mode. `0` for single shot or `1` for continuous. Initial value is 0. 
| `rangingFrequency` | Number specifying time delay between range measurements in continuous mode. Range 10 ms to 2550 ms. Initial value is 10 ms.
| `averagingSamplePeriod` | Number specifying how many samples to average together for each range read. Range 0 to 255. Initial value is 48.
| `maxConvergenceTime` | Number specifying maximum time to run measurements in ranging modes. Range 1 ms to 63 ms. Initial value is 49 ms.
| `crosstalkCompensationRate` | Number specifying the crosstalk compensation rate in Mcps (9.7 format). Initial value is 0.
| `crosstalkValidHeight` | Number specifying minimum range value in mm to qualify for cross-talk compensation. Initial value is 20 mm.
| `earlyConvergenceEstimate` | Number specifying maximum convergence rate allowed without aborting ranging operation or 0 to disable convergence estimation. Initial value is 0.
| `enableSampleReadyPolling` | Boolean specifying if "sample ready" bit should be set when samples are ready. Initial value is `false`.
| `analogueGain` | Number specifying ALS analog gain. Options are `40`, `20`, `10`, `5`, `2.5`, `1.67`, `1.25`, and `1`. Initial value is 1.
| `alsMode` | Number specifying the ALS mode. `0` for single shot or `1` for continuous. Initial value is 0.
| `alsFrequency` | Number specifying time delay between range measurements in continuous mode. Range 10 ms to 2550 ms. Initial value is 2550 ms. 


### Properties of Sample Object
Samples returned from `VL6180` instances include the `lightmeter` and `proximity` objects defined, respectively, in the `AmbientLight` and `Proximity` Sensor Classes and the following additional properties.

The instance can be configured to provide less information on each sample, as described above.

| Property | Description |
| :---: | :--- |
| `modelID` | The device model identification number, as a number.
| `modelRevisionMajor` | A number indicating the model major revision.
| `modelRevisionMinor` | A number indicating the model minor revision.
| `moduleRevisionMajor` | A number indicating the module major revision.
| `moduleRevisionMinor` | A number indicating the module minor revision.
| `manufacturedOn` | An object with properties `year`, `month`, `day`, `phase`, and `time` (all numbers) that indicate when the module was manufactured.
| `identification` | A number indicating the identification code of the module.

#### Inherited Properties from `AmbientLight` and `Proximity`

| Property | Description |
| :---: | :--- |
| `lightmeter.illuminance` | A number that represents the sampled ambient light level in Lux.
| `proximity.near` | A boolean that indicates if a proximate object is detected.
| `proximity.distance` | A number that represents the distance to the nearest sensed object in centimeters or `null` if no object is detected.
| `proximity.max` | A number that represents the maximum sensing range of the sensor in centimeters.
