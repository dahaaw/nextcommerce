import { getProductsReviewInfo } from '@sledge-app/api';
import { getCollectionProducts } from 'lib/shopify';
import parseGid from 'lib/shopify/parse-gid';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'vans' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  const IDs = carouselProducts.map(v => v.id );
  const sledgeSession = JSON.parse( cookies().get( 'sledgeSession' )?.value || '{}' );
  const reviews = await getProductsReviewInfo( sledgeSession, IDs );

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                rating={ reviews[ parseGid( product.id ).id ] }
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
