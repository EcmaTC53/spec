# Class Specifications for Embedded Hardware Components

This repository hosts a collection of ECMAScript class definitions for specific embedded hardware components. An embedded hardware component is a physical device in an embedded system, such as:

 - Microcontrollers
 - Sensors
 - Actuators
 - I/O providers and expanders
 - Displays

The class definition documents in this repository are developed and maintained by [Ecma TC-53](https://www.ecma-international.org/technical-committees/tc53/) committee members, hardware component manufacturers, and the community. These class definitions describe how the Class Patterns and Host Provider specified in ECMA-419, ECMAScript® Embedded Systems API Specification are applied to specific hardware components.

This repository and its relation to [ECMA-419, ECMAScript® Embedded Systems API Specification](https://ecmatc53.github.io/spec/web/spec.html) are formalized in [Ecma TR/109](https://github.com/EcmaTC53/spec/blob/master/docs/Technical%20Reports/hardware-components.md).

## Contributing a Class Specification

It is anticipated that future contributions to this repository will come primarily form hardware component manufacturers and members of the community. TC-53 welcomes these contributions.

The remainder of this document is a guideline on how to create a class specification document and contribute it to this repository.

### Contributor License Agreement

Authors of contributions from non-Ecma member organizations must agree to the [Ecma International Policy on Submission, Inclusion and Licensing of Software](https://www.ecma-international.org/wp-content/uploads/Ecma_Policy_on_Submission_Inclusion_and_Licensing_of_Software.pdf) and must fill in and sign [Exhibit B](https://www.ecma-international.org/wp-content/uploads/Exhibit_B.pdf) of that policy. Please email the completed CLA to [Ecma International](@@ TODO).

### Class Specification Authoring Guidelines

The following guidelines are provided to ensure a consistent format across class definition documents. Documents should be submitted as markdown files.

#### Document Name

Documents are named with the convention `<Component Type>/[<Component Class>-]<Manufacturer>-<Part Name>.md`. When multiple words are needed within an element, use a capital letter for each word (e.g. `LikeThis`).

 - `Component Type`: The ECMA-419, ECMAScript® Embedded Systems API Specification [class pattern](https://ecmatc53.github.io/spec/web/spec.html#-6-overview-class-patterns) to which the documented class conforms. For example, `display` or `io`.
 - `Component Class`: For class patterns that have specific defined classes, such as [Sensor Classes](https://ecmatc53.github.io/spec/web/spec.html#-14-sensor-classes). For example, `AmbientLight` or `Proximity`. If more than one class applies, use internal hyphens (e.g. `AmbientLight-Proximity`). If no defined class is relevant, `Component Class` may be omitted from the name.
 - `Manufacturer`: The manufacturer of the hardware component. For example, `TexasInstruments` or `Microchip`.
 - `Part Name`: The name of the part driven by the documented class. For example, `TMP102` or `ILI9341`. When a class works with multiple components, a wildcard character such as `X` or `N` can be used to indicate multiple components. Where possible, follow the convention used in the manufacturer's data sheet. (E.g. `MCP23X08`).

#### Document Sections

The best place to start on writing a new class specification is by reviewing and copying from existing documents written by TC-53 members. For example:

 - [senors/Temperature-TexasInstruments-TMP102.md](./sensors/Temperature-TexasInstruments-TMP102.md)
 - [displays/ILITEK-ILI9341.md](./displays/ILITEK-ILI9341.md)
 - [providers/Digital-Microchip-MCP23X08.md](./providers/Digital-Microchip-MCP23X08.md)

The sections included in these documents are by convention and help provide a consistent experience between hardware components. They are explained briefly below.

##### Scope

Statement of what ECMAScript class or classes are being documented and the hardware components that they were written to interface with.

##### Conformance

This section should describe what class patterns or specific classes from ECMA-419, ECMAScript® Embedded Systems API Specification the documented class conforms to.

##### Normative References

References to relevant standardized documentation. This section usually includes at least a link to ECMA-419, ECMAScript® Embedded Systems API Specification and to the data sheet of the hardware component.

##### Notational Conventions

Any special notations used in the document that are not standard to conventions used in ECMA-419, ECMAScript® Embedded Systems API Specification.

##### `<Class Name>` <Component Type> Class

This section documents the ECMAScript class implementation.

The first item in this section should be the module specifier used to identify the class, provided in this format, with the elements matching those described in the Document Name section above:

**Module Specifier**: `embedded:<Component Type>/[<Component Class>/]<Class Name>`

The contents of the remainder of this section will vary among hardware component types. Example potential contents include:

 - Pin specifiers for the component
 - Explanations of what ECMA-419, ECMAScript® Embedded Systems API Specification classes or class patterns are implemented or extended by the class
 - Details of choices made in implementing the class, such as additional methods, removed standard methods, etc.
 - Tables of properties of objects used as arguments or return values from methods

### Class Specification Submission

To submit a class specification to this repository, please:

 1. Submit a CLA as described in the Contributor License Agreement section above if you have not already done so.
 2. Fork this repository and create a branch on your fork.
 3. Commit your class specification document to your newly created branch.
 4. Create a pull request with your new commit, following [these instructions from GitHub](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
