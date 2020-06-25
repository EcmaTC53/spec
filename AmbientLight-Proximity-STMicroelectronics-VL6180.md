
# Sensor Class for ST VL6180 Ambient Light Sensing and Proximity

## 1 Scope

This document defines the ECMAScript class supporting the VL6180 time-of-flight range finder and ambient light sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Ambient Light and Proximity Sensor Classes of ECMAScript® Modules for Embedded Systems, ECMA-xxx.

## 3 Normative References

- [ST VL6180 data sheet](https://www.st.com/resource/en/datasheet/vl6180x.pdf)
- [ECMAScript® Modules for Embedded Systems](https://phoddie.github.io/tc53temp)

## 4 Notational Conventions

## 5 `VL6180` Sensor Class

The `VL6180` Sensor Class extends the `AmbientLight` and `Proximity` Sensor Classes with additional properties on the option objects passed to the `configure` method and returned by the `sample` method. 

#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Description |
| :---: | :--- |
| `includeSensorID` | Boolean specifying if `modelID`, `modelRevisionMajor`, `modelRevisionMinor`, `moduleRevisionMajor`, `moduleRevisionMinor`, and `manufacturedOn` properties will be included in the result returned from `sample`. Default![]() is `false`.
| `rangingMode` | Number specifying ranging mode. `0` for single shot or `1` for continuous. Default is 0.  
| `rangingFrequency` | Number specifying time delay between range measurements in continuous mode. Range 10 ms to 2550 ms. Default is 10 ms.
| `averagingSamplePeriod` | Number specifying how many samples to average together for each range read. Range 0 to 255. Default is 48.
| `maxConvergenceTime` | Number specifying maximum time to run measurements in ranging modes. Range 1 ms to 63 ms. Default is 49 ms.
| `crosstalkCompensationRate` | Number specifying the crosstalk compensation rate in Mcps (9.7 format). Default is 0.
| `crosstalkValidHeight` | Number specifying minimum range value in mm to qualify for cross-talk compensation. Default is 20 mm.
| `earlyConvergenceEstimate` | Number specifying maximum convergence rate allowed without aborting ranging operation or 0 to disable convergence estimation. Default is 0.
| `enableSampleReadyPolling` | Boolean specifying if "sample ready" bit should be set when samples are ready. Default is `false`.
| `analogueGain` | Number specifying ALS analog gain. Options are `40`, `20`, `10`, `5`, `2.5`, `1.67`, `1.25`, and `1`. Default is 1.
| `alsMode` | Number specifying the ALS mode. `0` for single shot or `1` for continuous. Default is 0.
| `alsFrequency` | Number specifying time delay between range measurements in continuous mode. Range 10 ms to 2550 ms. Default is 2550 ms. 


### Properties of Sample Object
`VL6180` extends the `AmbientLight` and `Proximity` sample objects to include the following properties.

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