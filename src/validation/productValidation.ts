const productRules = {
  name: [
    (value: string) => {
      if (value) return true

      return 'Name is requred.'
    },
    (value: string) => {
      if (value?.length <= 30 && value?.length >= 1) return true

      return 'Name must be less than 30 characters.'
    },
  ],
  shortDescription: [
    (value: string) => {
      if (value) return true

      return 'Name is requred.'
    },
    (value: string) => {
      if (value?.length <= 100 && value?.length >= 1) return true

      return 'The short description must be less than 100 characters.'
    },
  ],
  description: [
    (value: string) => {
      if (value?.length <= 300) return true

      return 'The description must be less than 300 characters.'
    },
  ],
  price: [
    (value: string) => {
      if (value) return true

      return 'Price is requred.'
    },
    (value: string) => {
      if (value?.length <= 7) return true

      return 'Price must be less than 7 characters.'
    },
    (value: string) => {
      const regex = /^\d+\.\d+?$/
      if (regex.test(value)) return true

      return 'Price must only contain digits and a dot.'
    },
  ],
  quantity: [
    (value: string) => {
      if (value) return true

      return 'Quantity is requred.'
    },
    (value: string) => {
      if (value?.length <= 4) return true

      return 'Price must be less than 4 characters.'
    },
    (value: string) => {
      const regex = /^\d+$/
      if (regex.test(value)) return true

      return 'Quantity must only contain digits.'
    },
  ],
}

export default productRules
