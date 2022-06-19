const usersQuerys = {
  getUser: () => {
    return { name: 'Cass', email: '1234', id: '1' }
  },

  getUsers: () => {
    return [{ name: 'Cass', email: '1234', id: '1' }]
  }
}

export default usersQuerys
