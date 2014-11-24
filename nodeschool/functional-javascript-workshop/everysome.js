function checkUserValid(goodUsers) 
{
  return function(submittedUsers) 
  {
    return submittedUsers.every(existsOnGoodUsers);
    function existsOnGoodUsers(submittedUser) {
      var fn = isSameUser.bind(submittedUser);
      return goodUsers.some(fn);
      function isSameUser(a) { return this.id == a.id; }
    }

  }

}

function checkUserValidv1(goodUsers) 
{
  return function(submittedUsers) 
  {
    return submittedUsers.every(existsOnGoodUsers);
    function existsOnGoodUsers(submittedUser) {
      return goodUsers.some(isSameUser);
      function isSameUser(goodUser) {
        return goodUser.id == submittedUser.id;
      }
    }

  }

}

module.exports = checkUserValid;
