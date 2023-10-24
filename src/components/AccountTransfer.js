import React from "react";

export default function AccountTranfer() {
    return (
        <>
            <section className="section-title">
                <h1>Transfer</h1>
            </section>
            <section id="transfer-form" className="money-move-form">
                    <form>
                    <label htmlFor="amount">Enter the User ID you want to transfer to</label>
                        <input type="text" name="UserID" placeholder="User ID" /> 
                        <label htmlFor="amount">Enter the amount you want to transfer</label>
                        <input type="number" name="amount" placeholder="Amount" />
                        <input type="submit" value="Deposit" />
                        <p>This opperation will take place immediately</p>
                    </form>
                </section> 
            <section id="transfer" className="history">
                <div>
                    <h2>Transfer History</h2>
                    <p><i class="fa-solid fa-circle-plus"></i>Transfer</p>  
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>Date</th> 
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6}>No Transfers</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}