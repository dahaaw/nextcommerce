'use client';

import { Widget } from '@sledge-app/react-product-review';
import parseGid from 'lib/shopify/parse-gid';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

type IReviewList = {
  product: Product;
  selectedVariantId?: string;
  dataList?: any;
  dataSummary?: any;
};
export default function ReviewWidget({
  product,
  selectedVariantId,
  dataList,
  dataSummary
}: IReviewList) {
  const consoleStyle =
    'color: white; background: black; border: 1px solid white; padding: 2px 5px; border-radius: 350px;';

  return (
    <Widget.Root
      data={{
        productId: parseGid(product.id).id,
        productVariantId: selectedVariantId ? parseGid(selectedVariantId)?.id : ''
      }}
      onAfterAddReview={(state) => {
        if (state === 'success') {
          console.log('%cSledge', consoleStyle, `Add review: ${state}`);
        } else {
          console.error('%cSledge', consoleStyle, `Add review: ${state}`);
        }
      }}
      defaultData={dataList}
      LinkComponent={Link}
    >
      <Widget.Header>
        {/* @ts-ignore */}
        <Widget.Header.Summary summaryData={dataSummary} />
        {/* @ts-ignore */}
        <Widget.Header.AddTrigger />
        {/* @ts-ignore */}
        <Widget.Header.Sort />
      </Widget.Header>
      <Widget.List />
    </Widget.Root>
  );
}
