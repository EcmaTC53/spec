# Sensor Class Proposals for Ecma-419
Updated March 11, 2022<br>
Copyright 2022 Moddable Tech Inc.<br>

This document is a draft of additional sensor classes. It is intended to augment [Sensors classes](https://419.ecma-international.org/#-14-sensor-classes) (Section 14) of the first edition of Ecma-419.

### Barometer

The `Barometer` class implements access to a barometric pressure sensor. The property name `barometer` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-barometer) of the `Barometer` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `pressure` | A number that represents the sampled barometric pressure in Pascal. This property is required.

### Carbon Dioxide Gas Sensor

The `CarbonDioxideGasSensor` class implements access to a sensor that detects the amount of carbon dioxide in air. The property name `carbonDioxideGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-carbonDioxideGasSensor) of the `CarbonDioxideGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `CO2` | A number that represents the sampled carbon dioxide in parts per million. This property is required.

### Carbon Monoxide Gas Sensor

The `CarbonMonoxideGasSensor` class implements access to a sensor that detects the amount of carbon monoxide in air. The property name `carbonMonoxideGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-carbonMonoxideGasSensor) of the `CarbonMonoxideGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `CO` | A number that represents the sampled carbon monoxide in parts per million. This property is required.

### Dust Sensor

The `DustSensor` class implements access to a sensor that detects the amount of dust suspended in air. The property name `dustSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-dustSensor) of the `DustSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `dust` | A number that represents the sampled dust levels in micrograms per cubic meter. This property is required.

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

### Hydrogen Gas Sensor

The `HydrogenGasSensor` class implements access to a sensor that detects the amount of hydrogen in air. The property name `hydrogenGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-hydrogenGasSensor) of the `HydrogenGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `H` | A number that represents the sampled hydrogen in parts per million. This property is required.

### Hydrogen Sulfide Gas Sensor

The `HydrogenSulfideGasSensor` class implements access to a sensor that detects the amount of hydrogen sulfide in air. The property name `hydrogenSulfideGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-hydrogenSulfideGasSensor) of the `HydrogenSulfideGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `H2S` | A number that represents the sampled hydrogen sulfide in parts per million. This property is required.

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

### Methane Gas Sensor

The `MethaneGasSensor` class implements access to a sensor that detects the amount of methane in air. The property name `methaneGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-methaneGasSensor) of the `MethaneGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `CH4`| A number that represents the sampled methane in parts per million. This property is required.

### Nitric Oxide Gas Sensor

The `NitricOxideGasSensor` class implements access to a sensor that detects the amount of nitric oxide in air. The property name `nitricOxideGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-nitricOxideGasSensor) of the `NitricOxideGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `NO` | A number that represents the sampled nitric oxide in parts per million. This property is required.

### Nitric Dioxide Gas Sensor

The `NitricDioxideGasSensor` class implements access to a sensor that detects the amount of nitric dioxide in air. The property name `nitricDioxideGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-nitricDioxideGasSensor) of the `NitricDioxideGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `NO2` | A number that represents the sampled nitric dioxide in parts per million. This property is required.

### Oxygen Gas Sensor

The `OxygenGasSensor` class implements access to a sensor that detects the amount of oxygen in air. The property name `oxygenGasSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-oxygenGasSensor) of the `OxygenGasSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `O` | A number that represents the sampled oxygen in parts per million. This property is required.

### Particulate Matter Sensor

The `ParticulateMatterSensor` class implements access to a sensor that detects the amount of particulate matter suspended in air. The property name `particulateMatterSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-particulateMatterSensor) of the `ParticulateMatterSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `particulateMatter` | A number that represents the sampled particulate matter levels in micrograms per cubic meter. This property is required.

### Soil Moisture Sensor

The `SoilMoistureSensor` class implements access to a soil moisture sensor. The property name `soilmoisturesensor` is used when part of a compound sensor.

<!-- Is there are better name for this thing? Wikipedia doesn't seem to think so. A hygrometer and a lysimeter are related but distinctly different things. -->

See Annex A for the [formal algorithms](#alg-sensor-soilmoisturesensor) of the `SoilMoistureSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `moisture` | A number between 0 and 1 (inclusive) that represents the sampled relative soil moisture level, with 0 being the most dry and 1 the most wet. This property is required.

### VOC Sensor

The `VOCSensor` class implements access to a sensor that detects the amount of volatile organic compounds suspended in air. The property name `vocSensor` is used when part of a compound sensor.

See Annex A for the [formal algorithms](#alg-sensor-vocSensor) of the `VOCSensor` sensor class.

#### Properties of a sample object

| Property | Description |
| :---: | :--- |
| `tvoc` | A number that represents the sampled total volatile organic compounds in parts per billion. This property is required.
