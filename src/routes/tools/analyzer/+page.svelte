<script lang="ts">
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import DataCard from './_components/data-card.svelte';
  import FileUploadInput from './_components/file-upload-input.svelte';
  import type { WorkerData } from './_lib/types';
  import { getProcessedAudio } from './_lib/utils';
  import AnalysisWorkerAdapter from './_lib/worker-adapter';

  let file: File | undefined;
  let workerData: WorkerData | undefined;

  let workerIsLoading = false;
  let workerStatus = '';
  let workerProgress = 0;

  function onFileSubmitted({ detail: submittedFile }: CustomEvent<File>) {
    file = submittedFile;

    // reset
    workerData = undefined;

    const audioContext = new AudioContext();
    const workerAdapter = new AnalysisWorkerAdapter();

    workerAdapter.onUpdate((update) => {
      if (update.data) {
        workerData = { ...update.data, ...workerData };
      }
      if (update.status) {
        workerStatus = update.status.checkpoint;
        workerProgress = update.status.progress;
      }
    });

    workerAdapter.onError((error) => {
      console.log(error);
      workerIsLoading = false;
      workerProgress = 0;
    });

    workerAdapter.onFinished(() => {
      workerIsLoading = false;
      setTimeout(() => {
        workerProgress = 0;
      }, 2000);
    });

    // process audio and invoke worker
    getProcessedAudio(file, audioContext).then((audio) => {
      if (!audio) return;
      workerAdapter.invoke(audio);
      workerIsLoading = true;
    });
  }

  setPageHeaderTitle('Audio analyzer');
</script>

<div class="content-wrapper">
  <div class="flex flex-col gap-6 grow">
    <FileUploadInput
      on:submit={onFileSubmitted}
      isLoading={workerIsLoading}
      loadingStatusMessage={workerStatus}
      loadingProgress={workerProgress}
    />

    <span
      class="font-mono transition-opacity text-muted-text"
      style="opacity: {file?.name ? 1 : 0};"
    >
      {file?.name}
    </span>

    <div class="grid grid-cols-2 gap-2">
      {#if workerData?.keyData}
        <DataCard
          title="Key"
          subTitle={`${workerData.keyData.key} ${workerData.keyData.scale}`}
          symbol="piano"
        />
      {/if}
      {#if workerData?.tempo}
        <DataCard title="Tempo" subTitle={`${workerData.tempo} BPM`} symbol="speed" />
      {/if}
      {#if workerData?.loudness}
        <DataCard
          title="Overall Loudness"
          subTitle={`${workerData.loudness.overall} LUFS`}
          symbol="volume_up"
        />
        <DataCard
          title="Loudness Range"
          subTitle={`${workerData.loudness.range} dB`}
          symbol="vertical_align_center"
        />
      {/if}
    </div>
  </div>
</div>
