# Real-Time Clock for Ecma-419
Updated March 28, 2022<br>
Copyright 2022 Moddable Tech Inc.<br>

This document is a defines a class pattern to support Real-Time Clock peripherals.

## Real-Time Clock class pattern

A Real-Time Clock (RTC) provides a time-of-day clock. An RTC is commonly used to initialize time on a microcontroller. An RTC is usually a separate hardware component from the microcontroller. It usually maintains the time using a battery so the time survives power being removed from the device. 

The RTC class pattern conforms to the Peripheral Class Pattern.

### constructor

| Property | Description |
| :---: | :--- |
| `clock` | An object that describes the hardware connection to the RTC. |
| `interrupt` | An object that describes the hardware connection to the RTC's interrupt. This property is optional. |
| `onAlarm()` | A function to invoke when an alarm is triggered by the RTC. This property is optional. |

### `close()`

As defined by the Peripheral Class Pattern.

### `time` property

The current time of the RTC as a standard ECMAScript time value. Set this property to change the current time of the RTC. This value is a `Number`.

The resolution of the RTC component may impact the values. For example, an RTC with one-second resolution returns time values with a milliseconds of zero.

If the time is unavailable (for example, because it has not been set or is otherwise invalid on the RTC), the returned value is `undefined`. 

### `configure(options)`

| Property | Description |
| :---: | :--- |
| `alarm` | The time in milliseconds to set the RTC's alarm. This value is a `Number`. |

### `configuration` property

The `configuration` property returns an object containing the current configuration of the RTC. It contains the `alarm` property, if supported.

The `configuration` property is [introduced](https://419.ecma-international.org/#-17-provenance-sensor-class-pattern-configuration-property) in the Provenance Sensor Class Pattern.

## Notes

The Display Class Pattern `configure` method has a **proposed** approach for get configuration. That is likely obsolete. It should be reviewed and perhaps removed.