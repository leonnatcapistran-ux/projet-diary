import {Link} from '../lib/inertia-shim';
import { FALLBACK_IMAGE } from "./BlogIndex";
import type {BlogCardArticle} from "./BlogIndex";


export default function BlogHero({feature: featuredArticle, formattedArticles}: {feature: BlogCardArticle | null, formattedArticles: BlogCardArticle[]}) {
  const categories = ["Filière Agricole", "Atelier Artisanat", "Engagement & Export"];
  const troispetit: BlogCardArticle[] = categories
    .map(cat => formattedArticles.find(a => a.categoryLabel === cat))
    .filter((article): article is BlogCardArticle => article !== undefined);

  if (!featuredArticle) {
    return (
      <div className="mx-auto py-6">
        <div className="rounded-[1.75rem] border border-amber-400/15 bg-white/[0.04] px-6 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-10 sm:py-14">
          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-300">
              Actualites Diary
            </span>
            <h2 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
              Il n&apos;y a pas encore d&apos;article
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Nos premieres actualites arrivent bientot. Revenez prochainement pour decouvrir nos publications sur le terroir, l&apos;artisanat et l&apos;exportation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-6">

      {/* ── Grid ── */}
      {/* Desktop: grid-cols-40 layout (unchanged) */}
      {/* Tablet: 2-col layout — featured left, cards stacked right */}
      {/* Mobile: full single column */}
      <div className="
        grid gap-4 items-start
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-40
      ">

        {/* Featured col */}
        <div className="
          col-span-1
          md:col-span-1
          lg:col-span-19
        ">
          <div className="relative rounded-md overflow-hidden cursor-pointer mb-1
            h-[240px]
            sm:h-[300px]
            md:h-[340px]
            lg:h-[380px]
          ">
            <img
              src={featuredArticle.image || FALLBACK_IMAGE}
              alt={featuredArticle.title}
              className="w-full h-full object-cover block"
            />
            <span className="absolute top-[14px] left-[14px] bg-black/55 text-white text-[0.75rem] font-medium px-2.5 py-1 rounded">À la Une</span>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/82 to-transparent p-[60px_18px_16px]">
              <h2 className="
                font-bold text-white leading-tight mb-2
                text-lg
                sm:text-xl
                lg:text-2xl
              ">
                {featuredArticle.title}
              </h2>
            </div>
          </div>

          <p className="text-[0.78rem] text-gray-300 leading-relaxed
            hidden md:block
          ">
            {featuredArticle.excerpt}
          </p>
          {/* excerpt visible on mobile too but shorter */}
          <p className="text-[0.78rem] text-gray-300 leading-relaxed line-clamp-2
            block md:hidden
          ">
            {featuredArticle.excerpt}
          </p>
        </div>

        {/* Article cards */}
        {/* Mobile: horizontal scroll row */}
        {/* Tablet: stacked in second column */}
        {/* Desktop: col-span-7 each (unchanged) */}
        {featuredArticle && (
          <>
            {/* Desktop layout: individual col-span-7 cards (unchanged) */}
            <div className="hidden lg:contents">
              {troispetit.map((article: BlogCardArticle) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Tablet layout: stacked cards in second column */}
            <div className="hidden md:flex lg:hidden flex-col gap-4">
              {troispetit.map((article: BlogCardArticle) => (
                <ArticleCardTablet key={article.slug} article={article} />
              ))}
            </div>

            {/* Mobile layout: horizontal scroll */}
            <div className="flex flex-col gap-3 md:hidden">
              {troispetit.map((article: BlogCardArticle) => (
                <ArticleCardMobile key={article.slug} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Desktop card (unchanged) ── */
function ArticleCard({ article }: { article: BlogCardArticle }) {
  return (
    <div className="bg-[#0f0f0f] border border-gold/20 rounded-md col-span-7 overflow-hidden flex flex-col lg:mt-8">
      <img src={article.image || FALLBACK_IMAGE} alt={article.title} className="w-full h-[170px] object-cover block" />
      <div className="p-[12px_14px_16px]">
        <div className="text-[0.7rem] text-gold font-medium mb-1.5">{article.categoryLabel}</div>
        <div className="h-14 overflow-hidden font-['Source_Serif_4'] text-[0.9rem] font-semibold text-white leading-tight mb-2">{article.title}</div>
        <div className="h-16 overflow-hidden text-[0.75rem] text-white/70 leading-relaxed mb-2">{article.excerpt}</div>
        <Link href={`/actualites/${article.slug}`}>
          <button className="mt-2 self-start bg-gold text-black border-0 rounded px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase font-sans cursor-pointer transition duration-200 ease-in-out transform hover:bg-[#c8a97e] hover:-translate-y-0.5">
            EN SAVOIR PLUS
          </button>
        </Link>
      </div>
    </div>
  );
}

/* ── Tablet card: horizontal (image left, text right) ── */
function ArticleCardTablet({ article }: { article: BlogCardArticle }) {
  return (
    <div className="bg-[#0f0f0f] border border-gold/20 rounded-md overflow-hidden flex flex-row">
      <img
        src={article.image || FALLBACK_IMAGE}
        alt={article.title}
        className="w-[120px] min-w-[120px] h-auto object-cover block"
      />
      <div className="p-3 flex flex-col justify-between">
        <div>
          <div className="text-[0.7rem] text-gold font-medium mb-1">{article.categoryLabel}</div>
          <div className="font-['Source_Serif_4'] text-[0.85rem] font-semibold text-white leading-tight mb-1 line-clamp-2">{article.title}</div>
          <div className="text-[0.72rem] text-white/70 leading-relaxed line-clamp-2">{article.excerpt}</div>
        </div>
        <Link href={`/actualites/${article.slug}`}>
          <button className="mt-2 self-start bg-gold text-black border-0 rounded px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase font-sans cursor-pointer transition duration-200 ease-in-out hover:bg-[#c8a97e]">
            EN SAVOIR PLUS
          </button>
        </Link>
      </div>
    </div>
  );
}

/* ── Mobile card: snap-scroll card ── */
function ArticleCardMobile({ article }: { article: BlogCardArticle }) {
  return (
    <div className="bg-[#0f0f0f] border border-gold/20 rounded-md overflow-hidden flex flex-col w-full">
      <img
        src={article.image || FALLBACK_IMAGE}
        alt={article.title}
        className="w-full h-[140px] object-cover block"
      />
      <div className="p-3 flex flex-col flex-1">
        <div className="text-[0.68rem] text-gold font-medium mb-1">{article.categoryLabel}</div>
        <div className="font-['Source_Serif_4'] text-[0.85rem] font-semibold text-white leading-tight mb-1 line-clamp-2">{article.title}</div>
        <div className="text-[0.72rem] text-white/70 leading-relaxed line-clamp-3 mb-2">{article.excerpt}</div>
        <Link href={`/actualites/${article.slug}`} className="mt-auto">
          <button className="w-full bg-gold text-black border-0 rounded px-3 py-2 text-[11px] font-bold tracking-[0.1em] uppercase font-sans cursor-pointer transition duration-200 ease-in-out hover:bg-[#c8a97e]">
            EN SAVOIR PLUS
          </button>
        </Link>
      </div>
    </div>
  );
}
