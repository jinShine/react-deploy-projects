import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { IUseditemQuestion } from "src/commons/types/graphql/types";
import { getDate } from "src/commons/utils/date";

interface IProps {
  isEdit: boolean;
  commentData: IUseditemQuestion;
  onClickUpdate: () => void;
  onClickDelete: () => void;
}

export default function CommentListItem(props: IProps) {
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
              <Contents>{props.commentData.contents}</Contents>
            </MainWrapper>
            <OptionWrapper>
              <DeleteFilled onClick={props.onClickUpdate} />
              <DeleteOutlined onClick={props.onClickDelete} />
            </OptionWrapper>
          </FlexWrapper>
          <DateString>{getDate(props.commentData.createdAt)}</DateString>
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
  height: 128px;
`;

const Divider = styled.div`
  background-color: ${(props) => props.theme.color.divider};
  height: 1px;
  width: 100%;
  margin: 10px 0;
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UserImage = styled.img`
  height: 40px;
  aspect-ratio: 1;
`;

export const UserName = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.text.secondary};
  margin-left: 6px;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
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
  font-size: 20px;
  font-weight: bold;
`;
export const Contents = styled.div``;

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const UpdateIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const DeleteIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const DateString = styled.div`
  color: lightgray;
  padding-top: 15px;
  padding-left: 60px;
`;
