import CommentList from "src/components/units/comment/list/List.container";
import CommentWrite from "src/components/units/comment/write/Write.container";
import ProductDetail from "src/components/units/product/detail/Detail.container";

export default function ProductDetailPage() {
  return (
    <>
      <ProductDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
}
