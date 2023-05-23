import { useMutation } from '@apollo/client'
import { Modal } from 'antd'
import { useForm } from 'react-hook-form'
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
} from 'src/commons/types/graphql/types'
import { useAuth } from 'src/components/hooks/useAuth'
import { useMoveToPage } from 'src/components/hooks/useMoveToPage'
import { FETCH_USED_ITEMS_QUESTIONS } from '../list/List.queries'
import CommentWriteUI from './Write.presenter'
import { ICommentInput } from './Write.types'
import { CREATE_USEDITEM_QUESTION } from './Writer.queries'

export default function CommentWrite() {
  const { push, query } = useMoveToPage()

  const useFormtReturn = useForm<ICommentInput>({
    mode: 'onSubmit',
  })

  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, 'createUseditemQuestion'>,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USEDITEM_QUESTION)

  const onClickSubmit = async (data: ICommentInput) => {
    if (!data.comment) return

    try {
      await createUseditemQuestion({
        variables: {
          useditemId: query.useditemId as string,
          createUseditemQuestionInput: {
            contents: data.comment,
          },
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTIONS,
            variables: { page: 0, useditemId: query.useditemId },
          },
        ],
      })

      useFormtReturn.setValue('comment', '')
    } catch (error) {
      Modal.error({ content: (error as Error).message })
    }
  }

  return <CommentWriteUI useForm={useFormtReturn} onClickSubmit={onClickSubmit} />
}
