# Servita challenge
[Servita challenge doc](https://gitlab.com/servita-devops-team/DevOnboarding01)

### Expected output design:
```
{
    maxStart
    minStart
    valueCodings: {
        key: code
        value: display
    }
}
```

### Problems:
 - `key: start` could be on different levels
 - valueCodings format?

### How to use:
- `npm install`
- `npm start`
- Open browser or send a get request in postman to [http://localhost:8080/aggregate](http://localhost:8080/aggregate)
- Admire your beautiful json response.