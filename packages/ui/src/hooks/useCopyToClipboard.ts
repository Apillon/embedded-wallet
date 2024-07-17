import { useState } from 'react';

export default function useCopyToClipboard(activatorText = 'Copy', copiedText = 'Copied!') {
  const [text, setText] = useState(activatorText);
  let copiedTimeout = null as ReturnType<typeof setTimeout> | null;

  function onCopy(content: string) {
    navigator.clipboard.writeText(content);

    if (copiedTimeout) {
      clearTimeout(copiedTimeout);
    }

    setText(copiedText);
    copiedTimeout = setTimeout(() => setText(activatorText), 2000);
  }

  return {
    text,
    onCopy,
  };
}
