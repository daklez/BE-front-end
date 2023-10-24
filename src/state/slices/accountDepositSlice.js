import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectUserContracts, selectFunds } from "./authSlice";
import { requestCreateDepositRequest } from "../../utils";

export const createDepositRequest = createAsyncThunk(
    "accountDeposit/createDepositRequest", requestCreateDepositRequest
)

const accountDepositSlice = createSlice({
    name: "accountDeposit",
    initialState: {
        selectedFund: 'Event Driven',
        deposits: null,
        currency: 'COP',
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
        setAccountDepositCurrency: (state, action) => {
            state.currency = action.payload
        },
        setAccountDepositSelectedFund: (state, action) => {
            state.selectedFund = action.payload
        },
        setAccountDepositsAmount: (state, action) => {
            state.amount = action.payload
        },
        setAccountDepositDisableSubmit: (state, action) => {
            state.disableSubmit = action.payload
        },
        setAccountDepositHistoryEntries: (state, action) => {
            state.historyEntries = action.payload
        },
        setAccountDepositHistoryPage: (state, action) => {
            state.historyPage = action.payload
        },
        setAccountDepositFilterColumn: (state, action) => {
            state.filterColumn = action.payload
        },
        setAccountDepositFilterSearch: (state, action) => {
            state.filterSearch = action.payload
        },
        setAccountDepositDeposits: (state, action) => {
            state.deposits = action.payload
        },
        resetAccountDepositForm: state => {
            state.selectedFund = 'Event Driven'
            state.currency = 'COP'
            state.amount = null
            state.disableSubmit = true
            state.statusLoading = false
            state.status = null
            state.statusFailed = false
        },
        resetAccountDepositStatus: state => {
            state.status = null
            state.statusFailed = false
            state.statusLoading = false
        }
    },
    extraReducers: {
        [createDepositRequest.pending]: state => {
            state.statusLoading = true;
            state.statusFailed = false;
        },
        [createDepositRequest.fulfilled]: (state, action) => {
            state.statusLoading = false;
            state.statusFailed = false;
            state.status = action.payload
        },
        [createDepositRequest.rejected]: state => {
            state.statusLoading = false;
            state.statusFailed = true;
        },
    }
})
// 
export const selectAccountDepositUserDeposits = state => {
    const userContracts = selectUserContracts(state);
    if (!userContracts) return [];
    const userDeposits = JSON.parse(JSON.stringify(userContracts)).map(contract => [...contract.deposits]).flat()
    userDeposits.forEach(deposit => deposit.fund_name = userContracts.find(contract => contract.contract_id === deposit.contract_id).fund_name)
    return userDeposits
};
export const selectAccountDepositContractDeposits = state => {
    const userContracts = selectUserContracts(state);
    if (!userContracts) return [];
    return JSON.parse(JSON.stringify(userContracts)).map(contract => [...contract.deposits])
};
export const selectAccounDepositSelectedFund = state => {
    const funds = selectFunds(state);
    if (!funds) return [];
    return funds.data.filter(f => f.name === state.accountDeposit.selectedFund)[0];
}
export const selectAccountDepositCurrency = state => state.accountDeposit.currency;
export const selectAccountDepositsAmount = state => state.accountDeposit.amount;
export const selectAccountDepositStatusLoading = state => state.accountDeposit.statusLoading;
export const selectAccountDepositStatus = state => state.accountDeposit.status;
export const selectAccountDepositDisableSubmit = state => state.accountDeposit.disableSubmit;
export const selectAccountDepositHistoryEntries = state => state.accountDeposit.historyEntries;
export const selectAccountDepositHistoryPage = state => state.accountDeposit.historyPage;
export const selectAccountDepositFilterColumn = state => state.accountDeposit.filterColumn;
export const selectAccountDepositFilterSearch = state => state.accountDeposit.filterSearch;
export const selectAccountDepositDeposits = state => state.accountDeposit.deposits
export const selectAccountDepositDepositsFilteredBySearch = state => {
    const deposits = selectAccountDepositDeposits(state);
    const filterColumn = selectAccountDepositFilterColumn(state);
    const filterSearch = selectAccountDepositFilterSearch(state);
    return deposits.filter(deposit => deposit[filterColumn].includes(filterSearch))
}

export const { 
    setAccountDepositCurrency,
    setAccountDepositSelectedFund,
    setAccountDepositsAmount,
    setAccountDepositDisableSubmit,
    setAccountDepositHistoryEntries,
    setAccountDepositHistoryPage,
    setAccountDepositFilterColumn,
    setAccountDepositFilterSearch,
    setAccountDepositDeposits,
    resetAccountDepositForm,
    resetAccountDepositStatus 
} = accountDepositSlice.actions

export default accountDepositSlice.reducer;