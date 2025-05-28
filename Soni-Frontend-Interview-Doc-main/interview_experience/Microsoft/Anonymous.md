# Microsoft interview experience

**Compensation** - Around 60LPA(Including stocks)

# DSA Round

```
Let say you have given a number N and then you have to create a long string after
converting number from 1-N to binary. Given start and end index give the substring from it.


function getBinary(n: number) {
    let rem, res = [];
    while (n) {
        rem = n % 2;
        n = Math.floor(n / 2);
        res.push(rem);
    }
    
    return res.reverse().join("");
}

function result(n: number, start, end) {
    let bin = ""
    for (let i = 1; i <= n; i++) {
        let temp = getBinary(i);
        console.log(temp);
        bin += temp;
    }
    
    return bin.slice(start, end);
}


const r = result(5, 3, 8)
console.log(r);
```



# System Design
```
Design Booking.com with a few follow-up questions.

Follow-up questions:
* How to handle concurrent users trying to book the same hotel on the same site?
* How to handle concurrent users trying to book the same hotel on different sites?
* How to handle a situation where multiple rooms (e.g., 10 rooms) of the same type are available?
* How to synchronize will happen?
```



# System Design + JS
```
Product Example:
A product has 3 APIs that display data.

Follow-up Questions:
* Give me requirement what questions you will put in front of product team.
* What do you want the experience to be like if one of the APIs is slow?
* What are advantage of middle layer and does it fit in current scenario ?
* If the middle layer encounters a slow API, how would you handle it?
* How would you handle page size, filtering, and sorting in this scenario?
* Security and performance related question
```




# HM + Behavioral Questions
```
* Write a program to count something (e.g., occurrences of an item) more looking for collaboration part.
* Why do you want to work at Microsoft?
* Project-related discussion
```

Credit - Anonymous(will share after he joins)
