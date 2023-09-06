'use client';

import { Rating } from "@sledge-app/react-product-review";

type iRatingComponent = {
  data?: any;
}
export default function RatingComponent({data}: iRatingComponent) {
  return (
    <Rating data={{productId: ''}} size="sm" defaultData={ data } />
  )
}
