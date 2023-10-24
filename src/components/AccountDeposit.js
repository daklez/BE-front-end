import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { requestTRM, requestCreateDepositRequest, requestReadFunds } from "../utils";
import FundInfo from "./FundInfo";
import { useSelector, useDispatch } from "react-redux";//new redux
import { selectUserContracts, selectFunds, selectTRM } from "../state/slices/authSlice";//new redux
import {
    selectAccountDepositUserDeposits, 
    selectAccountDepositCurrency, 
    setAccountDepositCurrency,
    selectAccounDepositSelectedFund,
    setAccountDepositSelectedFund,
    selectAccountDepositsAmount,
    setAccountDepositsAmount,
    selectAccountDepositStatusLoading,
    selectAccountDepositStatus,
    createDepositRequest,
    selectAccountDepositDisableSubmit,
    setAccountDepositDisableSubmit,
    selectAccountDepositHistoryEntries,
    setAccountDepositHistoryEntries,
    selectAccountDepositHistoryPage,
    setAccountDepositHistoryPage,
    selectAccountDepositFilterColumn,
    setAccountDepositFilterColumn,
    selectAccountDepositFilterSearch,
    setAccountDepositFilterSearch,
    selectAccountDepositDeposits,
    setAccountDepositDeposits,
    selectAccountDepositDepositsFilteredBySearch,
    resetAccountDepositForm,
    resetAccountDepositStatus
} from "../state/slices/accountDepositSlice";
import { checkAuthUser, selectAuthStatusLoading } from "../state/slices/authSlice";

export default function AccountDeposit() {
    // const user = useOutletContext()
    // const userContracts = JSON.parse(JSON.stringify(user.data.contracts))
    // const [trm, setTrm] = useState(null)
    // const [funds, setFunds] = useState(null)
    const dispatch = useDispatch()
    const userContracts =  useSelector(selectUserContracts)
    const trm = useSelector(selectTRM)
    const funds = useSelector(selectFunds)
    const authStatusLoading = useSelector(selectAuthStatusLoading)
    // trm = trm ? trm.trm : null
    // const userDeposits = useSelector(selectAccountDepositUserDeposits)
    // const userDeposits = userContracts.map(contract => [...contract.deposits]).flat()
    // const userDepositsSet = userContracts.map(contract => [...contract.deposits]).flat()
    // userDepositsSet.forEach(deposit => {
    //     deposit.fund_name = userContracts.find(contract => contract.contract_id === deposit.contract_id).fund_name
    //  })
    // const userDeposits = useSelector(selectAccountDepositUserDeposits)
    
    // const [selectedFund, setSelectedFund] = useState(funds ? funds.data.filter(f => f.name === 'Event Driven')[0] : null)
    const selectedFund = useSelector(selectAccounDepositSelectedFund)
    // const [currencyState, setCurrencyState] = useState("COP")
    const currencyState = useSelector(selectAccountDepositCurrency)
    // const [amountState, setAmountState] = useState(null)
    const amountState = useSelector(selectAccountDepositsAmount)
    const [showDepositForm, setShowDepositForm] = useState(false)
    const depositStatusLoading =  useSelector(selectAccountDepositStatusLoading)
    // const [depositStatus, setDepositStatus] = useState(null)
    const depositStatus = useSelector(selectAccountDepositStatus)
    // const [submitState, setSubmitState] = useState(true)
    const submitState = useSelector(selectAccountDepositDisableSubmit)
    // const [entries, setEntries] = useState(10)
    // const [showEntries, setShowEntries] = useState('10')
    const showEntries = useSelector(selectAccountDepositHistoryEntries)
    // const [historyPage, setHistoryPage] = useState(0)
    const historyPage = useSelector(selectAccountDepositHistoryPage)
    // userDeposits.forEach(deposit => {
    //     deposit.fund_name = userContracts.find(contract => contract.contract_id === deposit.contract_id).fund_name
    //  })
    
    // const [filterColumn, setFilterColumn] = useState('id')
    // const filterColumn = useSelector(selectAccountDepositFilterColumn)
    // const [filterSearch, setFilterSearch] = useState('')
    const filterSearch = useSelector(selectAccountDepositFilterSearch)
    // const [deposits, setDeposits] = useState(userDeposits.slice())
    const deposits = useSelector(selectAccountDepositDeposits)
    // const [despositsFilteredBySearch, setDepositsFilteredBySearch] = useState(deposits)
    const depositsFilteredBySearch = useSelector(selectAccountDepositDepositsFilteredBySearch)
    // console.log(deposits, 'deposits', userDeposits, 'userDeposits')
    // return <h1>Testing</h1>
    // useEffect(() => {
    //     requestTRM().then(res => {
    //         setTrm(res.trm)
    //     })
    //     requestReadFunds().then(res => {
    //         console.log(res, typeof res)
    //         setFunds(res)
    //         setSelectedFund(res.data[0])
    //     })
    // }, [])

    useEffect(() => {
        if (depositStatus === 200){
            dispatch(checkAuthUser())
        }
    }, [depositStatus])

    useEffect(() => {
        // setSubmitState(canSubmit())
        dispatch(setAccountDepositDisableSubmit(canSubmit()))
    }, [selectedFund, currencyState, amountState, trm, funds, showDepositForm])



    const handleChange = (event) => {
        const id = event.target.id;
        if (id === "deposit-currency") {
            // setCurrencyState(event.target.value)
            dispatch(setAccountDepositCurrency(event.target.value))
            // setAmountState(0)
            if (amountState) {
               dispatch(setAccountDepositsAmount(null)) 
            }
            if (depositStatus){
                dispatch(resetAccountDepositStatus())
            }
        }
        if (id === "deposit-amount") {
            // setAmountState(event.target.value)
            dispatch(setAccountDepositsAmount(event.target.value))
            if (depositStatus){
                dispatch(resetAccountDepositStatus())
            }
        }
        if (id === "deposit-contract") {
            // setSelectedFund(funds.data.filter(f => f.name === event.target.value)[0])
            dispatch(setAccountDepositSelectedFund(event.target.value))
            if (depositStatus){
                dispatch(resetAccountDepositStatus())
            }
        }
        if (id === "history-show") {
            // setShowEntries(event.target.value)
            dispatch(setAccountDepositHistoryEntries(event.target.value))
            // setHistoryPage(0)
            if (historyPage > 0) {
                dispatch(setAccountDepositHistoryPage(0))
            }
        }
        if (id === 'filter-column') {
            // setFilterColumn(event.target.value)
            dispatch(setAccountDepositFilterColumn(event.target.value))
            // setDepositsFilteredBySearch(deposits)
        }
        if (id === 'filter-search') {
            // setFilterSearch(event.target.value)
            dispatch(setAccountDepositFilterSearch(event.target.value))
            // setDepositsFilteredBySearch(deposits.filter(deposit => deposit[filterColumn].includes(event.target.value)))
            if (historyPage > 0) {
                dispatch(setAccountDepositHistoryPage(0))
            }
        }
    }

    const handleDepositSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // setDepositStatus('Processing...')
        // const status = await requestCreateDepositRequest(Object.fromEntries(data))
        // setDepositStatus(status)
        dispatch(createDepositRequest(Object.fromEntries(data)))
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
                const depositsCopy = deposits.slice();
                depositsCopy.sort(sortingFunction)
                // setDeposits(depositsCopy)
                dispatch(setAccountDepositDeposits(depositsCopy))
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
                const depositsCopy = deposits.slice();
                depositsCopy.sort(sortingFunction)
                // setDeposits(depositsCopy)
                dispatch(setAccountDepositDeposits(depositsCopy))
            }
        }
    }

    const canSubmit = () => {
        if (amountState) {
            //if (user.data.contracts.filter(c => c.fund_name === selectedFund.name && c.currency === currencyState).length > 0  ) {//old
            if (userContracts.filter(c => c.fund_name === selectedFund.name && c.deposits[0].currency === currencyState).length > 0  ) {
                if (amountState > 0) {
                    return {disable: false, message: "Amount is valid"}
                } else {
                    return {disable: true, message: "The amount must be greater than 0"}
                }
                
            } else {
                if (currencyState === "COP") {
                    if (!trm) {
                        return {disable: true, message: "Loading TRM... "}
                    }
                    if (trm && (amountState / parseFloat(trm.trm.slice(1).split(',').join(''))).toFixed(2) >= Number(selectedFund.minimum_deposit.slice(2, -3).split(".").join("").replace(",", "."))) {
                        return {disable: false, message: "Amount is valid"}
                    }
                } else {
                    if (parseFloat(amountState) >= selectedFund.minimum_deposit.slice(2, -3).split(".").join("")) {
                        return {disable: false, message: "Amount is valid"}
                    }
                }
                return {disable: true, message: "The amount must be greater than or equal to the minimum investment"}
            } 
        } else {
           return {disable: true, message: "An amount is required"}  
        }
    }

    const closeModal = (event) => {
        if (event.target.id === "deposit-hidden" || event.target.id === "close-modal-x") {
            setShowDepositForm(false)
            dispatch(resetAccountDepositForm())
            document.getElementById("deposit-currency").value = "COP"
            document.getElementById("deposit-amount").value = null
            document.getElementById("deposit-contract").value = "Event Driven"
        }
        return null
    }

    if (authStatusLoading){
        return (
            <div className="auth-loading">
                <p>Loading...</p>
            </div>
        )
    } else {
        return (
        <>
            <section className="section-title">
                <h1>Deposit</h1>
            </section>
            <section id="deposit-hidden" style={showDepositForm ? {visibility: "visible"} : {display: "none"}} onClick={closeModal}>
                <section id="deposit-hidden-container" >
                    <div className="close-modal">
                        <i className="fa-solid fa-circle-xmark" id="close-modal-x" onClick={closeModal}></i>
                    </div>
                    <section id="deposit-instructions-form">
                        <section id="deposit-instructions">
                            <h2>Instructions for Wire Transfers</h2>
                            <p>Wire transfers received before 1 p.m. UTC will be processed and available in your account on the following business day.</p>
                            <h3>Currency: <span>COP</span></h3>
                            <h3>Financing Details</h3>
                            <ul>
                                <h4>Recipient:</h4>  
                                <li>Arnol Fernando Perez Camacho</li>
                                <h4>ID Number:</h4>
                                <li>1026580783</li>
                                <h4>Bank:</h4>
                                <li>Bancolombia</li>
                                <h4>Account Number:</h4>
                                <li>04190427850</li>
                                <h4>Type:</h4>
                                <li>Savings</li>
                            </ul>
                            <p>Note: The full name of the originating bank account must always match the name on your investment account, except if the joint owner of the originating bank account is a spouse.</p>
                        </section>
                        <section id="deposit-form" className="money-move-form">
                            <form onSubmit={handleDepositSubmit}>
                                <p>USDCOP: {trm ? trm.trm : "Loading..."}</p>
                                <label htmlFor="deposit-currency">Select the currency you want your contract to be in:</label>
                                <select id="deposit-currency" name="currency" onChange={handleChange} >
                                    <option value="COP" >COP</option>
                                    <option value="USD">USD</option>
                                </select>
                                <label htmlFor="deposit-contract">Select the product you want to invest in:</label>
                                <select id="deposit-contract" name="contract" onChange={handleChange}>
                                    {funds && funds.data.map((fund) => {
                                        return <option key={fund.id} value={fund.name}>{fund.name}</option>
                                    })}
                                </select>
                                {selectedFund && <FundInfo  monthlyInterest={selectedFund.monthly_interest} monthlyWithdrawals={selectedFund.monthly_withdrawals} investmentPeriod={selectedFund.investment_period} minimumDeposit={selectedFund.minimum_deposit} /> }
                                <label htmlFor="deposit-amount">Enter the amount you want to deposit:</label>
                                <input id="deposit-amount" type="number" name="amount" placeholder="Amount" onChange={handleChange} value={amountState} />
                                <p>{(currencyState === "COP" && trm) ? "= $"+(amountState / parseFloat(trm.trm.slice(1).split(',').join(''))).toFixed(2).toString() + " USD" : (currencyState === "USD" && trm) ? "= $"+(amountState * parseFloat(trm.trm.slice(1).split(',').join(''))).toFixed(2).toString() + " COP"  : "Loading..."}</p>
                                <input type="hidden" name="exchangeRate" value={trm ? trm.trm : null} />
                                {/* <p style={{color: depositStatus === 'Processing...' ? "black" : depositStatus === 200 ? "green" : "red", visibility: depositStatus ? "visible" : "hidden"}}>{depositStatus === 'Processing...' ? depositStatus : depositStatus === 200 ? "Deposit successful" : depositStatus === 400 ? "A deposit for this contracts is pending. Please wait until your prior deposit is processed" : "Deposit failed"}</p> */}
                                <p style={{color: depositStatusLoading  ? "black" : depositStatus === 200 ? "green" : "red", visibility: depositStatus ? "visible" : "hidden"}}>{depositStatusLoading ? 'Processing...' : depositStatus === 200 ? "Deposit successful" : depositStatus === 400 ? "A deposit for this contracts is pending. Please wait until your prior deposit is processed" : "Deposit failed"}</p>
                                <input style={{maxWidth: "100%", whiteSpace: "normal"}} type="submit" value={submitState.disable ? submitState.message : "Deposit"} disabled={submitState.disable} />
                                <p>Once we receive your deposit, you will receive an email confirmation and your available balance will be updated</p>
                            </form>
                        </section> 
                    </section>
                </section>
            </section>
            <section id="deposit-history" className="history">
                <section id="history-header">
                    <h2>Deposit History</h2>
                    <p onClick={() => setShowDepositForm(true)}><i className="fa-solid fa-circle-dollar-to-slot" ></i>New Deposit</p>
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
                            <option value="contract_id">Contract ID</option>
                            <option value="currency">Currency</option>
                            <option value="exchange_rate">Exchange rate</option>
                            <option value="amount">Amount</option>
                            <option value="status">Status</option>
                        </select>
                        <input id="filter-search" type="search" name="search" placeholder="Search" onChange={handleChange} value={filterSearch}></input>
                    </div>
                </section>
                <table>      
                    <thead>
                        <tr>
                            <th id="history-id">ID</th>
                            <th id="history-date">Date <i class="fa-solid fa-arrow-up-wide-short" onClick={sortHistoryBy("date", "asc")}></i><i class="fa-solid fa-arrow-down-short-wide" onClick={sortHistoryBy("date", "desc")}></i>  </th>
                            <th id="history-effective-date">Effective Date <i class="fa-solid fa-arrow-up-wide-short" onClick={sortHistoryBy("effective_date", "asc")}></i><i class="fa-solid fa-arrow-down-short-wide" onClick={sortHistoryBy("effective_date", "desc")}></i></th>
                            <th id="history-fund" >fund <i class="fa-solid fa-arrow-up-wide-short" onClick={sortHistoryBy("fund_name", "asc")}></i><i class="fa-solid fa-arrow-down-short-wide" onClick={sortHistoryBy("fund_name", "desc")}></i></th>
                            <th id="history-contract-id">contract id</th>
                            <th id="history-currency">currency <i class="fa-solid fa-arrow-up-wide-short" onClick={sortHistoryBy("currency", "asc")}></i><i class="fa-solid fa-arrow-down-short-wide" onClick={sortHistoryBy("currency", "desc")}></i></th>
                            <th id="history-exchange-rate">exchange rate <i class="fa-solid fa-arrow-up-wide-short" onClick={sortHistoryBy("exchange_rate", "asc")}></i><i class="fa-solid fa-arrow-down-short-wide" onClick={sortHistoryBy("exchange_rate", "desc")}></i></th>
                            <th id="history-amount">Amount <i class="fa-solid fa-arrow-up-wide-short" onClick={sortHistoryBy("amount", "asc")}></i><i class="fa-solid fa-arrow-down-short-wide" onClick={sortHistoryBy("amount", "desc")}></i></th>
                            <th id="history-status">Status <i class="fa-solid fa-arrow-up-wide-short" onClick={sortHistoryBy("status", "asc")}></i><i class="fa-solid fa-arrow-down-short-wide" onClick={sortHistoryBy("status", "desc")}></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(deposits.length === 0 || depositsFilteredBySearch.length === 0) && 
                        (<tr>
                            <td colSpan={9}>No Deposits</td>
                        </tr>)}
                        {deposits.length > 0 && 
                        filterSearch && 
                        depositsFilteredBySearch.slice(Number(showEntries)*historyPage, (historyPage+1)*Number(showEntries)>depositsFilteredBySearch.length ? depositsFilteredBySearch.length+1 : (historyPage+1)*Number(showEntries)).map((deposit) => {
                            return (
                                <tr key={deposit.id}>
                                    <td className="wd-history-id">{deposit.id}</td>
                                    <td>{deposit.date.split('T')[0].split("-").reverse().join("-")}</td>
                                    <td>{deposit.effective_date ? deposit.effective_date.split('T')[0].split("-").reverse().join("-") : "N/A"}</td>
                                    <td>{deposit.fund_name}</td>
                                    <td className="wd-history-id">{deposit.contract_id}</td>
                                    <td>{deposit.currency}</td>
                                    <td>{deposit.exchange_rate}</td>
                                    <td>{deposit.amount}</td>
                                    <td>{deposit.status}</td>
                                </tr>
                            )
                        })}
                        {deposits.length > 0 && 
                        !filterSearch  && 
                        deposits.slice(Number(showEntries)*historyPage, (historyPage+1)*Number(showEntries)>deposits.length ? deposits.length+1 : (historyPage+1)*Number(showEntries)).map((deposit) => {
                            return (
                                <tr key={deposit.id}>
                                    <td className="wd-history-id">{deposit.id}</td>
                                    <td>{deposit.date.split('T')[0].split("-").reverse().join("-")}</td>
                                    <td>{deposit.effective_date ? deposit.effective_date.split('T')[0].split("-").reverse().join("-") : "N/A"}</td>
                                    <td>{deposit.fund_name}</td>
                                    <td className="wd-history-id">{deposit.contract_id}</td>
                                    <td>{deposit.currency}</td>
                                    <td>{deposit.exchange_rate}</td>
                                    <td>{deposit.amount}</td>
                                    <td>{deposit.status}</td>
                                </tr>
                                )
                            }   
                        )}
                    </tbody>
                </table>
                <section id="showing-entries">
                    {(filterSearch && depositsFilteredBySearch.length > 0) && (
                        <p>Showing {Number(showEntries)*historyPage+1} to {(historyPage+1)*Number(showEntries)>depositsFilteredBySearch.length ? depositsFilteredBySearch.length : (historyPage+1)*Number(showEntries)} of {depositsFilteredBySearch.length} entries</p>)}
                    {(filterSearch && depositsFilteredBySearch.length === 0) && (
                        <p>Showing 0 to 0 of 0 entries</p>)}
                    {(!filterSearch && deposits.length > 0) && (
                        <p>Showing {Number(showEntries)*historyPage+1} to {(historyPage+1)*Number(showEntries)>deposits.length ? deposits.length : (historyPage+1)*Number(showEntries)} of {deposits.length} entries</p>)}
                    {(!filterSearch && deposits.length === 0) && (
                        <p>Showing 0 to 0 of 0 entries</p>)}
                    <section>
                        {/* <button onClick={()=>historyPage === 0 ? null : setHistoryPage(historyPage - 1)}><i class="fa-solid fa-chevron-left"></i>Previous</button> */}
                        <button onClick={()=>historyPage === 0 ? null : dispatch(setAccountDepositHistoryPage(historyPage - 1))}><i class="fa-solid fa-chevron-left"></i>Previous</button>
                        {/* <button onClick={()=>(historyPage+1)*Number(showEntries) > deposits.length ? null : setHistoryPage(historyPage + 1)}>Next<i class="fa-solid fa-chevron-right"></i></button> */}
                        {!filterSearch && <button onClick={()=>(historyPage+1)*Number(showEntries) > deposits.length ? null : dispatch(setAccountDepositHistoryPage(historyPage + 1))}>Next<i class="fa-solid fa-chevron-right"></i></button>}
                        {filterSearch && <button onClick={()=>(historyPage+1)*Number(showEntries) > depositsFilteredBySearch.length ? null : dispatch(setAccountDepositHistoryPage(historyPage + 1))}>Next<i class="fa-solid fa-chevron-right"></i></button>}
                    </section>
                </section>
            </section>
        </>
    )
    }

    
}
