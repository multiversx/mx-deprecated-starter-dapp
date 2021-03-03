export class NodeType {
  blsKey!: string;
  status!: { [key: string]: string };
  queueIndex?: string;
  queueSize?: string;
  public constructor(
    blsKey: string,
    status: { [key: string]: string },
    queueIndex?: string,
    queueSize?: string
  ) {
    this.blsKey = blsKey;
    this.status = status;
    this.queueIndex = queueIndex;
    this.queueSize = queueSize;
  }
}
