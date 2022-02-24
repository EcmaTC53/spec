# Sensor Class Proposals for Ecma-419
Updated February 23, 2022<br>
Copyright 2022 Moddable Tech Inc.<br>

This document is a draft of additional sensor classes. It is intended to augment [Sensors classes](https://419.ecma-international.org/#-14-sensor-classes) (Section 14) of the first edition of Ecma-419.

### Air Quality Sensor

> To-do: Perhaps break Air Quality Sensor up into a series of single-quantity sensors. So, instead of `AirQualitySensor` with N optional properties for the sample object, have N different sensor classes of the form: `HydrogenSensor` with one property `H`: `A number that represents the sampled hydrogen in parts per million. This property is required.` Then developers would build composite Air Quality Sensors out of those individual pieces.

The `AirQualitySensor` class implements access to a sensor that detects and reports contaminants in the air. The property name `airqualitysensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-airqualitysensor) of the `AirQualitySensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `CH4`| A number that represents the sampled methane in parts per million. This property is optional.
| `CO` | A number that represents the sampled carbon monoxide in parts per million. This property is optional.
| `CO2` | A number that represents the sampled carbon dioxide in parts per million. This property is optional.
| `dust` | A number that represents the sampled dust levels in micrograms per cubic meter. This property is optional.
| `H` | A number that represents the sampled hydrogen in parts per million. This property is optional.
| `H2S` | A number that represents the sampled hydrogen sulfide in parts per million. This property is optional.
| `NO` | A number that represents the sampled nitric oxide in parts per million. This property is optional.
| `NO2` | A number that represents the sampled nitric dioxide in parts per million. This property is optional.
| `O` | A number that represents the sampled oxygen in parts per million. This property is optional.
| `particulateMatter` | A number that represents the sampled particulate matter levels in micrograms per cubic meter. This property is optional.
| `tvoc` | A number that represents the sampled total volatile organic compounds in parts per billion. This property is optional.

> Note: There could be a lot more of these. This is based on Arrow's list of air quality sensors. That is probably an argument from breaking "Air Quality Sensor" up into discrete sensors.

### Barometer

The `Barometer` class implements access to a barometric pressure sensor. The property name `barometer` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-barometer) of the `Barometer` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `pressure` | A number that represents the sampled barometric pressure in Pascal. This property is required.

### Gyroscope

The `Gyroscope` class implements access to a three-dimensional gyroscope. The property name `gyroscope` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-gyroscope) of the `Gyroscope` sensor class.

#### Properties of a sample object
These properties are compatible with the attributes of the same name in the [W3C Gyroscope draft](https://www.w3.org/TR/gyroscope/).

| Property | Description |
| :---: | :--- |
| `x` | A number that represents the sampled angular velocity around the x axis in radian per second. This property is required.
| `y` | A number that represents the sampled angular velocity around the y axis in radian per second. This property is required.
| `z` | A number that represents the sampled angular velocity around the z axis in radian per second. This property is required.

The sign of the sampled angular velocity depends on the rotation direction, with a positive number indicating a clockwise rotation and a negative number indicating a counterclockwise rotation.

### Magnetometer

The `Magnetometer` class implements access to a three-dimensional magnetometer. The property name `magnetometer` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-magnetometer) of the `Magnetometer` sensor class.

#### Properties of a sample object
These properties are compatible with the attributes of the same name in the [W3C Magnetometer draft](https://www.w3.org/TR/magnetometer/).

| Property | Description |
| :---: | :--- |
| `x` | A number that represents the sampled magnetic field around the x axis in microtesla. This property is required.
| `y` | A number that represents the sampled magnetic field around the y axis in microtesla. This property is required.
| `z` | A number that represents the sampled magnetic field around the z axis in microtesla. This property is required.

### Soil Moisture Sensor

The `SoilMoistureSensor` class implements access to a soil moisture sensor. The property name `soilmoisturesensor` is used when part of a compound sensor.

<!-- Is there are better name for this thing? Wikipedia doesn't seem to think so. A hygrometer and a lysimeter are related but distinctly different things. -->

See Annex A for the [formal algorithms](#alg-sensor-soilmoisturesensor) of the `SoilMoistureSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `moisture` | A number between 0 and 1 (inclusive) that represents the sampled relative soil moisture level, with 0 being the most dry and 1 the most wet. This property is required.