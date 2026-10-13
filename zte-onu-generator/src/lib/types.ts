export interface ProvisioningParams {
  pppoeUsername: string;
  pppoePassword: string;
  serialNumber: string;
  onuType: string;
  frameSlotPort: string;
  onuId: number;
  svlan: number;
}

export interface GeneratedScripts {
  onuConfig: string;
  onuTypeAdd: string;
  remoteAccess: string;
}
