import { useEffect, useRef, useState } from "react";
import { Pencil, Eraser, Trash2, Download } from "lucide-react";

const COLORS = ["#f5e6c8", "#e8a87c", "#c38d9e", "#85dcba", "#7ec4cf", "#e27d60"];

export function DoodlePad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(4);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let hasContent = false;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // Snapshot only if something was drawn; blank canvas yields "data:," which throws on Image.src.
      const prev = hasContent ? canvas.toDataURL() : null;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.floor(320 * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `320px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Reset any prior transform so scale doesn't compound across resizes.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (prev) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, 320);
        img.src = prev;
      }
    };
    resize();
    // Mark the canvas dirty on first stroke so future resizes preserve it.
    const markDirty = () => {
      hasContent = true;
    };
    canvas.addEventListener("pointerdown", markDirty, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      canvas.removeEventListener("pointerdown", markDirty);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = true;
    lastRef.current = pos(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !lastRef.current) return;
    const p = pos(e);
    ctx.strokeStyle = erasing ? "#2a1f1a" : color;
    ctx.lineWidth = erasing ? size * 3 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
  };

  const end = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "doodle.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Pencil className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Doodle Pad</h2>
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => {
              setColor(c);
              setErasing(false);
            }}
            className={`h-7 w-7 rounded-full border-2 transition ${color === c && !erasing ? "border-foreground scale-110" : "border-transparent"}`}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
        <div className="mx-2 h-6 w-px bg-border" />
        <input
          type="range"
          min={1}
          max={20}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-20 accent-primary"
          aria-label="Brush size"
        />
        <button
          onClick={() => setErasing((v) => !v)}
          className={`ml-auto rounded-lg p-2 transition ${erasing ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          aria-label="Eraser"
        >
          <Eraser className="h-4 w-4" />
        </button>
        <button onClick={download} className="rounded-lg p-2 transition hover:bg-muted" aria-label="Download">
          <Download className="h-4 w-4" />
        </button>
        <button onClick={clear} className="rounded-lg p-2 transition hover:bg-muted" aria-label="Clear">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="w-full overflow-hidden rounded-xl bg-[#2a1f1a]">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="block cursor-crosshair touch-none"
        />
      </div>
    </div>
  );
}
