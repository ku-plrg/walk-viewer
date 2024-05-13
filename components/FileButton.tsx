import { useComputed, useSignalEffect } from "@preact/signals";
import { useRef } from "preact/hooks";
import { cursorIdx, labelled } from "~/signals/state.ts";
import LabelCount from "~/components/LabelCount.tsx";
import { join } from "~/utils/class-join.ts";

interface FileButtonProps {
  idx: number;
  entry: string;
}
export default function FileButton({ entry, idx }: FileButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const flag = useComputed(() => cursorIdx.value === idx);
  const label = useComputed(() => labelled.value[entry]);
  useSignalEffect(() => {
    if (flag.value) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  return (
    <button
      ref={ref}
      class={join(
        "w-full flex items-center justify-between",
        flag.value ? "text-foreground" : "text-muted-foreground",
      )}
      onClick={() => cursorIdx.value = idx}
    >
      <p>{flag.value ? <b>{entry}</b> : entry}</p>
      {label.value && label.value}
    </button>
  );
}
