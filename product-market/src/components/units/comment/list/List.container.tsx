import { useMutation, useQuery } from '@apollo/client'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from 'src/commons/types/graphql/types'
import { useMoveToPage } from 'src/components/hooks/useMoveToPage'
import CommentListUI from './List.presenter'
import { DELETE_USED_ITEM_QUESTIONS, FETCH_USED_ITEMS_QUESTIONS } from './List.queries'

export default function CommentList() {
  const { push, query } = useMoveToPage()

  const { data: commentDatas, fetchMore } = useQuery<
    Pick<IQuery, 'fetchUseditemQuestions'>,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEMS_QUESTIONS, {
    variables: { page: 0, useditemId: query.useditemId as string },
  })

  const [deleteUseditemQuestions] = useMutation<
    Pick<IMutation, 'deleteUseditemQuestion'>,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTIONS)

  const onLoadMore = () => {
    if (!commentDatas) return

    void fetchMore({
      variables: {
        page: Math.ceil(commentDatas.fetchUseditemQuestions.length / 10 + 1),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditemQuestions) {
          return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] }
        }

        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        }
      },
    })
  }

  const onClickUpdate = () => {
    console.log('Update')
  }

  const onClickDelete = async (event: MouseEvent<HTMLDivElement>) => {
    const useditemQuestionId = event.currentTarget.id

    try {
      await deleteUseditemQuestions({
        variables: { useditemQuestionId },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTIONS,
            variables: { page: 0, useditemId: query.useditemId },
          },
        ],
      })
    } catch (error) {
      Modal.error({ content: (error as Error).message })
    }
  }

  return (
    <CommentListUI
      commentDatas={commentDatas}
      onLoadMore={onLoadMore}
      onClickUpdate={onClickUpdate}
      onClickDelete={onClickDelete}
    />
  )
}
