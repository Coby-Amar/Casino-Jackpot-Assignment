import { FC, useState } from "react";

import Input from "../Input/Input.component";

export interface AddCreditsComponentProps {
    title: string
    submitText: string
    onSubmit(credits: number): void
}

const AddCreditsComponent: FC<AddCreditsComponentProps> = ({ title, submitText, onSubmit }) => {
    const [credits, setCredits] = useState('')
    return (
        <div className='dialogOverlay'>
            <div className='dialog'>
                <h3>{title}</h3>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(+credits)
                }}>
                    <Input
                        name="credits"
                        onChange={(e) => setCredits(e.target.value)}
                        type="number"
                        label="Amount"
                        placeholder="Enter amount"
                        value={credits}
                    />
                    <button type="submit" className="button submit">{submitText}</button>
                </form>
            </div>
        </div>
    )

}

export default AddCreditsComponent