import { FC, useContext, useEffect, useRef, useState } from 'react'
import styles from './Slot_Machine.module.css'

import SlotComponent from './Slot.component'

import { ApiService } from '~/services/api.service'
import { GlobalReducerActions, GlobalStoreContext } from '~/services/state.service'
import AddCreditsComponent, { AddCreditsComponentProps } from '~/components/dialogs/Add_Credits.dialog'
import MessagesDialog, { MessagesDialogProps } from '~/components/dialogs/Messages.dialog'

const symbols = ["🍒", "🍋", "🍊", "🍉"]

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)]
}


const SlotMachinePage: FC = () => {
    const intervalId = useRef<NodeJS.Timeout>(null)
    const [messagesDialog, setMessagesDialog] = useState<MessagesDialogProps | null>(null)
    const [dialog, setDialog] = useState<AddCreditsComponentProps | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [slots, setSlots] = useState(new Array(3).fill(symbols[0]))
    const { state, dispatch } = useContext(GlobalStoreContext)
    const { isAuthenticated, user, roll } = state

    useEffect(() => {
        if (isPlaying) {
            intervalId.current = setInterval(() => setSlots(prev => prev.map(() => getRandomSymbol())), 100);
        } else if (roll) {
            for (let i = 1; i < 4; i++) {
                setTimeout(() => {
                    clearInterval(intervalId.current!)
                    setSlots(prev => roll!.results.slice(0, i).concat(prev.slice(i)));
                    if (i < 3) {
                        intervalId.current = setInterval(() => setSlots(prev => prev.slice(0, i).concat(prev.slice(i).map(() => getRandomSymbol()))), 100);
                    } else {
                        clearInterval(intervalId.current!)
                        setMessagesDialog({
                            title: roll.isWinner ? 'WOW!' : 'Whoops...',
                            message: roll.isWinner ? 'Is this the start of a winning streak?' : 'Better luck next time',
                            onClose: () => setMessagesDialog(null)
                        })
                    }
                }, i * 1000);
            }
        }
    }, [isPlaying, roll])

    useEffect(() => {
        if (!isAuthenticated) {
            ApiService.user().then((data) => dispatch!({ type: GlobalReducerActions.LOGIN, payload: data }))
        }
    }, [dispatch, isAuthenticated])
    return (
        <>
            {dialog && <AddCreditsComponent {...dialog} />}
            {messagesDialog && <MessagesDialog {...messagesDialog} />}

            <main className={styles.container}>
                <div className={styles.accountContainer}>
                    <span className={styles.accountName}>
                        Welcome {user?.username}
                    </span>
                    <span className={styles.accountBalance}>
                        Your remaining balance is: {user?.balance}
                    </span>
                    <span className={styles.accountActions}>
                        <button className={`button ${styles.accountLogout}`}>Log out</button>
                        <button
                            className={`button ${styles.accountTopUp}`}
                            onClick={async () => {
                                setDialog({
                                    title: 'How much would you like to top up',
                                    submitText: 'top up',
                                    async onSubmit(credits) {
                                        const payload = await ApiService.topUp(credits)
                                        setDialog(null)
                                        dispatch!({ type: GlobalReducerActions.TOPUP, payload })
                                        setMessagesDialog({
                                            title: 'Nice!',
                                            message: credits + ' credits have beed add to your account',
                                            onClose: () => setMessagesDialog(null)
                                        })
                                    },
                                })
                            }}
                        >
                            Top up

                        </button>
                    </span>
                </div>
                <div className={styles.slotMachineContainer}>
                    <span className={styles.credits}>
                        You have {user?.credits} credits left
                    </span>
                    <div className={styles.slotMachine}>
                        {slots.map((symbol, index) =>
                            <SlotComponent
                                key={SlotComponent + symbol + index}
                                symbol={symbol}
                                playing={isPlaying}
                            />
                        )}
                    </div>
                    <div className={styles.actions}>
                        <button
                            className={`button ${styles.actionsPlay}`}
                            onClick={async () => {
                                setIsPlaying(true)
                                dispatch!({ type: GlobalReducerActions.ROLL_RESET, payload: null })
                                const payload = await ApiService.roll()
                                setTimeout(() => {
                                    dispatch!({ type: GlobalReducerActions.ROLL, payload })
                                }, 3 * 1000);
                                setIsPlaying(false)
                            }}
                        >
                            Play
                        </button>
                        <button
                            className={`button ${styles.actionsChashOut}`}
                            onClick={async () => {
                                const payload = await ApiService.cashOut()
                                dispatch!({ type: GlobalReducerActions.CASH_OUT, payload })
                            }}
                        >
                            Cash out
                        </button>
                        <button
                            className={`button ${styles.actionsChashIn}`}
                            onClick={async () => {
                                setDialog({
                                    title: 'How much would you like to cash in',
                                    submitText: 'Cash in',
                                    async onSubmit(credits) {
                                        const payload = await ApiService.cashIn(credits)
                                        dispatch!({ type: GlobalReducerActions.CASH_IN, payload })
                                        setDialog(null)
                                        setMessagesDialog({
                                            title: 'Nice!',
                                            message: credits + ' credits have been added',
                                            onClose: () => setMessagesDialog(null)
                                        })

                                    },
                                })
                            }}
                        >
                            Cash in
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SlotMachinePage