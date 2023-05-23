import { useQuery } from "@apollo/client";
import { IQuery } from "src/commons/types/graphql/types";
import { useMoveToPage } from "src/components/hooks/useMoveToPage";
import { FETCH_USED_ITEM } from "src/components/units/product/detail/Detail.queries";
import ProductRegister from "src/components/units/product/register/Register.container";

export default function ProductEditPage() {
  const { query } = useMoveToPage();
  const { data: useditemData } = useQuery<Pick<IQuery, "fetchUseditem">>(
    FETCH_USED_ITEM,
    {
      variables: { useditemId: query.useditemId as string },
    }
  );

  return <ProductRegister isEdit={true} useditemData={useditemData} />;
}
