/* The "or" rule between the form and the social buttons. Figma draws the
   rules as a 1px #E8E8E8 line asset, which is exactly the grey-200 token, so
   they are borders here rather than images. */
export function Divider({ label }: { label: string }) {
  return (
    <div className="flex w-full items-center gap-[6px]">
      <span className="h-px flex-1 bg-grey-200" />
      <span className="text-[16px] text-app-text">{label}</span>
      <span className="h-px flex-1 bg-grey-200" />
    </div>
  )
}
