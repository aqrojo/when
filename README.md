## js pattern matching utility that helps you to write cleaner code

We all love the ternary operator but sometimes it's hard to read
```
const adminUser = {name: 'Aragorn', password: 'the_king' }
const login = (user, password) => 
   when
    .case(!user, () => 'Fill the user name plz')
    .case(!password, () => 'Fill the password plz')
    .case(user !== adminUser.name, () => `There's not a registered user with the name ${name}`)
    .case(password !== adminUser.password, () => `You're password isn't correct`)
    .resolve(() => `If everything was ok, you're here 😍`)

console.log(login('Aragorn', 'A_great_hero')) // You're password isn't correct
```

You can always use if / else if, but it's not the most elegant way to go, for example you can't use the short return syntax, since if is a statement and not an expression
```
const login = (user, password) => {
  let loginMessage = ''
  if (x === y) loginMessage = 'response message'
  ...
  return loginMessage
}
```

An alternative to the above code, could be to have a return inside each condition, but it's not nice either
```
const login = (user, password) => {
 if (x === y) return 'response message'
 else if (x === z) return 2 'response message'
}
```

The same situation happens when choose switch, and you can't evaluate multiple conditions
``` 
switch(colour)
 case 'blue': return `it's blue!!`
```




// todo README.md
