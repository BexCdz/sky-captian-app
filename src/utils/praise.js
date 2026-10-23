const PRAISE = ['Great job!', 'Awesome!', 'You got it!', 'Super!', 'Well done!']

export const randomPraise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)]
