export type WorkerUpdate = {
  data?: WorkerData;
  status?: {
    progress: number;
    checkpoint: string;
  };
};

export type WorkerData = {
  keyData?: KeyData;
  tempo?: number;
  loudness?: {
    overall: number;
    range: number;
  };
};

export type KeyData = {
  key: string;
  scale: string;
};
