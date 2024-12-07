import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { button as buttonStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GoogleIcon } from '@/components/icons';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 px-4 md:py-12 md:px-10 ">
      <div className="inline-block max-w-xl text-center">
        <span
          className={title({ size: 'lg', class: 'text-red-600 font-bold' })}
        >
          🎄 Adviento 🎄
        </span>
        <div className={subtitle({ class: 'mt-2 text-green-700 italic' })}>
          By Digital Wave.
        </div>
      </div>

      {/* Botón de inicio de sesión */}
      <div className="flex gap-3 mt-12">
        <Link
          isExternal
          className={`${buttonStyles({
            variant: 'solid',
            radius: 'full',
          })} px-6 py-3 text-sm bg-red-600 text-white hover:bg-green-600 transition-all`}
          href={siteConfig.links.github}
        >
          <GoogleIcon size={20} />
          <span className="ml-2">Inicia sesión con Google</span>
        </Link>
      </div>

      {/* Línea divisora de segmentos */}
      <hr className="w-3/4 my-8 border-green-500" />

      {/* Snippet con enlace */}
      <div className="mt-8">
        <Snippet
          hideCopyButton
          hideSymbol
          className="bg-white/70 border-red-300"
          variant="bordered"
        >
          <span className="text-green-800">
            🎁 También puedes donar en{' '}
            <Link
              color="foreground"
              href="https://aldeasinfantiles.cl"
              target="_blank"
            >
              aldeasinfantiles.cl
            </Link>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
