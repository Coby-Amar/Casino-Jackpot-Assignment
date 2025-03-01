import { FC } from "react";

export interface MessagesDialogProps {
    title: string
    message: string
    onClose: VoidFunction
}

const MessagesDialog: FC<MessagesDialogProps> = ({ title, message, onClose }) => (
    <div className='dialogOverlay'>
        <div className='dialog'>
            <h3>{title}</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                onClose()
            }}>
                <p>{message}</p>
                <button type="submit" className="button submit">Ok</button>
            </form>
        </div>
    </div>
)

export default MessagesDialog