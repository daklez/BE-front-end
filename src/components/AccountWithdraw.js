import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTRM, selectAuthStatusLoading, checkAuthUser } from "../state/slices/authSlice";
import {
    selectAccountWithdrawalAvailable,
    selectAccountWithdrawalUserWithdrawals,
    selectAccountWithdrawalWithdrawals,
    setAccountWithdrawalWithdrawals,
    selectAccountWithdrawalAmount,
    setAccountWithdrawalAmount,
    selectAccountWithdrawalDisableSubmit,
    setAccountWithdrawalDisableSubmit,
    selectAccountWithdrawalHistoryEntries,
    setAccountWithdrawalHistoryEntries,
    selectAccountWithdrawalHistoryPage,
    setAccountWithdrawalHistoryPage,
    setAccountWithdrawalFilterColumn,
    selectAccountWithdrawalFilterSearch,
    setAccountWithdrawalFilterSearch,
    selectAccountWithdrawalSelectedFund,
    setAccountWithdrawalSelectedFund,
    selectAccountWithdrawalStatus,
    selectAccountWithdrawalStatusLoading,
    selectAccountWithdrawalWithdrawalsFilteredBySearch,
    resetAccountWithdrawalForm,
    resetAccountWithdrawalStatus 
} from "../state/slices/accountWithdrawalSlice";


export default function AccountWithdraw() {
    const dispatch = useDispatch()

    const trm = useSelector(selectTRM)
    const authStatusLoading = useSelector(selectAuthStatusLoading)

    const [showWithdrawForm, setShowWithdrawForm] = useState(false)
    const withdrawals = useSelector(selectAccountWithdrawalWithdrawals)
    const historyPage = useSelector(selectAccountWithdrawalHistoryPage)
    const showEntries = useSelector(selectAccountWithdrawalHistoryEntries)
    const filterSearch = useSelector(selectAccountWithdrawalFilterSearch)
    const selectedFund = useSelector(selectAccountWithdrawalSelectedFund)
    const amount = useSelector(selectAccountWithdrawalAmount)
    const submitState = useSelector(selectAccountWithdrawalDisableSubmit)
    const withdrawStatusLoading = useSelector(selectAccountWithdrawalStatusLoading)
    const withdrawStatus = useSelector(selectAccountWithdrawalStatus)
    const withdrawalsFilteredBySearch = useSelector(selectAccountWithdrawalWithdrawalsFilteredBySearch)
    const available = useSelector(selectAccountWithdrawalAvailable)
    const selectedContract = available.find(contract => contract.fund_name === selectedFund)

    useEffect(() => {
        if (withdrawStatus === 200){
            dispatch(checkAuthUser())
        }
    }, [withdrawStatus])

    useEffect(() => {
        dispatch(setAccountWithdrawalDisableSubmit(canSubmit()))
    }, [amount, selectedFund, trm, showWithdrawForm])

    useEffect(() => {
        if (!selectedFund){
            dispatch(setAccountWithdrawalSelectedFund(available[0].fund_name))
        } 
    })

    const handleChange = (event) => {
        const id = event.target.id;

        if (id === "withdraw-amount") {
            // setAmountState(event.target.value)
            dispatch(setAccountWithdrawalAmount(event.target.value))
            if (withdrawStatus){
                dispatch(resetAccountWithdrawalStatus())
            }
        }
        if (id === "withdraw-contract") {
            // setSelectedFund(funds.data.filter(f => f.name === event.target.value)[0])
            dispatch(setAccountWithdrawalSelectedFund(event.target.value))
            if (withdrawStatus){
                dispatch(resetAccountWithdrawalStatus())
            }
        }
        if (id === "history-show") {
            // setShowEntries(event.target.value)
            dispatch(setAccountWithdrawalHistoryEntries(event.target.value))
            // setHistoryPage(0)
            if (historyPage > 0) {
                dispatch(setAccountWithdrawalHistoryPage(0))
            }
        }
        if (id === 'filter-column') {
            // setFilterColumn(event.target.value)
            dispatch(setAccountWithdrawalFilterColumn(event.target.value))
            // seWithdrawalsFilteredBySearch(deposits)
        }
        if (id === 'filter-search') {
            // setFilterSearch(event.target.value)
            dispatch(setAccountWithdrawalFilterSearch(event.target.value))
            // seWithdrawalsFilteredBySearch(deposits.filter(deposit => deposit[filterColumn].includes(event.target.value)))
            if (historyPage > 0) {
                dispatch(setAccountWithdrawalHistoryPage(0))
            }
        }
    }

    const sortHistoryBy = (column, direction) => {
        let sortingFunction;
        if (direction === "asc") {
            if (['exchange_rate', 'amount'].includes(column)) {
                sortingFunction = (a, b) => {
                    if (Number(a[column].slice(2).split(".").join("").replace(",", ".")) > Number(b[column].slice(2).split(".").join("").replace(",", "."))) {
                        return -1;
                    }
                    if (Number(a[column].slice(2).split(".").join("").replace(",", ".")) < Number(b[column].slice(2).split(".").join("").replace(",", "."))) {
                        return 1;
                    }
                    return 0;
                }
            } else if (column === "effective_date") {
                sortingFunction = (a, b) => {
                    if (!a[column]  && !b[column]) {
                        return 0;
                    }
                    if (a[column]  && !b[column]) {
                        return -1;
                    }
                    if (!a[column]  && b[column]) {
                        return 1;
                    }
                    if (a[column] > b[column]) {
                        return -1;
                    }
                    if (a[column] < b[column]) {
                        return 1;
                    }
                    return 0;
                }
            } else {
                sortingFunction = (a, b) => {
                    if (a[column] > b[column]) {
                        return -1;
                    }
                    if (a[column] < b[column]) {
                        return 1;
                    }
                    return 0;
                }
            }
            return () => {
                const withdrawalsCopy = withdrawals.slice();
                withdrawalsCopy.sort(sortingFunction)
                // setDeposits(depositsCopy)
                dispatch(setAccountWithdrawalWithdrawals(withdrawalsCopy))
            }
        }
        if (direction === "desc") {
            if (['exchange_rate', 'amount'].includes(column)) {
                sortingFunction = (a, b) => {
                    if (Number(a[column].slice(2, -3).split(".").join("").replace(",", ".")) > Number(b[column].slice(2, -3).split(".").join("").replace(",", "."))) {
                        return 1;
                    }
                    if (Number(a[column].slice(2, -3).split(".").join("").replace(",", ".")) < Number(b[column].slice(2, -3).split(".").join("").replace(",", "."))) {
                        return -1;
                    }
                    return 0;
                }
            } else if (column === "effective_date") {
                sortingFunction = (a, b) => {
                    if (!a[column]  && !b[column]) {
                        return 0;
                    }
                    if (a[column]  && !b[column]) {
                        return 1;
                    }
                    if (!a[column]  && b[column]) {
                        return -1;
                    }
                    if (a[column] > b[column]) {
                        return 1;
                    }
                    if (a[column] < b[column]) {
                        return -1;
                    }
                    return 0;
                }
            } else {
                sortingFunction = (a, b) => {
                    if (a[column] > b[column]) {
                        return 1;
                    }
                    if (a[column] < b[column]) {
                        return -1;
                    }
                    return 0;
                }
            }
            
            return () => {
                const withdrawalsCopy = withdrawals.slice();
                withdrawalsCopy.sort(sortingFunction)
                // setwithdrawals(withdrawalsCopy)
                dispatch(setAccountWithdrawalWithdrawals(withdrawalsCopy))
            }
        }
    }

    const calculateProfit = () => {
        const currentDate = new Date();
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        ;
        if (!selectedContract) {
            return 0;
        }
        if (selectedContract.fund_name === 'Best Value') {
            return parseFloat(selectedContract.deposits[0].amount.slice(2).split(".").join("").replace(",", ".")) * 1.5;
        }
        const effectiveDeposits = selectedContract.deposits.filter(deposit => deposit.effective_date)
        const effectiveWithdrawals = withdrawals.filter(withdrawal => withdrawal.effective_date)
        const effectiveDepositsWithdrawals = effectiveDeposits.concat(effectiveWithdrawals)
        const effectiveDepositsWithdrawalsSorted = effectiveDepositsWithdrawals.sort((a, b) => {
            if (a.effective_date < b.effective_date) {
                return -1;
            }
            if (a.effective_date > b.effective_date) {
                return 1;
            }
            return 0;
        }) 
        
        let invested = 0;
        let iDate = new Date(effectiveDepositsWithdrawalsSorted[0].effective_date);
        let iEffectiveDate = 0
        while (iDate.getFullYear() !== currentDate.getFullYear() || iDate.getMonth() !== (currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1)) {

            let currentDepositWithdrawal = effectiveDepositsWithdrawalsSorted[iEffectiveDate]
            let currentDepositWithdrawalDate = new Date(currentDepositWithdrawal.effective_date);
            if (iDate.getMonth() === 11) {
                while (currentDepositWithdrawalDate.getMonth() === iDate.getMonth() && currentDepositWithdrawalDate.getFullYear() === iDate.getFullYear()) {
                    if (currentDepositWithdrawal.type === "deposit") {
                        invested += parseFloat(currentDepositWithdrawal.amount.slice(2).split(".").join("").replace(",", "."));
                        invested += (monthDays[currentDepositWithdrawalDate.getMonth()] - currentDepositWithdrawalDate.getDate()) * ((selectedContract.fund_monthly_interest / 100)/ monthDays[currentDepositWithdrawalDate.getMonth()]) * invested
                        // console.log(invested, 'invested first month')
                    } else {
                        invested -= parseFloat(currentDepositWithdrawal.amount.slice(2).split(".").join("").replace(",", "."));
                    }
                    
                    if (iEffectiveDate + 1 <= effectiveDepositsWithdrawalsSorted.length - 1) {
                        iEffectiveDate++
                        currentDepositWithdrawal = effectiveDepositsWithdrawalsSorted[iEffectiveDate]
                        currentDepositWithdrawalDate = new Date(currentDepositWithdrawal.effective_date);
                    } else {
                        break
                    }
                }
                
                iDate.setFullYear(iDate.getFullYear() + 1);
                iDate.setMonth(0);
                invested *= (1 + (selectedContract.fund_monthly_interest / 100))
                // console.log(invested, 'invested second month')
            } else {
                while (currentDepositWithdrawalDate.getMonth() === iDate.getMonth()) {
                    if (currentDepositWithdrawal.type === "deposit") {
                        invested += parseFloat(currentDepositWithdrawal.amount.slice(2).split(".").join("").replace(",", "."));
                        invested += (monthDays[currentDepositWithdrawalDate.getMonth()] - currentDepositWithdrawalDate.getDate()) * ((selectedContract.fund_monthly_interest / 100)/ monthDays[currentDepositWithdrawalDate.getMonth()]) * invested
                    } else {
                        invested -= parseFloat(currentDepositWithdrawal.amount.slice(2).split(".").join("").replace(",", "."));
                    }
                    
                    if (iEffectiveDate + 1 <= effectiveDepositsWithdrawalsSorted.length - 1) {
                        iEffectiveDate++
                        currentDepositWithdrawal = effectiveDepositsWithdrawalsSorted[iEffectiveDate]
                        currentDepositWithdrawalDate = new Date(currentDepositWithdrawal.effective_date);
                    } else {
                        break
                    }
                }
                iDate.setMonth(iDate.getMonth() + 1);
                invested *= (1 + (selectedContract.fund_monthly_interest / 100))
                // console.log(invested, 'monthly')
            }
        }
        // effectiveDeposits.forEach((deposit, i) => {
        //     const depositEffectiveDate = new Date(deposit.effective_date);
        //     const firstMonth = ((monthDays[depositEffectiveDate.getMonth()] - depositEffectiveDate.getDate()) * ((selectedContract.fund_monthly_interest / 100)/ monthDays[depositEffectiveDate.getMonth()]) + 1) * deposit.amount.slice(2).split(".").join("").replace(",", ".");
            
        //     const depositProfit = [firstMonth]
        //     let totalMonths = 0;
        //     let iDate = new Date(deposit.effective_date);
        
        //     while (iDate.getFullYear() !== currentDate.getFullYear() || iDate.getMonth() !== currentDate.getMonth()) {
        //         if (iDate.getMonth() === 11) {
        //             iDate.setFullYear(iDate.getFullYear() + 1);
        //             iDate.setMonth(0);
  
        //         } else {
        //             iDate.setMonth(iDate.getMonth() + 1);
                    
        //         }
        //         totalMonths++;

        //         }
        //     totalMonths--;
            
        //     for (let i = 0; i < totalMonths; i++) {
        //         depositProfit.push(depositProfit[depositProfit.length - 1] * (1 + (selectedContract.fund_monthly_interest / 100)))
        //     }
            
        //     profit.push(depositProfit[depositProfit.length - 1]);
            
        //     }
        // )
        return invested.toFixed(2);
    }   

    const canSubmit = () => {
        if (!selectedFund) {
            return {disable: true, message: "Please select a contract"}
        }
        if (amount) {
            if (Number(amount) > Number(calculateProfit())) {
                console.log(amount, calculateProfit(), 'amount - profit')
                return {disable: true, message: "The input amount is greater than the available amount"}
            }
            return {disable: false, message: "Amount is valid"}
        }
        return {disable: true, message: "An amount is required"}
    }

    const handleWithdrawalSubmit = (event) => {
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // setDepositStatus('Processing...')
        // const status = await requestCreateDepositRequest(Object.fromEntries(data))
        // setDepositStatus(status)
        // dispatch(createDepositRequest(Object.fromEntries(data)))
    }

    const closeModal = (event) => {
        if (event.target.id === "withdraw-hidden" || event.target.id === "close-modal-x") {
            setShowWithdrawForm(false)
            dispatch(resetAccountWithdrawalForm())
            // document.getElementById("deposit-currency").value = "COP"
            // document.getElementById("deposit-amount").value = null
            // document.getElementById("deposit-contract").value = "Event Driven"
        }
        return null
    }
    if (authStatusLoading ) return null
    return (
        <>
            <section className="section-title">
                <h1>Withdraw</h1>
            </section>
            <section id="withdraw-hidden" style={showWithdrawForm ? {visibility: "visible"} : {display: "none"}} onClick={closeModal}>
                <section id="withdraw-hidden-container">
                    <div className="close-modal">
                        <i className="fa-solid fa-circle-xmark" id="close-modal-x" onClick={closeModal}></i>
                    </div>
                    <section id="withdraw-form" className="money-move-form">
                        <form onSubmit={handleWithdrawalSubmit}>
                            <p>USDCOP: {trm ? trm.trm : "Loading..."}</p>
                            <select id="withdraw-contract" name="contract" onChange={handleChange}>
                                {available && available.map(contract => <option key={contract.fund_name} value={contract.fund_name}>{contract.fund_name}</option>)}
                                {!available && <option value={null}>No funds available</option>}
                            </select>
                            <p>Available to withdraw: {(available && selectedContract) && '$' + calculateProfit() + ' ' + selectedContract.deposits[0].currency}</p> 
                            <label htmlFor="amount">Enter the amount you want to withdraw</label>
                            <input type="number" name="amount" placeholder="Amount" id="withdraw-amount" onChange={handleChange} value={amount}/>
                            <p>{(selectedContract && selectedContract.deposits[0].currency === "COP" && trm) ? "= $"+(amount / parseFloat(trm.trm.slice(1).split(',').join(''))).toFixed(2).toString() + " USD" : (selectedContract && selectedContract.deposits[0].currency === "USD" && trm) ? "= $"+(amount * parseFloat(trm.trm.slice(1).split(',').join(''))).toFixed(2).toString() + " COP"  : "Loading..."}</p>
                            <p style={{color: withdrawStatusLoading  ? "black" : withdrawStatus === 200 ? "green" : "red", visibility: withdrawStatus ? "visible" : "hidden"}}>{withdrawStatusLoading ? 'Processing...' : withdrawStatus === 200 ? "Withdrawal successful" : withdrawStatus === 400 ? "A withdrawal for this contracts is pending. Please wait until your prior withdraw is processed" : "Withdrawal failed"}</p>
                            <input type="hidden" name="exchangeRate" value={trm ? trm.trm : null} />
                            <input style={{maxWidth: "100%", whiteSpace: "normal"}} type="submit" value={submitState.disable ? submitState.message : "Withdraw"} disabled={submitState.disable} />
                            <p>Once we process your withdrawal, you will receive an email confirmation and your funds will be available in your bank account</p>
                        </form>
                    </section>
                </section>
            </section>
               
            <section id="withdraw" className="history">
                <section id="history-header">
                    <h2>Withdrawal History</h2>
                    <p onClick={() => setShowWithdrawForm(true)} ><i class="fa-solid fa-circle-dollar-to-slot"></i>Withdraw</p>  
                </section>
                <section id="history-filters">
                    <div>
                        <label htmlFor="history-show">Show </label>
                        <select id="history-show" onChange={handleChange}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <span> entries</span>
                    </div>
                    <div>
                        <select id="filter-column" onChange={handleChange}>
                            <option value="id">ID</option>
                            <option value="date">Date</option>
                            <option value="effective_date">Effective date</option>
                            <option value="fund_name">Fund</option>
                            <option value="currency">Currency</option>
                            <option value="exchange_rate">Exchange rate</option>
                            <option value="amount">Amount</option>
                            <option value="status">Status</option>
                        </select>
                        <input id="filter-search" type="search" name="search" placeholder="Search"  onChange={handleChange} value={filterSearch}></input>
                    </div>
                </section> 
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Effective Date</th>
                            <th>Fund</th>
                            <th>Currency</th>
                            <th>Exchange Rate</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(withdrawals.length === 0 || withdrawalsFilteredBySearch.length === 0) && <tr>
                            <td colSpan={8}>No Withdrawals</td>
                        </tr>}
                        {withdrawals.length > 0 && 
                        filterSearch && 
                        withdrawalsFilteredBySearch.slice(Number(showEntries)*historyPage, (historyPage+1)*Number(showEntries)>withdrawalsFilteredBySearch.length ? withdrawalsFilteredBySearch.length+1 : (historyPage+1)*Number(showEntries)).map((withdrawal) => {
                            return (
                                <tr key={withdrawal.id}>
                                    <td className="wd-history-id">{withdrawal.id}</td>
                                    <td>{withdrawal.date.split('T')[0].split("-").reverse().join("-")}</td>
                                    <td>{withdrawal.effective_date ? withdrawal.effective_date.split('T')[0].split("-").reverse().join("-") : "N/A"}</td>
                                    <td>{withdrawal.fund_name}</td>
                                    <td className="wd-history-id">{withdrawal.contract_id}</td>
                                    <td>{withdrawal.currency}</td>
                                    <td>{withdrawal.exchange_rate}</td>
                                    <td>{withdrawal.amount}</td>
                                    <td>{withdrawal.status}</td>
                                </tr>
                            )
                        })}
                        {withdrawals.length > 0 && 
                        !filterSearch && 
                        withdrawals.slice(Number(showEntries)*historyPage, (historyPage+1)*Number(showEntries)>withdrawals.length ? withdrawals.length+1 : (historyPage+1)*Number(showEntries)).map((withdrawal) => {
                            return (
                                <tr key={withdrawal.id}>
                                    <td className="wd-history-id">{withdrawal.id}</td>
                                    <td>{withdrawal.date.split('T')[0].split("-").reverse().join("-")}</td>
                                    <td>{withdrawal.effective_date ? withdrawal.effective_date.split('T')[0].split("-").reverse().join("-") : "N/A"}</td>
                                    <td>{withdrawal.fund_name}</td>
                                    <td className="wd-history-id">{withdrawal.contract_id}</td>
                                    <td>{withdrawal.currency}</td>
                                    <td>{withdrawal.exchange_rate}</td>
                                    <td>{withdrawal.amount}</td>
                                    <td>{withdrawal.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <section id="showing-entries">
                    {(filterSearch && withdrawalsFilteredBySearch.length > 0) && (
                        <p>Showing {Number(showEntries)*historyPage+1} to {(historyPage+1)*Number(showEntries)>withdrawalsFilteredBySearch.length ? withdrawalsFilteredBySearch.length : (historyPage+1)*Number(showEntries)} of {withdrawalsFilteredBySearch.length} entries</p>)}
                    {(filterSearch && withdrawalsFilteredBySearch.length === 0) && (
                        <p>Showing 0 to 0 of 0 entries</p>)}
                    {(!filterSearch && withdrawals.length > 0) && (
                        <p>Showing {Number(showEntries)*historyPage+1} to {(historyPage+1)*Number(showEntries)>withdrawals.length ? withdrawals.length : (historyPage+1)*Number(showEntries)} of {withdrawals.length} entries</p>)}
                    {(!filterSearch && withdrawals.length === 0) && (
                        <p>Showing 0 to 0 of 0 entries</p>)}
                    <section>
                        <button onClick={()=>historyPage === 0 ? null : dispatch(setAccountWithdrawalHistoryPage(historyPage - 1))}><i class="fa-solid fa-chevron-left"></i>Previous</button>
                        {!filterSearch && <button onClick={()=>(historyPage+1)*Number(showEntries) > withdrawals.length ? null : dispatch(setAccountWithdrawalHistoryPage(historyPage + 1))}>Next<i class="fa-solid fa-chevron-right"></i></button>}
                        {filterSearch && <button onClick={()=>(historyPage+1)*Number(showEntries) > withdrawalsFilteredBySearch.length ? null : dispatch(setAccountWithdrawalHistoryPage(historyPage + 1))}>Next<i class="fa-solid fa-chevron-right"></i></button>}
                    </section>
                </section>
            </section>
        </>
    )
}