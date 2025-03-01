import { FC } from 'react'
import styles from './Slot_Machine.module.css'

interface SlotComponentProps {
    symbol: string
    playing?: boolean,
}


const SlotComponent: FC<SlotComponentProps> = ({ symbol }) => {
    return (
        <div className={styles.slot}>
            <span className={styles.symbol}>
                {symbol}
            </span>
        </div>
    )
}

export default SlotComponent