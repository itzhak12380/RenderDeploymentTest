import React, { useContext,useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import { Link } from 'react-router-dom'
import Login from '../auth/Login'
import Loading from '../../features/loading/Loading'
import {API} from '../../service/api-service'
import "./History.css"
function OrderHistory() {
    const state = useContext(globalState)
    const [history,sethistory] = state.userAPI.history    
    const [isAdmin] = state.userAPI.isAdmin  
    console.log(history);  
    useEffect(() => {
        const token = localStorage.accessToken

        if (token) {
            const getHistory = async () => {
                if(isAdmin){
                    const res = await fetch(`${API}/api/payment`, {
                        method: "get", headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.accessToken}`
                        }
                    }).then(res => res.json()).then(responce => responce).catch(error => error)
                    console.log(res);
                    sethistory(res);
                }
                else{
                      const res = await fetch(`${API}/user/history`, {
                        method: "get", headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.accessToken}`
                        }
                    }).then(res => res.json()).then(responce => responce).catch(error => error)
                    console.log(res);
                    sethistory(res);
                }
                  
               
            }
            getHistory()
        }
    }, [localStorage.accessToken,isAdmin])
  if(history.length === 0 )  return <Loading/> 
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

                        history.map((item) => {
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
