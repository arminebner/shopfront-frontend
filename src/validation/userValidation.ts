const userRules = {
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
  email: [
    (value: string) => {
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return true

      return 'Please enter a valid email address.'
    },
  ],
}

export default userRules
