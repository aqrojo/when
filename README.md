## Javascript pattern matching utility that helps you to write cleaner code

We all love the ternary operator but sometimes it's hard to read
```
const adminUser = {name: 'Aragorn', password: 'the_king' }

const login = (user, password) => 
    !user, 
        ? 'Fill the user name plz'
        : !password
            ? 'Fill the password plz'
            : user !== adminUser.name
                ? `There's not a registered user with the name ${name}`
                : password !== adminUser.password
                    ? `The password isn't correct` 
                    : `If everything was ok, you're here 😍`

```
That's the motivation to write `when`, a tiny helper (only 179 bytes gzip), inspired in pattern matching strategies of other programming languages 
```
const login = (user, password) => 
   when()
    .case(!user, () => 'Fill the user name plz')
    .case(!password, () => 'Fill the password plz')
    .case(user !== adminUser.name, () => `There's not a registered user with the name ${name}`)
    .case(password !== adminUser.password, () => `The password isn't correct`)
    .resolve(() => `If everything was ok, you're here 😍`)

console.log(login('Aragorn', 'A_great_hero')) // You're password isn't correct
```
It greatly simplifies the readability of multiple conditional sentences and unlike another solutions like `if - else` or `switch` it works great with the short return syntax, since it's an expression

### Installing
```
$ npm install @aqrojo/when
```
### Usage
```
// import it in your code
// the default package exports the when instance
import when from '@aqrojo/when'

const value = 2

// begin the chain using the when helper
// and concat all the cases you want to check
const result = when()
    .case(value === 1, `it's 1`)
    .case(value === 2, `it's 2`)
    .case(value > 1, `it's greater than 1`)
    .resolve('If nobody matches, this is the returned value')

console.log(result) // it's 2
,  
```
`when` will return only the first math, so in the example the `value > 1` case, was ignored

The `when` function holds an internal value that can be a function or any other value 
 
 It executes the evaluation at the moment the resolve method is invoked and after that, it cleans itself
```
cosnt value = 2

const w = when()
    .case(value = 1, `it's 1`)
    .case(value = 2, `it's 2`)


// you can resolve it later
console.log (
    w.resolve(`it's recommended the use of a default value`)
) // it's 2

// if you try to resolve it again 
// and it hasn't a default value
// it returns false
console.log(w.resolve()) // false

```
### Api
#### `when`
All begins with `when` function, and you can chain as many cases as you need 

#### `case`
It's a `when` method that accepts two parameters
```
when.case(predicate: boolean, value: any)
``` 
The value parameter can be of any type but if it's a function, this will be executed automatically
`case` may be used in chains or preceded by the `when` instance
```
when
    .case(val === 1, 'one')
    .case(val === 2, 'two')
    .resolve()

// it's the same that
when.case(val === 1, 'one')
when.case(val === 2, 'two')
when.resolve()
```

#### `resolve`
You should use this method to obtain the result of the conditional process

It will return false if there isn't any valid matches or you can use it with a parameter to return a default value 

