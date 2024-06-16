<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Calendar } from '$lib/components/ui/calendar/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { cn } from '$lib/utilities/shadcn';
  import {
    DateFormatter,
    fromDate,
    getLocalTimeZone,
    type DateValue,
  } from '@internationalized/date';
  import CalendarIcon from 'lucide-svelte/icons/calendar';
  import { onMount } from 'svelte';
  import { getFormStore } from '../../stores';

  const formStore = getFormStore();
  const df = new DateFormatter('en-US', {
    dateStyle: 'long',
  });

  let value: DateValue | undefined = undefined;

  $: formData = $formStore.form.form;
  $: if (value) {
    // On value change, set the form data release date
    $formData.releaseDate = value.toDate(getLocalTimeZone());
  }

  onMount(() => {
    // On mount, set the date of the calendar to the form data release date or the current date
    const date = $formData.releaseDate || new Date();
    value = fromDate(date, getLocalTimeZone());
  });
</script>

<Popover.Root>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        'w-full justify-start text-left font-normal h-12',
        !value && 'text-muted-foreground',
      )}
      builders={[builder]}
    >
      <CalendarIcon class="w-4 h-4 mr-2" />
      {value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value initialFocus />
  </Popover.Content>
</Popover.Root>
