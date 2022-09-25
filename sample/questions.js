process.stdout.write("Hello")
process.stdout.write("world")

// create an array
const questions = [
    'Hello, how are u?',
    'Are you free?',
    'Are you ok?',
    'do you love me?'
]


// create an function with an argument
const ask = (i = 0) => {
    process.stdout.write(questions[i])
}

// calling the function()

ask()