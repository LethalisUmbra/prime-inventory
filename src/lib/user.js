export let user;

export function setUser(bearer_token) {
  const token = decodeURIComponent(bearer_token.split(" ")[1])
  const secret = process.env.JWT_SECRET;
  const { password, ...rest } = verify(token, secret)
  user = rest
}

export function getUser() {
  return user;
}