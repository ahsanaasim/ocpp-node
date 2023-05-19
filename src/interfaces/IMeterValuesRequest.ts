export enum ISampledValueContext {
  'Interruption.Begin',
  'Interruption.End',
  'Sample.Clock',
  'Sample.Periodic',
  'Transaction.Begin',
  'Transaction.End',
  'Trigger',
  'Other',
}

export enum ISampledValueFormat {
  Raw = 'Raw',
  SignedData = 'SignedData',
}

export enum ISampledValueMeasurand {
  'Energy.Active.Export.Register',
  'Energy.Active.Import.Register',
  'Energy.Reactive.Export.Register',
  'Energy.Reactive.Import.Register',
  'Energy.Active.Export.Interval',
  'Energy.Active.Import.Interval',
  'Energy.Reactive.Export.Interval',
  'Energy.Reactive.Import.Interval',
  'Power.Active.Export',
  'Power.Active.Import',
  'Power.Offered',
  'Power.Reactive.Export',
  'Power.Reactive.Import',
  'Power.Factor',
  'Current.Import',
  'Current.Export',
  'Current.Offered',
  'Voltage',
  'Frequency',
  'Temperature',
  'SoC',
  'RPM',
}
export enum ISampledValuePhase {
  'L1',
  'L2',
  'L3',
  'N',
  'L1-N',
  'L2-N',
  'L3-N',
  'L1-L2',
  'L2-L3',
  'L3-L1',
}

export enum ISampledValueUnit {
  Wh = 'Wh',
  kWh = 'kWh',
  varh = 'varh',
  kvarh = 'kvarh',
  W = 'W',
  kW = 'kW',
  VA = 'VA',
  kVA = 'kVA',
  var = 'var',
  kvar = 'kvar',
  A = 'A',
  V = 'V',
  K = 'K',
  Celcius = 'Celcius',
  Celsius = 'Celsius',
  Fahrenheit = 'Fahrenheit',
  Percent = 'Percent',
}

export enum ISampledValueLocation {
  Cable = 'Cable',
  EV = 'EV',
  Inlet = 'Inlet',
  Outlet = 'Outlet',
  Body = 'Body',
}

export interface ISampledValue {
  value: string;
  context?: ISampledValueContext;
  format?: ISampledValueFormat;
  measurand?: ISampledValueMeasurand;
  phase?: ISampledValuePhase;
  location?: ISampledValueLocation;
  unit?: ISampledValueUnit;
}

export interface IMeterValue {
  timestamp: string;
  sampledValue: ISampledValue[];
}

export interface IMeterValuesRequest {
  connectorId: number;
  transactionId?: number;
  meterValue: IMeterValue[];
}
