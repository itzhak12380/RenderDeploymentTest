import "./History.css"
import React, { useContext, useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import { Link } from 'react-router-dom'
import Loading from '../../features/loading/Loading'
import { getHistory } from '../../../service/historyService'
import { Order } from '../../../Types/cartType'

function OrderHistory() {
    const state = useContext(globalState)
    const { history, sethistory } = state!.userAPI.history
    const { isAdmin } = state!.userAPI.isAdmin
    const ifToken = async (token: string) => {
        if (token) {
            const res = await getHistory(isAdmin)
            sethistory(res)
        }
    }
    useEffect(() => {
        const token = localStorage.accessToken
        ifToken(token)
    }, [localStorage.accessToken, isAdmin])

    if (history.length === 0) return <Loading />
    return (
        <div className="history-page">
            <h2>History</h2>
            <h4> You have {history.length}</h4>
            <table>
                <thead>
                    <tr>
                        <th>paymend ID</th>
                        <th>Date of purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((item: Order) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.paymentID}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${item._id}`}>View</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
