LOGIN
  ↓
check user + password
  ↓
convert roles → [2001]
  ↓
create JWT
  ↓
send token to client
  ↓

REQUEST TO PROTECTED ROUTE
  ↓
verifyJWT
  ↓
decode token
  ↓
req.roles = [2001]
  ↓

verifyRoles(Admin, Editor)
  ↓
compare arrays
  ↓
allow / deny request