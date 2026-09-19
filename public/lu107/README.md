# LU-107 audio recorder

Standalone page at `/lu107/` that records a short audio clip in the browser and
stores it in Supabase (same project as `/lampa/`). Designed to be embedded in
https://dhc.lu.lv/LU107/ via a wide iframe, in place of the
Runā / Klausies / Pārbaudi blocks.

Layout is two columns — instructions left, recorder right — collapsing to a
single column below 860px. With `?instructions=0` the recorder stands alone,
centred.

## URL parameters

| Parameter      | Default  | Meaning                                                         |
|----------------|----------|-----------------------------------------------------------------|
| `instructions` | `1`      | `1`/`0` — show or hide the instruction block with a task prompt |
| `prompt`       | random   | 1-based index into `PROMPTS` to force a specific task           |
| `max`          | `60`     | Maximum recording length in seconds (5–600)                     |
| `source`       | `lu107`  | Free-form tag saved with each recording                         |

Examples:
- `https://balsutalka.lv/lu107/` — instructions shown, random task
- `https://balsutalka.lv/lu107/?instructions=0` — bare recorder, no task
- `https://balsutalka.lv/lu107/?prompt=1&max=30`

The task prompts live in the `PROMPTS` constant at the top of `script.js`.

## Embedding

```html
<iframe src="https://balsutalka.lv/lu107/?instructions=1"
        title="Ieraksti savu balsi"
        style="width:100%;border:0;display:block"
        height="520"
        allow="microphone"></iframe>
```

`allow="microphone"` is required — without it the browser blocks `getUserMedia`
inside the iframe. The page also posts its height to the parent, so the iframe
can resize itself:

```html
<script>
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://balsutalka.lv') return;
    if (event.data && event.data.type === 'lu107-recorder-height') {
        document.querySelector('iframe[title="Ieraksti savu balsi"]').height = event.data.height;
    }
});
</script>
```

Both the embedding page and this page must be served over HTTPS.