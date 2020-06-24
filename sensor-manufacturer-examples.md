### VL6180 extends Proximity

The ST VL6180 is a time-of-flight range finder and proximity sensor. [Datasheet](https://www.st.com/resource/en/datasheet/vl6180x.pdf)

#### Configuration Properties
| Property | Description |
| :---: | :--- |
| `includeSensorID` | A boolean specifying if `modelID`, `modelRevisionMajor`, `modelRevisionMinor`, `moduleRevisionMajor`, `moduleRevisionMinor`, and `manufacturedOn` properties will be included in the result returned from `sample`. Default at initialization is false.
| `rangingMode` | Number specifying ranging mode. `0` for single shot or `1` for continuous. Default is 0.  
| `frequency` | Number specifying time delay between measurements in continuous mode. Range 10 ms - 2550 ms. Default is 10 ms.
| `maxConvergenceTime` | Number specifying maximum time to run measurements in ranging modes. Range 1 ms - 63 ms. Default is 49ms.
| `crosstalkCompensationRate` | Number specifying the crosstalk compensation rate in Mcps (9.7 format). Default is 0.
| `crosstalkValidHeight` | Number specifying minimum range value in mm to qualify for cross-talk compensation. Default is 20 mm.
| `earlyConvergenceEstimate` | Number specifying maximum convergence rate allowed without aborting ranging operation or 0 to disable convergence estimation. Default is 0.
| `enableSampleReadyPolling` | Boolean specifying if "sample ready" bit should be set when samples are ready. Default is false.
| `analogueGain` | Number specifying ALS analog gain. Options are `40`, `20`, `10`, `5`, `2.5`, `1.67`, `1.25`, and `1.0`. Default is 1.0. 


### Sample Properties
VL6180 extends the Proximity sample object to include the following properties. The VL6180 instance can also be configured to provide less information on each sample, as described above.
| Property | Description |
| :---: | :--- |
| `modelID` | The device model identification number, as a number.
| `modelRevisionMajor` | A number indicating the model major revision.
| `modelRevisionMinor` | A number indicating the model minor revision.
| `moduleRevisionMajor` | A number indicating the module major revision.
| `moduleRevisionMinor` | A number indicating the module minor revision.
| `manufacturedOn` | An object with properties `year`, `month`, `day`, `phase`, and `time` (all numbers) that indicate when the module was manufactured.