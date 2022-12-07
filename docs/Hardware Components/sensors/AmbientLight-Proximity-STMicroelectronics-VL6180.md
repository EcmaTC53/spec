
# Sensor Class for ST VL6180 Ambient Light Sensing and Proximity

## 1 Scope

This document defines the ECMAScript class supporting the VL6180 time-of-flight range finder and ambient light sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Ambient Light and Proximity Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [ST VL6180 data sheet](https://www.st.com/resource/en/datasheet/vl6180x.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `VL6180` Sensor Class

**Module Specifier**: `embedded:sensor/AmbientLight-Proximity/VL6180`

The `VL6180` Sensor Class extends the `AmbientLight` and `Proximity` Sensor Classes with additional properties on the option objects passed to the `configure` method and returned by the `sample` method.

### Properties of `constructor` Options Object

The `VL6180` constructor takes an `I2C` class constructor options object. The VL6180 has a default I²C address of `0x29` which will be used for `address` unless otherwise specified.

### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Description |
| :---: | :--- |
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
Samples returned from `VL6180` instances include the `lightmeter` and `proximity` objects defined, respectively, in the `AmbientLight` and `Proximity` Sensor Classes.

#### Inherited Properties from `AmbientLight` and `Proximity`

| Property | Description |
| :---: | :--- |
| `lightmeter.illuminance` | A number that represents the sampled ambient light level in Lux.
| `proximity.near` | A boolean that indicates if a proximate object is detected.
| `proximity.distance` | A number that represents the distance to the nearest sensed object in centimeters or `null` if no object is detected.
| `proximity.max` | A number that represents the maximum sensing range of the sensor in centimeters.

### Instance Properties Inherited from the Provenance Sensor Class Pattern

`VL6180` implements the `configuration` and `identification` properties of the Provenance Sensor Class Pattern, including the optional `uniqueID` property of `identification`. 

| Property | Description |
| :---: | :--- |
| `configuration` | Object describing the sensor's current configuration. Properties match the `configure` options object above.
| `identification` | Object that uniquely identifies an individual `VL6180` component.

#### Properties of Identification Object

| Property | Description |
| :---: | :--- |
| `model` | String `"ST VL6180X"`.
| `classification` | String `"AmbientLight-Proximity"`.
| `revision` | Object with 5 Numbers describing the model and module revision: `modelID`, `modelRevMajor`, `modelRevMinor`, `moduleRevMajor`, and `moduleRevMinor`.
| `uniqueID` | A unique identifier for the particular VL6180 hardware, generated from the Identification Date and Time registers on the device.
