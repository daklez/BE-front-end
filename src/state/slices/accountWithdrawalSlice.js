import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectUserContracts, selectFunds } from "./authSlice";

// export const createWithdrawRequest = createAsyncThunk(
//     "accountWithdraw/createWithdrawRequest", requestCreateWithdrawRequest
// )

const accountWithdrawalSlice = createSlice({
    name: "accountWithdrawal",
    initialState: {
        selectedFund: null,
        withdrawals: null,
        available: null,
        amount : null,
        disableSubmit: true,
        statusLoading: false,
        status: null,
        statusFailed: false,
        historyEntries: '10',
        historyPage: 0,
        filterColumn: 'id',
        filterSearch: '',
    },
    reducers: {
        setAccountWithdrawalSelectedFund: (state, action) => {
            state.selectedFund = action.payload
        },
        setAccountWithdrawalAmount: (state, action) => {
            state.amount = action.payload
        },
        setAccountWithdrawalDisableSubmit: (state, action) => {
            state.disableSubmit = action.payload
        },
        setAccountWithdrawalHistoryEntries: (state, action) => {
            state.historyEntries = action.payload
        },
        setAccountWithdrawalHistoryPage: (state, action) => {
            state.historyPage = action.payload
        },
        setAccountWithdrawalFilterColumn: (state, action) => {
            state.filterColumn = action.payload
        },
        setAccountWithdrawalFilterSearch: (state, action) => {
            state.filterSearch = action.payload
        },
        setAccountWithdrawalWithdrawals: (state, action) => {
            state.withdrawals = action.payload
        },
        setAccountWithdrawalAvailable: (state, action) => {
            state.available = action.payload
        },
        resetAccountWithdrawalForm: state => {
            state.selectedFund = null
            state.amount = null
            state.disableSubmit = true
            state.statusLoading = false
            state.status = null
            state.statusFailed = false
        },
        resetAccountWithdrawalStatus: state => {
            state.status = null
            state.statusFailed = false
            state.statusLoading = false
        }
    },
})


export const selectAccountWithdrawalAvailable = state => {
    const userContracts = selectUserContracts(state);
    if (!userContracts) return [];
    return userContracts.filter(contract => {
        if (contract.contract_active_since) {
            if (contract.fund_monthly_withdrawals) {
                return true
            }
            if (contract.fund_investment_period === 'Annual') {
                return (Date.now() - new Date(contract.contract_active_since).getTime()) / (1000 * 60 * 60 * 24 * 365) >= 1
            }
        }
        return false
    })
}
export const selectAccountWithdrawalUserWithdrawals = state => {
    const userContracts = selectUserContracts(state);
    if (!userContracts) return [];
    const userWithdrawals = JSON.parse(JSON.stringify(userContracts)).map(contract => [...contract.withdrawals]).flat()
    userWithdrawals.forEach(withdrawal => withdrawal.fund_name = userContracts.find(contract => contract.contract_id === withdrawal.contract_id).fund_name)
    return userWithdrawals
}
export const selectAccountWithdrawalWithdrawals = state => state.accountWithdrawal.withdrawals
export const selectAccountWithdrawalAmount = state => state.accountWithdrawal.amount
export const selectAccountWithdrawalDisableSubmit = state => state.accountWithdrawal.disableSubmit
export const selectAccountWithdrawalHistoryEntries = state => state.accountWithdrawal.historyEntries
export const selectAccountWithdrawalHistoryPage = state => state.accountWithdrawal.historyPage
export const selectAccountWithdrawalFilterColumn = state => state.accountWithdrawal.filterColumn
export const selectAccountWithdrawalFilterSearch = state => state.accountWithdrawal.filterSearch
export const selectAccountWithdrawalSelectedFund = state => state.accountWithdrawal.selectedFund
export const selectAccountWithdrawalStatusLoading = state => state.accountWithdrawal.statusLoading;
export const selectAccountWithdrawalStatus = state => state.accountWithdrawal.status;
export const selectAccountWithdrawalWithdrawalsFilteredBySearch = state => {
    const withdrawals = selectAccountWithdrawalWithdrawals(state);
    const filterColumn = selectAccountWithdrawalFilterColumn(state);
    const filterSearch = selectAccountWithdrawalFilterSearch(state);
    return withdrawals.filter(withdrawal => withdrawal[filterColumn].includes(filterSearch))
}

export const {
    setAccountWithdrawalSelectedFund,
    setAccountWithdrawalAmount,
    setAccountWithdrawalDisableSubmit,
    setAccountWithdrawalHistoryEntries,
    setAccountWithdrawalHistoryPage,
    setAccountWithdrawalFilterColumn,
    setAccountWithdrawalFilterSearch,
    setAccountWithdrawalWithdrawals,
    setAccountWithdrawalAvailable,
    resetAccountWithdrawalForm,
    resetAccountWithdrawalStatus
} = accountWithdrawalSlice.actions

export default accountWithdrawalSlice.reducer