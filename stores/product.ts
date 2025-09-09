import { defineStore } from 'pinia'

interface Option {
    uid: string
    skuCode: string
    displayName: string
    price: number
}

interface OptionType {
    optionTypeId: number
    displayName: string
    options: Option[]
}

interface Product {
    uid: string
    name: string
    slug: string
    description: string
}

interface SelectedOption {
    optionTypeId: number
    optionId: string
}

interface ProductState {
    product: Product | null
    optionTypes: OptionType[]
    selectedOptions: SelectedOption[]
    quantity: number
    isLoading: boolean
    error: string | null
}

export const useProductStore = defineStore('product', {
    state: (): ProductState => ({
        product: null,
        optionTypes: [],
        selectedOptions: [],
        quantity: 1,
        isLoading: false,
        error: null
    }),

    getters: {
        getSelectedOption: (state) => (optionTypeId: number) => {
            return state.selectedOptions.find(selected => selected.optionTypeId === optionTypeId)
        },

        getSelectedOptionDisplayName: (state) => (optionTypeId: number) => {
            const selectedOption = state.selectedOptions.find(selected => selected.optionTypeId === optionTypeId)
            if (!selectedOption) return null

            const optionType = state.optionTypes.find(type => type.optionTypeId === optionTypeId)
            if (!optionType) return null

            const option = optionType.options.find(opt => opt.uid === selectedOption.optionId)
            return option?.displayName || null
        },

        totalPrice: (state) => {
            let total = 0

            state.selectedOptions.forEach(selected => {
                const optionType = state.optionTypes.find(type => type.optionTypeId === selected.optionTypeId)
                if (optionType) {
                    const option = optionType.options.find(opt => opt.uid === selected.optionId)
                    if (option) {
                        total += option.price
                    }
                }
            })

            return total * state.quantity
        },

        formattedPrice(): string {
            const price = this.totalPrice
            return `$${(price / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
        },
    },

    actions: {
        setProduct(product: Product) {
            this.product = product
        },

        setOptionTypes(optionTypes: OptionType[]) {
            this.optionTypes = optionTypes
            this.selectedOptions = optionTypes.map(type => ({
                optionTypeId: type.optionTypeId,
                optionId: type.options[0]?.uid || ''
            }))
        },

        selectOption(optionTypeId: number, optionId: string) {
            const existingIndex = this.selectedOptions.findIndex(
                selected => selected.optionTypeId === optionTypeId
            )

            if (existingIndex !== -1) {
                this.selectedOptions[existingIndex].optionId = optionId
            } else {
                this.selectedOptions.push({ optionTypeId, optionId })
            }
        },

        setQuantity(quantity: number) {
            if (quantity >= 1) {
                this.quantity = quantity
            }
        },

        incrementQuantity() {
            this.quantity += 1
        },

        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity -= 1
            }
        },
    }
})
