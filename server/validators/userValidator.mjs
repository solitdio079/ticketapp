const userSchema = {
  email: {
    isLength: {
      options: { min: 5 },
      errorMessage: 'Username must be at least 5 characters long!',
    },
    isEmail: {
      errorMessage: 'Please enter a valid email',
    },
  },
  fullName:{ 
    isLength: { 
      options: { min: 5 },
      errorMessage: 'Username must be at least 5 characters long!',
    },
  },
}

export default userSchema
