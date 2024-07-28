import type { WorkerUpdate } from './types';

export default class AnalysisWorkerAdapter {
  // main worker
  private worker: Worker;

  // callbacks
  private onUpdateCallbacks: ((data: WorkerUpdate) => void)[] = [];
  private onErrorCallbacks: ((error: ErrorEvent) => void)[] = [];
  private onFinishedCallbacks: (() => void)[] = [];

  /**
   * A Typescript adapter for the AnalysisWorker.
   */
  constructor() {
    this.worker = new Worker(new URL('./worker.js', import.meta.url));

    this.worker.addEventListener('message', (event) => {
      const data = event.data as WorkerUpdate;
      if (data.data || data.status) {
        // new analysis data received
        this.onUpdateCallbacks.forEach((callback) => {
          callback(data);
        });
        if (data.status?.progress == 1) {
          this.onFinishedCallbacks.forEach((callback) => callback());
        }
      }
    });

    this.worker.addEventListener('error', (event) => {
      // error occured
      this.onErrorCallbacks.forEach((callback) => {
        callback(event);
      });
      // notifying finishing too
      this.onFinishedCallbacks.forEach((callback) => {
        callback();
      });
    });
  }

  /**
   * PUBLIC FUNCTIONS
   */

  /**
   * Invoke a new Analysis worker and pass it an audiochannel to analyze
   * @param audioChannel The processed audio channel to analyze
   */
  invoke(audioChannel: Float32Array) {
    this.worker.postMessage(audioChannel);
  }

  /**
   * Terminate worker
   */
  kill() {
    this.worker.terminate();
  }

  /**
   * Triggered when the worker reports new analysis data.
   * @param callback Callback to notify when data from the worker has been received
   */
  onUpdate(callback: (data: WorkerUpdate) => void) {
    this.onUpdateCallbacks.push(callback);
  }

  /**
   * Triggered when the worker reports an error.
   * @param callback Callback to notify when an error occured
   */
  onError(callback: (error: ErrorEvent) => void) {
    this.onErrorCallbacks.push(callback);
  }

  /**
   * Triggered when the work has been completed, both successful or with an error.
   * @param callback Callback to notify when the worker is done working.
   */
  onFinished(callback: () => void) {
    this.onFinishedCallbacks.push(callback);
  }
}
