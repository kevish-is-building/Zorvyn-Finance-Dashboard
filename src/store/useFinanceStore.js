import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  createTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from '../services/mockTransactionsApi'
import { defaultFilters } from '../utils/transactions'

const preferencesStorage = createJSONStorage(() => localStorage)

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      role: 'viewer',
      theme: 'light',
      activeTab: 'overview',
      isControlsExpanded: false,
      filters: defaultFilters,
      transactions: [],
      isLoading: false,
      isSaving: false,
      error: '',
      editingTransactionId: null,
      initialized: false,

      initialize: async () => {
        if (get().initialized || get().isLoading) {
          return
        }

        set({ isLoading: true, error: '' })

        try {
          const transactions = await fetchTransactions()
          set({ transactions, initialized: true, isLoading: false })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to load transactions.',
          })
        }
      },

      retryInitialize: async () => {
        set({ initialized: false })
        await get().initialize()
      },

      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      setActiveTab: (activeTab) => set({ activeTab }),
      toggleControlsExpanded: () =>
        set((state) => ({
          isControlsExpanded: !state.isControlsExpanded,
        })),
      toggleRole: () =>
        set((state) => ({
          role: state.role === 'admin' ? 'viewer' : 'admin',
          editingTransactionId: null,
        })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setFilter: (field, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [field]: value,
          },
        })),

      resetFilters: () =>
        set({
          filters: {
            ...defaultFilters,
          },
        }),

      clearError: () => set({ error: '' }),

      startEditing: (transactionId) =>
        set({
          editingTransactionId: transactionId,
          activeTab: 'transactions',
        }),

      cancelEditing: () => set({ editingTransactionId: null }),

      addTransaction: async (payload) => {
        set({ isSaving: true, error: '' })

        try {
          const next = await createTransaction(payload)

          set((state) => ({
            transactions: [next, ...state.transactions],
            isSaving: false,
          }))
        } catch (error) {
          set({
            isSaving: false,
            error: error instanceof Error ? error.message : 'Failed to create transaction.',
          })

          throw error
        }
      },

      saveTransaction: async (transactionId, payload) => {
        set({ isSaving: true, error: '' })

        try {
          const updated = await updateTransaction(transactionId, payload)

          set((state) => ({
            transactions: state.transactions.map((item) =>
              item.id === transactionId ? updated : item,
            ),
            editingTransactionId: null,
            isSaving: false,
          }))
        } catch (error) {
          set({
            isSaving: false,
            error: error instanceof Error ? error.message : 'Failed to update transaction.',
          })

          throw error
        }
      },

      removeTransaction: async (transactionId) => {
        set({ isSaving: true, error: '' })

        try {
          await deleteTransaction(transactionId)

          set((state) => ({
            transactions: state.transactions.filter((item) => item.id !== transactionId),
            editingTransactionId:
              state.editingTransactionId === transactionId ? null : state.editingTransactionId,
            isSaving: false,
          }))
        } catch (error) {
          set({
            isSaving: false,
            error: error instanceof Error ? error.message : 'Failed to delete transaction.',
          })

          throw error
        }
      },
    }),
    {
      name: 'finance-dashboard-preferences',
      storage: preferencesStorage,
      partialize: (state) => ({
        role: state.role,
        theme: state.theme,
        activeTab: state.activeTab,
        filters: state.filters,
      }),
    },
  ),
)
