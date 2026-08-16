

import { InputChat } from "@/components/generate-text-with-input/generate-text-with-input";
import { GenerateText } from "@/components/generate-text/generate-text";
import { StreamTextWithInput } from "@/components/stream-text-with-input/stream-text-with-input";
import { StreamText } from "@/components/stream-text/stream-text";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <StreamTextWithInput />
   </div>
  );
}
