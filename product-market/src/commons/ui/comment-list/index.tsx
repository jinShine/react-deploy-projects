import styled from "@emotion/styled";
import { MouseEvent } from "react";
import { IUseditemQuestion } from "src/commons/types/graphql/types";
import { getDate } from "src/commons/utils/date";
import { useAuth } from "src/components/hooks/useAuth";

interface IProps {
  isEdit: boolean;
  commentData: IUseditemQuestion;
  onClickUpdate: () => void;
  onClickDelete: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function CommentListItem(props: IProps) {
  const { userInfo } = useAuth();

  return (
    <>
      {!props.isEdit && (
        <Wrapper>
          <FlexWrapper>
            <UserImage
              src={
                props.commentData.user.picture
                  ? `${process.env.NEXT_PUBLIC_STORAGE_URI}/${props.commentData.user.picture}`
                  : "/images/ic-profile.svg"
              }
            />
            <MainWrapper>
              <WriterWrapper>
                <Writer>{props.commentData.user.name}</Writer>
              </WriterWrapper>
              <CreatedAt>{getDate(props.commentData.createdAt)}</CreatedAt>
              <Contents>{props.commentData.contents}</Contents>
            </MainWrapper>
            {userInfo?.email === props.commentData.user.email && (
              <OptionWrapper>
                <UpdateIcon
                  src="/images/ic-pencil.svg"
                  onClick={props.onClickUpdate}
                />
                <DeleteIcon
                  id={props.commentData._id}
                  src="/images/ic-delete.svg"
                  onClick={props.onClickDelete}
                />
              </OptionWrapper>
            )}
          </FlexWrapper>
          <Divider />
        </Wrapper>
      )}
      {/* {isEdit && (
        <BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
      )} */}
    </>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100px;
`;

const Divider = styled.div`
  background-color: ${(props) => props.theme.color.divider};
  height: 1px;
  width: 100%;
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 14px 0px;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UserImage = styled.img`
  height: 32px;
  aspect-ratio: 1;
`;

export const MainWrapper = styled.div`
  width: 100%;
  padding-left: 10px;
`;
export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Writer = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

export const CreatedAt = styled.div`
  font-size: 10px;
  font-weight: 300;
  color: ${(props) => props.theme.text.tertiary};
  padding-top: 4px;
`;

export const Contents = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.text.primary};
  padding: 16px 50px 1px 0;
`;

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 46px;
`;

export const UpdateIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
export const DeleteIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
