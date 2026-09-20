/* iOS status chrome, not product iconography. The signal/wifi/battery marks
   are CSS stand-ins so the frame reads correctly; swap them for the exported
   Figma assets if these screens ever need to be pixel-exact. */
export function StatusBar({ dark = false }: { dark?: boolean }) {
  const ink = dark ? 'bg-white' : 'bg-black'

  return (
    <div className="relative z-10 flex h-11 shrink-0 items-center justify-between px-6 pt-1">
      <span
        className={`text-sm font-semibold ${dark ? 'text-white' : 'text-black'}`}
      >
        9:41
      </span>
      <div className="flex items-end gap-1">
        <span className="flex items-end gap-[2px]">
          {[3, 5, 7, 9].map((h) => (
            <span
              key={h}
              className={`w-[3px] rounded-[1px] ${ink}`}
              style={{ height: h }}
            />
          ))}
        </span>
        <span className={`h-[10px] w-[13px] rounded-sm ${ink}`} />
        <span
          className={`h-[11px] w-[24px] rounded-[3px] border ${dark ? 'border-white' : 'border-black'} p-[1.5px]`}
        >
          <span className={`block h-full w-2/3 rounded-[1px] ${ink}`} />
        </span>
      </div>
    </div>
  )
}
