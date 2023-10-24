import React from "react";

export default function FundInfo(props) {
    const {monthlyInterest, monthlyWithdrawals, investmentPeriod, minimumDeposit} = props
    return (
        <div>
            <p>Monthly Interest: {monthlyInterest + "%"}</p>
            <p>Monthly Withdrawals: {monthlyWithdrawals ? "Yes" : "No"}</p>
            <p>Investment Period: {investmentPeriod}</p>
            <p>Minimum Deposit: {minimumDeposit}</p>
        </div>
    )
}