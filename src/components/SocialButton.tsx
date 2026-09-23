import type { ButtonHTMLAttributes } from 'react'
import google from '../assets/brand/google.svg'
import linkedin from '../assets/brand/linkedin.svg'

type Provider = 'google' | 'linkedin'

/* Figma's btn_google (3:151) and btn_linkedIn (3:452). Both follow Google's
   official button spec: white fill, #747775 hairline, 52px tall, Inter
   Medium 14 on #1f1f1f. The logos differ in size, 18px vs 16px. */
const providers: Record<Provider, { src: string; size: string }> = {
  google: { src: google, size: 'size-[18px]' },
  linkedin: { src: linkedin, size: 'size-[16px]' },
}

export function SocialButton({
  provider,
  children,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: Provider
}) {
  const { src, size } = providers[provider]

  return (
    /* The 3px wrapper is Figma's own padding around each button, which is
       what separates the stacked pair. */
    <div className="w-full p-[3px]">
      <button
        type={type}
        className="flex h-[52px] w-full items-center justify-center gap-[10px] rounded-[12px] border border-social-border bg-white px-[12px] text-[14px] font-medium text-[#1f1f1f] transition-colors hover:bg-grey-100"
        {...props}
      >
        <span className={`relative shrink-0 ${size} overflow-clip`}>
          <img src={src} alt="" className="block size-full" />
        </span>
        {children}
      </button>
    </div>
  )
}
