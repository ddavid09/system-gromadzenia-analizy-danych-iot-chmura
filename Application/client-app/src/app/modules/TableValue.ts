export interface ITableValuesEnvelope {
  tableValues: ITableValue[];
  valuesCount: number;
  continuationToken: IContinuationToken;
}

export interface ITableValue {
  partitionKey: string;
  rowKey: string;
  humidity: number;
  pressure: number;
  temperature: number;
  sentTimestamp: Date;
  timestamp: Date;
  etag: string;
}

export interface IContinuationToken {
  nextPartitionKey: string | null;
  nextRowKey: string | null;
  nextTableName: string | null;
  targetLocation: number;
}
