import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const UnderlineLink = ({
  link,
  label,
  underlineByDefault = false,
}: {
  label: ReactNode | string
  link: string
  underlineByDefault?: boolean
}) => {
  return (
    <Link
      href={link}
      target="_blank"
      className={cn(
        'flex items-center rounded-none border border-transparent',
        'dark:text-zinc-300',
        'duration-200',
        'hover:border-b-zinc-600',
        'dark:hover:border-b-zinc-300',
        underlineByDefault
          ? `border-b border-b-zinc-400/[0.3] dark:border-b-zinc-500`
          : 'hover:border-b',
      )}
    >
      { label }
    </Link>
  )
}

export function CustomFooter() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className={cn(
        'flex justify-center items-center gap-0.5',
        'max-sm:flex-col max-sm:gap-5 max-sm:pb-10',
        'tracking-wide text-[15px] text-center group',
        'text-gray-500/80 dark:text-zinc-300/80',
      )}
      >
        <div className="flex items-center gap-0.5">
          <span className="pl-1">
            Copyright ©
            {' '}
            { new Date().getFullYear() }
          </span>
          <UnderlineLink
            link="https://github.com/pdsuwwz"
            label={(
              <>
                <span className="animate-[heartbeat_1.5s_infinite] mr-[3px]">❤️</span>
                {' '}
                Docs
              </>
            )}
          />
        </div>
      </div>
    </div>
  )
}
