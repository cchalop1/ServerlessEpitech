type MessagesListProps = {
  currentConvId: string | null;
}

export default function MessagesList({ currentConvId }: (MessagesListProps)) {
  const isOwnMessage = (cond: boolean) => {
    return cond ? " self-end bg-blue-700" : " self-start bg-green-700"
  }

  return (
    <div className="ml-60 min-h-full flex flex-col-reverse justify-start items-center pb-10">
      {/* ml60: the sidebar covers this component otherwise, should be fixed with a flex or smth 
          min-h-full: css height is a bit to big, since the header takes some space
      */}
      <div className={"py-2 px-4 m-1 rounded-lg text-white" + isOwnMessage(true)}>Réponse!</div>
      <div className={"py-2 px-4 m-1 rounded-lg text-white" + isOwnMessage(false)}>Question?</div>
    </div>
  )
}
